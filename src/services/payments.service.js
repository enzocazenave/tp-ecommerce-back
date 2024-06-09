const { getNeo4jSession } = require("../databases/neo4j")
const BillRecord = require('../models/mongo/BillRecord')
const BillService = require('../services/bill.service')

const payOrder = async(orderId, userId, paymentMethod) => {
  try {
    const neo4j = getNeo4jSession()

    const isOrderPayed = await neo4j.run(`
      MATCH (o:Order { userId: $userId })
      WHERE id(o) = $orderId
      MATCH (o)-[:PAYED_BY]->(p:Payment)
      RETURN (p)
    `, { userId, orderId: parseInt(orderId) })

    if (isOrderPayed.records.length === 1) {
      throw `La orden con id ${orderId} ya fue pagada`
    }

    const order = await neo4j.run(`
      MATCH (o:Order { userId: $userId })
      WHERE id(o) = $orderId
      CREATE (p:Payment { method: $paymentMethod })
      CREATE (o)-[:PAYED_BY]->(p)
    `, { userId, orderId: parseInt(orderId), paymentMethod })

    if (order.summary.updateStatistics._stats.nodesCreated === 0) {
      throw `La orden con id ${orderId} que estás intentando pagar no existe`
    }

    await neo4j.run(`
      MATCH (o:Order { userId: $userId })
      WHERE id(o) = $orderId
      CREATE (b:Bill { billedAt: $billedAt })
      CREATE (b)-[:BILL_OF]->(o)
    `, { userId, orderId: parseInt(orderId), billedAt: new Date().toISOString() })

    const billAndOrderData = await BillService.getBillByOrderId(orderId, userId)

    const billRecord = new BillRecord({
      orderId: parseInt(orderId),
      price: billAndOrderData.price,
      paymentMethod,
      billedAt: billAndOrderData.billedAt
    })
    
    await billRecord.save()
  } catch(error) {
    throw error
  }
}

module.exports = {
  payOrder
}
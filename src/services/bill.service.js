const { getNeo4jSession } = require('../databases/neo4j')

const getBillByOrderId = async (orderId, userId) => {
  try {
    const neo4j = getNeo4jSession()
    const order = await neo4j.run(`
      MATCH (o:Order { userId: $userId })
      WHERE id(o) = $orderId
      MATCH (o)-[:CONTAINS]->(p:Product)
      MATCH (o)-[:PAYED_BY]->(payment:Payment)
      MATCH (b:Bill)-[:BILL_OF]->(o)
      RETURN o, collect(p) as products, b, payment
    `, { orderId: parseInt(orderId), userId })

    if (order.records.length === 0) {
      throw `La orden con id ${orderId} no existe`
    }

    return order.records.map(record => ({ 
      id: record.get('o').identity.low,
      ...record.get('o').properties,
      ...record.get('b').properties,
      ...record.get('payment').properties,
      products: record.get('products').map(product => product.properties)
    }))[0]
  } catch(error) {
    throw error
  }
}

module.exports = {
  getBillByOrderId
}
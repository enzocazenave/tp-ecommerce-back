const { getNeo4jSession } = require('../databases/neo4j')
const { CartModel: Cart } = require('../models/mongo/Cart')
const User = require('../models/mongo/User')

const taxes = {
  'Responsable Inscripto': 0.08,
  'Monotributista': 0.05,
  'Consumidor Final': 0.03
}

const createOrder = async (userId) => {
  try {
    const userCart = await Cart.findOne({ userId })

    if (!userCart) {
      throw `El usuario ${userId} no tiene un carrito`
    }

    if (userCart.products.length === 0) {
      throw `El usuario no tiene productos en el carrito`
    }

    const user = await User.findById(userId)

    const orderPrice = Math.round(userCart.products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0) * (1 + taxes[user.ivaCondition]))

    const neo4j = getNeo4jSession()

    const order = await neo4j.run(`
      CREATE (o:Order {
        userId: $userId,
        price: $price,
        createdAt: $createdAt
      })
      RETURN o
    `, {
      userId,
      price: orderPrice,
      createdAt: new Date().toISOString()
    })

    const orderId = order.records[0].get("o").identity.low

    for (const product of userCart.products) {
      await neo4j.run(`
        MATCH (o:Order)
        WHERE id(o) = $orderId
        CREATE (p:Producto { productId: $productId, quantity: $quantity, price: $price })
        CREATE (c:Cliente { name: $name, lastName: $lastName, address: $address, ivaCondition: $ivaCondition })
        CREATE (o)-[:CONTAINS]->(p)
        CREATE (o)-[:CREATED_BY]->(c)
      `, {
        name: user.name,
        lastName: user.lastName,
        address: user.address,
        ivaCondition: user.ivaCondition,
        orderId,
        productId: product.productId.toString(),
        quantity: product.quantity,
        price: product.price
      })
    
    }

    userCart.products = []
    await userCart.save()

    return true
  } catch (error) {
    console.log(error)
    throw error
  }
}


module.exports = {
  createOrder
}
const { connect, set } = require('mongoose')

const connectToMongo = async () => {
  try {
    set('strictQuery', false)
    await connect(process.env.MONGO_DATABASE_CONNECTION_STRING)
    console.log('MONGO DB')
  } catch(error) {
    throw new Error('[MONGO] Database not found')
  }
}

module.exports = {
  connectToMongo
}
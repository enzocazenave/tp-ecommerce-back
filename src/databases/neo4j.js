const neo4j = require('neo4j-driver')

const getNeo4jSession = () => {
  const driver = neo4j.driver(
    process.env.NEO4J_DATABASE_CONNECTION_STRING,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
  )
  return driver.session()
}

module.exports = {
  getNeo4jSession
}
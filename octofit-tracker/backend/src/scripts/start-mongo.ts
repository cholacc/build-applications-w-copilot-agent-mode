import { MongoMemoryServer } from 'mongodb-memory-server'
import fs from 'fs'
import loadDotEnv from '../loadEnv'

async function main() {
  const mongod = await MongoMemoryServer.create({
    instance: {
      port: Number(process.env.MONGO_PORT),
      dbName: process.env.DB_NAME
    }
  })
  const uri = mongod.getUri()
  console.log('MongoDB Memory Server started at', uri)

  // write URI to file for other scripts to consume
  try {
    fs.writeFileSync('.mongo_uri', uri, { encoding: 'utf8' })
    console.log('Wrote .mongo_uri')
  } catch (e) {
    console.error('Failed to write .mongo_uri:', e)
  }

  process.on('SIGINT', async () => {
    console.log('Stopping in-memory MongoDB')
    await mongod.stop()
    process.exit(0)
  })

  // keep process alive
  await new Promise(() => { })
}

loadDotEnv()
main().catch((err) => {
  console.error('start-mongo error:', err)
  process.exit(1)
})

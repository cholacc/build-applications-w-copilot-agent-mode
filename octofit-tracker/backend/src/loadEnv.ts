import fs from 'fs'
import path from 'path'

function loadDotEnv(envPath?: string) {
  try {
    const candidates = [] as string[]
    if (envPath) candidates.push(envPath)
    // prefer process.cwd()/.env when available (covers running from inside backend)
    candidates.push(path.resolve(process.cwd(), '.env'))
    // fallback to package-root .env (this file lives in backend/src)
    candidates.push(path.resolve(__dirname, '..', '.env'))

    let foundPath: string | null = null
    for (const p of candidates) {
      if (fs.existsSync(p)) { foundPath = p; break }
    }
    if (!foundPath) return
    console.log('Loaded environment from', foundPath)
    const content = fs.readFileSync(foundPath, 'utf8')
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      let val = trimmed.slice(eq + 1)
      // remove surrounding quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      if (process.env[key] === undefined) process.env[key] = val
    }
  } catch (err) {
    // silently ignore
  }
}

loadDotEnv()

export default loadDotEnv

export function makeApiBase(){
  const codespace = import.meta.env.VITE_CODESPACE_NAME
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/`
  }
  // Safe fallback for local development
  return `http://localhost:8000/api/`
}

export async function fetchList(component, pageUrl){
  const url = pageUrl || (makeApiBase() + component + '/')
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  const data = await res.json()

  let results = []
  let next = null
  let previous = null

  if (Array.isArray(data)) {
    results = data
  } else if (data && typeof data === 'object') {
    if (Array.isArray(data.results)) {
      results = data.results
      next = data.next || null
      previous = data.previous || null
    } else {
      // Single-object response or keyed object — try to find an array value
      const arr = Object.values(data).find(v => Array.isArray(v))
      if (arr) results = arr
      else results = [data]
    }
  }

  return { results, next, previous }
}

import React, { useEffect, useState } from 'react'
import { fetchList } from '../api'

export default function Activities(){
  const [items, setItems] = useState([])
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = async (pageUrl) => {
    setLoading(true)
    setError(null)
    try {
      // read activities from -8000.app.github.dev/api/activities
      const { results, next: n, previous: p } = await fetchList('activities', pageUrl)
      setItems(results)
      setNext(n)
      setPrevious(p)
    } catch (e) {
      setError(e.message)
    } finally { setLoading(false) }
  }

  useEffect(()=>{ load() }, [])

  return (
    <section>
      <h2>Activities</h2>
      {loading && <div>Loading…</div>}
      {error && <div style={{color:'red'}}>Error: {error}</div>}
      <ul>
        {items.map((it, i) => (
          <li key={it._id || it.id || i}>
            <strong>{it.name || it.title || it.type || `Activity ${i+1}`}</strong>
            <div style={{fontSize:'smaller'}}>{JSON.stringify(it)}</div>
          </li>
        ))}
      </ul>
      <div style={{marginTop:10}}>
        <button onClick={()=>load(previous)} disabled={!previous}>Previous</button>
        <button onClick={()=>load(next)} disabled={!next} style={{marginLeft:8}}>Next</button>
      </div>
    </section>
  )
}

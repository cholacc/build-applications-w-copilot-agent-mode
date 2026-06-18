import React, { useEffect, useState } from 'react'
import { fetchList } from '../api'

export default function Teams(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    // read data from -8000.app.github.dev/api/teams
    fetchList('teams').then(({results})=>{
      if (!mounted) return
      setItems(results)
    }).catch(e=> setError(e.message)).finally(()=> setLoading(false))
    return ()=> { mounted = false }
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      {loading && <div>Loading…</div>}
      {error && <div style={{color:'red'}}>Error: {error}</div>}
      <ul>
        {items.map((it,i)=> (
          <li key={it._id || it.id || i}>
            <strong>{it.name || `Team ${i+1}`}</strong>
            <div style={{fontSize:'smaller'}}>{JSON.stringify(it)}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}

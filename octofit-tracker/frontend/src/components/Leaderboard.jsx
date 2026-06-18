import React, { useEffect, useState } from 'react'
import { fetchList } from '../api'

export default function Leaderboard(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    fetchList('leaderboard').then(({results})=>{
      if (!mounted) return
      setItems(results)
    }).catch(e=> setError(e.message)).finally(()=> setLoading(false))
    return ()=> { mounted = false }
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <div>Loading…</div>}
      {error && <div style={{color:'red'}}>Error: {error}</div>}
      <ol>
        {items.map((it,i)=> (
          <li key={it._id || it.id || i}>
            <strong>{it.username || it.name || `User ${i+1}`}</strong>
            <div style={{fontSize:'smaller'}}>{JSON.stringify(it)}</div>
          </li>
        ))}
      </ol>
    </section>
  )
}

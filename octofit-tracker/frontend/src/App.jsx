import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

export default function App(){
  return (
    <div style={{padding:20}}>
      <header style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <h1>OctoFit Tracker</h1>
        <nav>
          <NavLink style={{margin:6}} to="/activities">Activities</NavLink>
          <NavLink style={{margin:6}} to="/workouts">Workouts</NavLink>
          <NavLink style={{margin:6}} to="/teams">Teams</NavLink>
          <NavLink style={{margin:6}} to="/users">Users</NavLink>
          <NavLink style={{margin:6}} to="/leaderboard">Leaderboard</NavLink>
        </nav>
      </header>

      <main style={{marginTop:20}}>
        <Routes>
          <Route path="/" element={<div>Welcome to OctoFit. Choose a section above.</div>} />
          <Route path="/activities" element={<Activities/>} />
          <Route path="/workouts" element={<Workouts/>} />
          <Route path="/teams" element={<Teams/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
        </Routes>
      </main>
    </div>
  )
}

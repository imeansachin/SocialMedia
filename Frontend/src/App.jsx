import React from 'react'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import CreatePost from './pages/CreatePost.jsx'
import Feed from './pages/Feed.jsx'
const App = () => {
  return (
   <Router>
    <Routes>
      <Route path="/create-post" element={<CreatePost/>}></Route>
      <Route path="/feed" element={<Feed></Feed>}></Route>
    </Routes>
   </Router>
  )
}

export default App

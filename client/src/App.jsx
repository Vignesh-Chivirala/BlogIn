import React from 'react'
import Blog from './pages/Blog'
import Home from './pages/Home'
import {Routes,Route} from 'react-router-dom'
import ListBlog from './pages/admin/ListBlog'
import AddBlog from './pages/admin/AddBlog'
import Comments from './pages/admin/Comments'
import Dashboard from './pages/admin/Dashboard'
import Layout from './pages/admin/Layout'
import Login from './components/admin/Login'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './contexts/AppContext'
import Contribute from './pages/admin/Contribute'

function App() {
  const {token}=useAppContext()
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='' element={<Home/>}/>
        <Route path='/Blog/:id' element={<Blog />}/>
        <Route path='/admin' element={token ?<Layout />:<Login/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='addBlog' element={<AddBlog/>}/>
          <Route path='listBlog' element={<ListBlog/>}/>
          <Route path='comments' element={<Comments/>}/>
          

        </Route>
          <Route path="/contribute" element={<Contribute />} />
      </Routes>
    </div>
  )
}

export default App
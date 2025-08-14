import React, { useEffect, useState } from 'react'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../contexts/AppContext'
import toast from 'react-hot-toast'

function ListBlog() {
  const [blogs, setBlogs] = useState([])
  const { axios } = useAppContext()

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/admin/blogs')
      if (data.success) {
        setBlogs(data.blogs)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-gray-900 min-h-screen text-gray-200'>
      <h1 className='text-2xl font-bold text-primary mb-4'>All Blogs</h1>

      <div className='relative max-w-5xl overflow-x-auto shadow-lg rounded-2xl scrollbar-hide bg-gray-800'>
        <table className='w-full text-sm text-gray-300'>
          <thead className='text-xs text-gray-400 text-left uppercase border-b border-gray-600'>
            <tr>
              <th scope='col' className='px-3 py-3 xl:px-6'>#</th>
              <th scope='col' className='px-3 py-3'>Blog Title</th>
              <th scope='col' className='px-3 py-3 max-sm:hidden'>Date</th>
              <th scope='col' className='px-3 py-3 max-sm:hidden'>Status</th>
              <th scope='col' className='px-3 py-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <BlogTableItem
                key={blog._id}
                blog={blog}
                fetchBlogs={fetchBlogs}
                index={index + 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListBlog

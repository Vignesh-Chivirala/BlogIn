import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import {motion} from 'motion/react'
import BlogCard from './BlogCard'
import { useAppContext } from '../contexts/AppContext'

function BlogList() {
    const [menu,setMenu]=useState("All")
    const {blogs,input}=useAppContext()

    const filteredBlogs = ()=>{
        if (!Array.isArray(blogs)) return [];
        if(input.trim()===''){
            return blogs
        }
        return blogs.filter((blog)=>blog.title.toLowerCase().includes(input.toLowerCase())|| blog.category.toLowerCase().includes(input.toLowerCase()))
    }
  return (
    <div>
        <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
            {blogCategories.map((item)=>(
                <div key={item} className='relative'>
                    <button
  onClick={() => setMenu(item)}
  className={`relative cursor-pointer px-5 py-2 rounded-sm font-medium transition-all duration-200 ${
    menu === item
      ? "text-white"
      : "text-sky-400 hover:bg-sky-500/20"
  }`}
>
  {item}

  {menu === item && (
    <motion.div
      layoutId="underline"
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="absolute inset-0 bg-sky-400 rounded-sm -z-10"
    ></motion.div>
  )}
</button>

                </div>

            ))}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>{
            filteredBlogs().filter(blog=>menu==="All" ? true:blog.category===menu).map(blog=><BlogCard key={blog._id} blog={blog}/>)}

        </div>
    </div>
  )
}

export default BlogList
import React, { useEffect, useState, useRef } from 'react'
import { assets, blogCategories } from '../../assets/assets';
import Quill from 'quill';
import { useAppContext } from '../../contexts/AppContext'
import { parse } from 'marked'
import toast from 'react-hot-toast';

function AddBlog() {
  const { axios } = useAppContext()
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(false)

  const editorRef = useRef(null)
  const quillRef = useRef(null)
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    if (!title) return toast.error('Please enter title')
    try {
      setLoading(true);
      const { data } = await axios.post('/api/blog/generate', { prompt: title })
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished
      }
      const formData = new FormData()
      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)
      const { data } = await axios.post('/api/blog/add', formData)
      if (data.success) {
        toast.success(data.message)
        setImage(null)
        setTitle('')
        setSubTitle('')
        quillRef.current.root.innerHTML = ''
        setCategory('Startup')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAdding(false)
    }
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
  }, [])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-gray-900 min-h-screen py-8 px-4 sm:px-16 overflow-y-auto text-gray-200'>
      <div className='bg-gray-800 w-full max-w-4xl p-6 md:p-10 mx-auto shadow-lg rounded-2xl'>

       
        <p className='font-medium text-gray-300'>Upload Thumbnail</p>
        <label htmlFor="image" className='block mt-2'>
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            className='h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-lg cursor-pointer border border-gray-600 hover:border-primary transition-all'
            alt="thumbnail"
          />
          <input type="file" id='image' hidden required onChange={e => setImage(e.target.files[0])} />
        </label>

        
        <p className='mt-6 font-medium text-gray-300'>Blog Title</p>
        <input
          type="text"
          placeholder='Type your blog title here'
          required
          className='w-full max-w-xl mt-2 p-3 border border-gray-600 rounded-lg outline-none bg-gray-700 text-gray-200 focus:ring-2 focus:ring-primary transition'
          onChange={e => setTitle(e.target.value)}
          value={title}
        />

       
        <p className='mt-4 font-medium text-gray-300'>Sub Title</p>
        <input
          type="text"
          placeholder='Type your sub title here'
          required
          className='w-full max-w-xl mt-2 p-3 border border-gray-600 rounded-lg outline-none bg-gray-700 text-gray-200 focus:ring-2 focus:ring-primary transition'
          onChange={e => setSubTitle(e.target.value)}
          value={subTitle}
        />

        
        <p className="mt-4 font-semibold text-gray-200 text-lg">Blog Description</p>

<div className="max-w-xl h-80 relative border border-gray-700 rounded-xl bg-gray-900 shadow-lg overflow-hidden">
  
  
  <div
    ref={editorRef}
    className="h-full overflow-y-auto px-4 py-3 text-gray-300 text-sm leading-relaxed focus:outline-none"
  ></div>

  
  {loading && (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-10 h-10 rounded-full border-4 border-t-transparent border-white animate-spin"></div>
    </div>
  )}

  
  <div className="absolute bottom-0 w-full flex justify-end p-3 bg-gray-800/60 backdrop-blur-sm">
    <button
      type="button"
      disabled={loading}
      onClick={generateContent}
      className="text-xs text-white bg-primary px-4 py-1.5 rounded-lg shadow hover:bg-primary/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Generate with AI
    </button>
  </div>
</div>


        
        <p className='mt-4 font-medium text-gray-300'>Blog Category</p>
        <select
          onChange={e => setCategory(e.target.value)}
          value={category}
          className='mt-2 px-3 py-2 border text-gray-200 border-gray-600 rounded-lg outline-none bg-gray-700 focus:ring-2 focus:ring-primary transition'
        >
          <option value="">Select category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        
        <div className="flex items-center gap-2 mt-5">
          <input
            type="checkbox"
            checked={isPublished}
            className='scale-125 cursor-pointer accent-primary'
            onChange={e => setIsPublished(e.target.checked)}
          />
          <p className="font-medium m-0 text-gray-300">Publish Now</p>
        </div>

       
        <button
          disabled={isAdding}
          type='submit'
          className='mt-6 w-40 h-12 bg-primary text-white rounded-lg font-medium shadow hover:shadow-lg transition-all'
        >
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>

      </div>
    </form>
  )
}

export default AddBlog;

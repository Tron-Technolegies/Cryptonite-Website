import React from 'react'
import BlogPageHeader from '../components/blogs/BlogPageHeader'
import BlogSearchFunctions from '../components/blogs/BlogSearchFunctions'
import NewsLetterSubscribe from '../components/blogs/NewsLetterSubscribe'
import Blogs from '../components/home/Blogs'

const BlogPage = () => {
  return (
    <div>
      <BlogPageHeader/>
      <BlogSearchFunctions/>
      <Blogs/>
      <NewsLetterSubscribe/>
    </div>
  )
}

export default BlogPage

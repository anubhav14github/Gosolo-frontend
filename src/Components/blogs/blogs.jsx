import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { getblogs } from '../services/blogAPI';


export function Blogs() {
  const [blog, setblog] = useState([])

  const navigate = useNavigate()
  async function fetchblogs() {
    const res = await getblogs()
    if (res) {
      console.log(res)
      setblog(res)
      if (res) {
        // res.forEach(q => {
        //   if (q.Provider._id === initialState.userDetails.id) {
        //     let filteredArray =  res.filter(item => item !== q)
        //     setpost(filteredArray)
        //   }
        // });
      }
    }
  }
  const gotoblog = (ID) => {
    navigate("/ViewBlog", { state: { id: ID } })
 }
  useEffect(() => {
    fetchblogs()
  }, [])
  

  return (
    <>


      
            <div>
            <section class="relative py-20 overflow-hidden">
              <img
                class="absolute top-0 right-0 xl:mt-10 -mr-24 lg:-mr-0"
                src="saturn-assets/images/blog/star-circle-right.svg"
                alt=""
              />
              <img
                class="hidden sm:block absolute bottom-0 left-0 -mb-48 lg:mb-0"
                src="saturn-assets/images/blog/blue-light-left.png"
                alt=""
              />
              <div class="relative container px-4 mx-auto">
                <div class="max-w-2xl mx-auto mb-15 text-center">
                  <span class="inline-block py-1 px-3 mb-4 text-xs font-semibold text-orange-900 bg-orange-50 rounded-full">
                     BLOGS
                  </span>
                  
                </div>
                <div class="max-w-5xl mx-auto mt-6">
                {blog.map((q, i) => (
                  <div className='my-4'>
                  <div class="py-12 border-t-2 border-gray-100 bg-white rounded-2xl shadow-lg p-4">
                    <div class="flex flex-wrap lg:flex-nowrap items-center">
                      <div class="w-full lg:w-auto px-4 mb-8 lg:mb-0">
                        <img
                          class="block w-44 h-20 rounded-lg"
                          src={`https://picsum.photos/500/350?random=${i}`}
                          alt="Nature"
                        />
                      </div>
                      <div class="w-full lg:w-9/12 px-4 mb-10 lg:mb-0">
                        <div class="max-w-2xl">
                          
                          <p class="text-2xl mb-1 font-semibold text-gray-900">
                           {q.title}
                          </p>
                          <span class="block text-gray-400 mb-1"> {q.category} </span>
                        </div>
                      </div>
                      <div class="w-full lg:w-auto px-4 ml-auto text-right">
                        <button onClick={()=>{ gotoblog(q._id)}}
                          class="inline-flex items-center text-xl font-semibold text-orange-900 hover:text-gray-900"
                          
                        >
                          <span class="mr-2">Read</span>
                          
                          <svg
                            class="animate-bounce"
                            width="16"
                            height="16"
                            viewbox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.33301 14.6668L14.6663 1.3335"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M1.33301 1.3335H14.6663V14.6668"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  </div>
                    ))}
                  
                  <div class="pt-12 border-t-2 border-gray-100 text-center">
                    <a
                      class="relative group inline-block py-4 px-7 font-semibold text-orange-900 hover:text-orange-50 rounded-full bg-orange-50 transition duration-300 overflow-hidden"
                      href="#"
                    >
                      <div class="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                      <span class="relative">See More Articles</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        

      </>
  )

}

export default Blogs;
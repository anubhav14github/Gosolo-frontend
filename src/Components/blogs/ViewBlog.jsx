import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Comments from './comment';
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import { getblogById } from '../services/blogAPI';

export function ViewBlog() {
    const [blog, setblog] = useState()
    const [body, setbody] = useState()
    const location = useLocation();
    const navigate = useNavigate();
    async function fetchblogbyID() {
        const id = location.state.id
        const res = await getblogById(id)
        if (res) {
            console.log(res)
            setblog(res)
            setbody(res.body)
        }
    }

    const goback = () => {
        navigate(-1)
    }
    useEffect(() => {
        fetchblogbyID()
    }, [])

    return (
        <>
            <div className="flex justify-start mx-8 mt-8 text-base font-semibold text-gray-900  dark:text-white">
                <button onClick={goback}
                    className="mr-2 my-1 uppercase tracking-wider p-4 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-base font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                    Go Back
                </button>
            </div>
            {blog && body && (
                <>
                    <div class="flex h-max bg-transparent font-sans mb-16 py-10">
                        {/* <!-- left --> */}

                        {/* <!-- main --> */}
                        <div class="flex-1 flex flex-col overflow-hidden">
                            <main class="flex-1 overflow-x-hidden overflow-y-auto mx-2">
                                <div class="w-full px-2 md:w-2/3 mx-auto mb-10 lg:px-20 md:px-12 md:py-20 py-10 bg-white shadow-2xl rounded-2xl">
                                    {/* <!-- search --> */}

                                    {/* <!-- title --> */}
                                    <div class=" flex flex-col justify-center items-center">
                                        <div>
                                            <h1 className="flex justify-center mt-8 mb-4 text-4xl leading-8 text-gray-700 py-6">
                                                {blog.title}
                                            </h1>

                                        </div>
                                    </div>
                                    <hr class="border-gray-500 mt-8 mb-4" />
                                    <div className="text-lg bg-inherit">
                                        <MDEditor.Markdown source={body} />
                                    </div>

                                </div>
                            </main>
                        </div>
                        {/* <!-- right --> */}
                    </div>
                    <Comments  blogID={blog._id}/>
                </>
            )}

        </>
    )
}

export default ViewBlog;
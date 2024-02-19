import { React, useEffect, useState } from "react";
import { initialState } from "../context/reducer";
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { getProfile, getImage } from "../services/profileAPI";
import { baseURL } from "../services/api";
import moment from "moment";
import { getpostbyselectedID } from "../services/postAPI";
import { getblogByUserID } from "../services/blogAPI";

export function ProfileData() {
   const [DOB, setDOB] = useState()
   const [bool, setbool] = useState(true)
   const [freelancer, setfreelancer] = useState(false)
   const [provider, setprovider] = useState(false)
   const [userpost, setuserpost] = useState([])
   const [blogpost, setblogpost] = useState([])
   const [ImageSrc, setImageSrc] = useState(null);
   const navigate = useNavigate()
   const location = useLocation();

   async function fetchdata() {
      const id = initialState.userDetails.profileID
      const res = await getProfile(id)
      sessionStorage.setItem('UserProfile', JSON.stringify(res));
      // console.log(res)
      getImage(res.image)
         .then(response => {
            console.log(response)
            setImageSrc(response.request.responseURL);
         })
         .catch(error => {
            console.log(error);
         })
      //setphoto(img)
      if (res) {
         setDOB(moment(res.DOB).utc().format('YYYY-MM-DD'))
      } setData(res)
   }
   async function fetchpost() {
      const id = initialState.userDetails.id
      const r = await getpostbyselectedID(id)
      if (r) {
         setuserpost(r)
      }
   }
   async function fetchblog() {
      const id = initialState.userDetails.id
      console.log(id)
      const r = await getblogByUserID(id)
      if (r) {
         console.log(r)
         setblogpost(r)
      }
   }
   const [Data, setData] = useState({})
   const [photo, setphoto] = useState([])

   const viewposts = () => {
      navigate("/ViewPosts")
   }
   const createpost = () => {
      navigate("/CreatePost")
   }
   const blog = () => {
      navigate("/CreateBlog")
   }
   const viewblog = (ID) => {
      navigate("/ViewBlog", { state: { id: ID } })
   }

   const topost = (id) => {
      navigate(`/ViewPosts/:${id}`)
   }

   useEffect(() => {
      const profileID = initialState.userDetails.profileID
      if (profileID === null) {
         navigate("/Profile")
      }
      let UserProfile = sessionStorage.getItem("UserProfile")
         ? JSON.parse(sessionStorage.getItem("UserProfile"))
         : "";
      if (initialState.userDetails.role[0] === 'FREELANCER') {
         setfreelancer(true)
      } else {
         setprovider(true)
      }
      if (UserProfile) {
         // console.log(UserProfile)
         setData(UserProfile)
         setDOB(moment(UserProfile.DOB).utc().format('YYYY-MM-DD'))
         getImage(UserProfile.image)
            .then(response => {
               console.log(response)
               setImageSrc(response.request.responseURL);
            })
            .catch(error => {
               console.log(error);
            })
      } else {
         fetchdata()
         setbool(false)
      }
      fetchpost()
      fetchblog()


   }, [])
   useEffect(() => {
   }, [ImageSrc])
   useEffect(() => {
   }, [Data])


   return (
      <div className=" bg-inherit font-sans">
         <div className=" w-full h-auto mx-auto my-10 p-5">
            <div className="md:flex   md:mx-4 ">
               {/* <!-- Left Side --> */}
               <div className="w-full md:w-5/12 lg:w-3/12 md:mx-6 ">
                  {/* <!-- Profile Card --> */}
                  <div className="bg-white shadow-2xl my-4 py-8 mx-auto px-4 border-t-8 rounded-2xl border-b-8 border-green-400">
                     <div className="image h-56 w-56 rounded-full mx-auto  overflow-hidden mt-8">
                        {ImageSrc ? (
                           <img src={ImageSrc} alt="My Image" />
                        ) : (
                           <p>Loading image...</p>
                        )}
                     </div>
                     <h1 className="text-gray-900 font-semibold text-3xl text-center lg:my-8 leading-8 mt-8">
                        {Data.fullname}
                     </h1>
                     <hr className=" bg-slate-600" />
                     <hr className=" bg-slate-600" />
                     <h3 className="text-gray-600 font-normal text-base sm:text-lg leading-7 capitalize mx-4 my-8">
                        {Data.Aboutme}
                     </h3>

                  </div>
                  {/* <!-- End of profile card --> */}
                  <div className="my-4"></div>

                  {/* <!-- End of friends card --> */}
               </div>
               {/* <!-- Right Side --> */}
               <div className="w-full md:w-7/12 lg:w-9/12 h-auto">
                  {/* <!-- Profile tab --> */}
                  {/* <!-- About Section --> */}
                  <div className="bg-white p-3  my-4 py-8 rounded-xl shadow-2xl border-t-8  border-b-8 border-green-400">
                     <div className="flex items-center mx-6 space-x-2 text-base font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                           <svg
                              className="h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                           </svg>
                        </span>
                        <span className="tracking-wide text-lg">About</span>
                     </div>
                     <div className="text-gray-700 my-4 ">
                        <div className="grid lg:grid-cols-2 py-4 text-lg">
                           <div className="grid grid-cols-2">
                              <div className="px-4 py-2 font-semibold">Name</div>
                              <div className="px-4 py-2">{Data.fullname}</div>
                           </div>
                           <div className="grid grid-cols-2">
                              <div className="px-4 py-2 font-semibold">Gender</div>
                              <div className="px-4 py-2">{Data.gender}</div>
                           </div>
                           <div className="grid grid-cols-2">
                              <div className="px-4 py-2 font-semibold">Contact No.</div>
                              <div className="px-4 py-2">+91 {Data.phone}</div>
                           </div>
                           <div className="grid grid-cols-2">
                              <div className="px-4 py-2 font-semibold">Birthday</div>
                              <div className="px-4 py-2">{DOB}</div>
                           </div>

                           <div className="grid grid-cols-2">
                              <div className="px-4 py-2 font-semibold">Email.</div>
                              <div className="px-4 py-2">
                                 <a className="text-blue-800 flex-wrap" href="mailto:jane@example.com">
                                    {initialState.userDetails.email}
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>

                  </div>
                  {/* <!-- End of about section --> */}

                  <div className="my-8"></div>

                  {/* <!-- Experience and education --> */}
                  <div className="bg-white p-3 h-max my-4 py-8 rounded-xl shadow-2xl border-t-8  border-b-8 border-green-400">
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
                        <div className=" mx-8">
                           <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mx-2 mb-3">
                              <span clas="text-green-500">
                                 <svg
                                    className="h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth="2"
                                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                 </svg>
                              </span>
                              <span className="tracking-wide">Education</span>
                           </div>
                           {Data.qualification?.map((q, i) => (
                              <ul className="list-inside space-y-2 my-4 mx-4">
                                 <li key={i}>
                                    <div className="text-teal-600 font-semibold text-lg">{q.types}</div>
                                    <div className="text-gray-500 text-base"> Institute: {q.Institute} </div>
                                    <div className="text-gray-500 text-base"> {q.marks} CGPA/Percentage </div>
                                    <div className="text-gray-500 text-base"> year of passing :{q.year} </div>
                                 </li>
                              </ul>
                           ))}
                        </div>
                        <div className=" mx-8">
                           <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                              <span clas="text-green-500">
                                 <svg
                                    className="h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path
                                       fill="#fff"
                                       d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                    />
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth="2"
                                       d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                    />
                                 </svg>
                              </span>
                              <span className="tracking-wide">Job Experience</span>
                           </div>
                           {Data.job?.map((q, i) => (
                              <ul className="list-inside space-y-2 my-4 mx-4">
                                 <li key={i}>
                                    <div className="text-teal-600 font-semibold text-lg"> {q.company}</div>
                                    <div className="text-gray-500 text-base"> Position: {q.position} </div>
                                    <div className="text-gray-500 text-base"> Duration: {q.duration}  </div>
                                 </li>
                              </ul>
                           ))}
                        </div>
                        <div className=" mx-8">
                           <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                              <span clas="text-green-500">
                                 <svg
                                    className="h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path
                                       fill="#fff"
                                       d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                    />
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth="2"
                                       d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                    />
                                 </svg>
                              </span>
                              <span className="tracking-wide">Work Sample</span>
                           </div>
                           {Data.worksample?.map((q, i) => (
                              <ul className="list-inside space-y-2 my-4 mx-4">
                                 <li key={i}>
                                    <div className="text-teal-600 font-semibold text-lg">{q.name}</div>
                                    <div className="text-gray-500 text-base"> Link: {q.link} </div>

                                 </li>
                              </ul>
                           ))}
                        </div>
                     </div>
                     {/* <!-- End of Experience and education grid --> */}
                  </div>
                  {/* <!-- End of profile tab --> */}
               </div>
            </div>

            <div className="md:flex my-8 mt-24 font-sans md:mx-4 ">
               <div className="w-full mx-auto my-8 md:w-1/2  p-8 md:m-4 shadow-2xl bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
                  {freelancer && userpost.length > 0 && (
                     <>

                        <div>
                           <div>
                              <h1 className="flex justify-center mt-4 mb-4 text-4xl leading-8 text-gray-700 py-6">
                                 Your Posts
                              </h1>
                              <hr className=" bg-slate-600" />
                              <hr className=" bg-slate-600" />
                           </div>
                           <div className="flex justify-center  text-xl my-8 leading-6 text-gray-700">
                              You have been selected for the following work.
                           </div>

                           <div className="w-auto p-4 mt-8 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                              <div className="flow-root">
                                 {userpost.map((q, i) => (
                                    <ul
                                       role="list"
                                       className="divide-y divide-gray-200 dark:divide-gray-700"
                                    >
                                       <li className="py-3 sm:py-4">
                                          <div className="flex items-center space-x-4">
                                             <div className="flex-1 flex-wrap min-w-0">
                                                <p className="text-base md:text-xl font-medium text-gray-900 truncate dark:text-white">
                                                   {i + 1}.{q.title}
                                                </p>
                                                <p className="text-sm md:text-lg text-blue-800 hover:underline ">
                                                   {q.category}
                                                </p>
                                             </div>
                                             <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                <button onClick={() => { topost(q._id) }}
                                                   className="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                                                   View
                                                </button>

                                             </div>
                                          </div>

                                       </li>
                                       <hr className=" bg-slate-600" />
                                       <hr className=" bg-slate-600" />
                                    </ul>
                                 ))}
                              </div>
                           </div>
                        </div>


                     </>
                  )}
                  {freelancer && userpost.length === 0 && (
                     <div>
                        <div>
                           <h1 className="flex justify-center mt-4 mb-4 text-4xl leading-8 text-gray-700 py-6">
                              Your Posts
                           </h1>
                           <hr className=" bg-slate-600" />
                           <hr className=" bg-slate-600" />
                        </div>

                        <div className="flex justify-center  text-2xl my-8 leading-6 text-gray-700">
                           No posts Available!!! Look for them.
                        </div>
                        <div className="flex justify-center my-8 text-base font-semibold text-gray-900 p-2 dark:text-white">
                           <button onClick={viewposts}
                              className="mr-2 my-1 uppercase tracking-wider p-4 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-base font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                              Search
                           </button>

                        </div>
                     </div>
                  )}
                  {provider && (
                     <div>
                        <div>
                           <h1 className="flex justify-center mt-4 mb-4 text-4xl leading-8 text-gray-700 py-6">
                              Your Posts
                           </h1>
                           <hr className=" bg-slate-600" />
                           <hr className=" bg-slate-600" />
                        </div>

                        <div className="flex justify-center text-2xl my-4 leading-6 text-gray-700">
                           Inorder to create and view your posts, click on Post
                        </div>
                        <div className="flex justify-center my-8 text-base font-semibold text-gray-900 p-2 dark:text-white">
                           <button onClick={createpost}
                              className="mr-2 my-1 uppercase tracking-wider p-4 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-base font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                              Post
                           </button>
                        </div>
                     </div>
                  )}
               </div>
               {/* RIGHT COMPONENT   */}
               <div className="w-full mx-auto my-8 md:w-1/2 shadow-2xl md:m-4 bg-white border border-gray-200 rounded-lg  p-8 dark:bg-gray-800 dark:border-gray-700">
                  <div>
                     <h1 className="flex justify-center mt-4 mb-4 text-4xl leading-8 text-gray-700 py-6">
                        Your Blogs
                     </h1>
                  </div>
                  <div className="flex justify-center text-2xl my-4 leading-6 text-gray-700">
                     Inorder to create your Blog, click on Blog
                  </div>
                  <div className="flex justify-center my-8 text-base font-semibold text-gray-900 p-2 dark:text-white">
                     <button onClick={blog}
                        className="mr-2 my-1 uppercase tracking-wider p-4 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-base font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                        Blog
                     </button>
                  </div>
                  {blogpost && blogpost.length > 0 && blogpost.map((q, i) => (
                  <div className="w-auto p-4  bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flow-root">
                           <ul
                              role="list"
                              className="divide-y divide-gray-200 dark:divide-gray-700"
                           >
                              <li className="py-2 sm:py-4">
                                 <div className="flex items-center space-x-4">
                                    <div className="flex-1 min-w-0">
                                       <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                                          {q.title}
                                       </p>
                                       <p className="text-base text-blue-800 hover:underline ">
                                          {q.category}
                                       </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                       <button onClick={() => {
                                          viewblog(q._id)
                                       }}
                                          className="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                                          View
                                       </button>

                                    </div>
                                 </div>

                              </li>
                              <hr className=" bg-slate-600" />
                           </ul>
                        </div>
                    
                  </div>
                   ))}
               </div>
            </div>
         </div>
      </div >
   );

}
// NAVBAR ENDS


// USER PROFILE GRID


export default ProfileData;
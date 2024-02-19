import { React, useState, useEffect } from "react";
import img1 from "../assets/login.jpg";
import { useNavigate, Outlet } from 'react-router-dom';
import Loader from "../home/loader";
import { getposts, getpostsbycategory } from "../services/postAPI";
import { initialState } from "../context/reducer";

export function Viewposts(props) {
  const navigate = useNavigate();
  const [post, setpost] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setloading] = useState(true)

  const toPost = (id) => {
    navigate(`/ViewPosts/:${id}`);
  }
  const searchpostbyC = async (category) => {
    const res = await getpostsbycategory(category)
    if (res) {
      console.log(res)
      res.forEach(q => {
        if (q.Provider._id === initialState.userDetails.id) {
          let filteredArray = res.filter(item => item !== q)
          setpost(filteredArray)
        }
      });
    }

  };
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };
  async function fetchpost() {
    const res = await getposts()
    if (res) {
      setpost(res)
      if (res) {
        res.forEach(q => {
          if (q.Provider._id === initialState.userDetails.id) {
            let filteredArray = res.filter(item => item !== q)
            setpost(filteredArray)
          }
        });
      }
    }
  }
  useEffect(() => {
    fetchpost()
  }, [])
  useEffect(() => {
    console.log(post)
  }, [post])


  const onLoadEffect = () => {
    setTimeout(() => {
      setloading(false);
    }, 1000);

  }; useEffect(onLoadEffect, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="bg-inherit px-8 my-20 font-sans  font-medium">
        <div class="h-max  grid grid-col-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-row-4 gap-10 ">
          <div class="text-black bg-white text-center mx-2 text-5xl rounded-2xl shadow-2xl row-span-6 md:row-span-3 my-12 ">
            <div className="flex flex-col items-center justify-center">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for posts"
                className="px-4 py-2 mb-4 text-xl outline-none rounded-lg"
              />

              <button onClick={()=>{searchpostbyC(searchTerm)}}
                className="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer"
              >Search
              </button>
            </div>
          </div>
  

         {post?.map((q, i) => (
          <div className="bg-white w-2/3 md:w-full mx-auto hover:scale-105 hover:delay-300  font-sans my-12 text-black border-slate-300 rounded-2xl shadow-2xl">
            <div className="h-42 overflow-hidden relative">
              <img
                className="mb-2 rounded-t-2xl  "
                src={`https://picsum.photos/500/350?random=${i}`}
                alt=""
              />
            </div>
            <div className=" w-full bg-white px-4 py-4 shadow-md rounded-b-2xl transition transform duration-500 ">
              <div className="flex flex-col justify-start">
                <div className="flex justify-between items-center w-96">
                  <div className="text-2xl capitalize font-semibold text-bookmark-blue flex space-x-1 items-center mb-2">
                    <svg
                      className="w-6 h-6 text-gray-700 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    <span>{q.category}</span>
                  </div>
                </div>
                <div className="text-base text-gray-500 flex space-x-1 items-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="ml-4 font-medium">{q.location}</div>
                </div>

                <div className="text-base text-gray-500 flex space-x-1 items-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 mr-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                    />
                  </svg>

                  <span>{q.price} {q.currency} </span>
                </div>

                <div className="text-base text-gray-500 flex space-x-1 items-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 mr-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>

                  <span className="ml-4">
                    {" "}
                    Posted by: <span> </span>
                    <span className=" hover:underline cursor-pointer">
                      {q.Provider.fullname}
                    </span>
                  </span>
                </div>

                <hr className="h-px my-4 ml-2 mr-2 bg-gray-200 border-0 dark:bg-gray-700" />

                {/* <p className="space-x-1 px-4 text-base">Posted by ..... "Bradly Ramos"</p> */}
                <div>
                  <div className="flex flex-col mb-4 mt-4">
                    <button
                      onClick={() => {
                        toPost(q._id);
                      }}
                      className="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer"
                    >
                      View Details
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div >
      <Outlet />
    </>
  );
}
export default Viewposts;

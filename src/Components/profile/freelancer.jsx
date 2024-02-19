import { React, useEffect, useState } from "react";
import { initialState } from "../context/reducer";
import { useLocation, useNavigate } from "react-router-dom";
import { getProfile, getImage } from "../services/profileAPI";
import { baseURL } from "../services/api";
import moment from "moment";

export function Freelancer() {
    const [DOB, setDOB] = useState()
    const [Data, setData] = useState({})
    const [ImageSrc, setImageSrc] = useState(null);
    const navigate = useNavigate()
    const location = useLocation();

    async function fetchdata(id) {
        const res = await getProfile(id)
        getImage(res.image)
            .then(response => {
                setImageSrc(response.request.responseURL);
            })
            .catch(error => {
                console.log(error);
            })
            console.log(res)
        if (res) {
            setDOB(moment(res.DOB).utc().format('YYYY-MM-DD'))
        } setData(res)
    }
    useEffect(() => {
        const id = location.state.ID
        fetchdata(id)
    }, [])
    useEffect(() => {
    }, [ImageSrc])
    useEffect(() => {
    }, [Data])


    return (
        <>
            {Data && (
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
                                                    {Data.user?.email}
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
                </div>
            </div>
            )}
        </>
    )
}

export default Freelancer;
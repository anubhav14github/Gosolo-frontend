import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addbidder, confirmnull, getpaymentbypostID, getpostbyID, updateWS, updatefile, updatepaystatus } from "../services/postAPI";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import { initialState } from "../context/reducer";
import Madal from "../home/modal";
import { addW, getImage, profilepic } from "../services/profileAPI";


export function Post() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [post, setpost] = useState()
    const [body, setbody] = useState()
    const [bidders, setbidders] = useState([])
    const [ImageSrc, setImageSrc] = useState([]);
    const [selected, setselected] = useState()
    const [Suser, setSuser] = useState(false)
    const [work, setwork] = useState(false)
    const [User, setUser] = useState(false)
    const [selectedImg, setselectedImg] = useState()
    const [showmodal, setshowmodal] = useState(false);
    const [message, setmessage] = useState();
    const [applied, setapplied] = useState(false);
    const [worksubmitted, setworksubmitted] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [link, setlink] = useState(true);
    const [file, setfile] = useState(false);
    const [payment, setpayment] = useState({});
    const [paystatus, setpaystatus] = useState();
    const [worksample, setworksample] = useState({
        name: "",
        link: "",
    })
    const handleChangeW = (e) => {
        setworksample({ ...worksample, [e.target.name]: e.target.value });
    };

    function handleFileInput(event) {
        setSelectedFile(event.target.files[0]);
    }

    const apply = async () => {
        const id = initialState.userDetails.id;
        const PostID = post._id
        const res = await addbidder(PostID, id)
        if (res) {
            setmessage("Congratulations!!! you have applied succesfully. If you get selected it will be reflected within your profile section")
            setshowmodal(true)
            setbidders(res.user.bidders)
            setapplied(true)
            // if (res.user.bidders) {
            //     res.user.bidders?.map(async (q) => {
            //         const img = await getImage(q.image)
            //         setImageSrc(prev => [...prev, img.request.responseURL])
            //     })

            // }

        }
    }
    async function fetchpostdata(id) {
        const answer = id.split(':');
        const res = await getpostbyID(answer[1])
        if (res) {
            setpost(res)
            setbody(res.body)
            if (res.Selected !== null) {
                setapplied(true)
                setselected(res.Selected)
                const img = res.Selected.image
                const r = await getImage(img)
                setselectedImg(r.request.responseURL)
                setSuser(true)
                if (res.Selected._id === initialState.userDetails.id) {
                    setUser(true)
                }
                if (res.Paystatus === "paid") {
                    setpaystatus("paid")
                } else {
                    setpaystatus(res.Paystatus)
                }
            }
            else {
                setbidders(res.bidders)
                // res.bidders?.map(async (q) => {
                //     const img = await getImage(q.image)
                //     setImageSrc(prev => [...prev, img.request.responseURL])
                // })
                fetchbidder()

            }

        }
    }
    function fetchbidder() {
        const id = initialState.userDetails.id
        bidders.forEach((q, i) => {
            if (q._id === id) {
                setapplied(true)
                setUser(true)
            }
        })
    }
    async function fetchpayment() {
        const result = await getpaymentbypostID(post._id)
        if (result) {
            if(result.data && result.data.length ===1){
                setpayment(result)
            }else if(result.message === "No"){
                setpayment(result)
            }
        }
    }
    const toProfile = (id) => {
        navigate('/Freelancer', { state: { ID: id } })
    }
    const tochat = async () => {
        const iID = post.Provider._id
        const sID = initialState.userDetails.id
        var a = [];
        a.push(sID, iID);
        navigate('/Chat', { state: { ids: a, me: sID, other: iID, postID: post._id } })
    }
    const setfileA = () => {
        setfile(true)
        setlink(false)
    }
    const setlinkA = () => {
        setfile(false)
        setlink(true)
    }
    const verifypayment = async () => {
        const res = await updatepaystatus(post._id)
        if (res) {
            setpaystatus(res.data.Paystatus)
            console.log(res.data)
        }
    }
    const sendlink = async () => {
        if (worksample) {
            const res = await addW(worksample)
            if (res) {
                const r = await updateWS(post._id, res._id)
                if (r) {
                    const i = await confirmnull(post._id)
                    setshowmodal(true);
                    setmessage(`Work submitted succesfully`)
                    setwork(true)
                    setworksubmitted(true)
                }
            }
        }
    }
    const sendfile = async () => {
        if (selectedFile !== null) {
            const picture = await profilepic(selectedFile);
            console.log(picture)
            const file = picture.files.filename
            if (file) {
                const res = await updatefile(post._id, file)
                if (res) {
                    const i = await confirmnull(post._id)
                    setshowmodal(true);
                    setmessage(`Work submitted succesfully`)
                    setwork(true)
                    setworksubmitted(true)

                }
            }
        }

    }
    useEffect(() => {
        fetchpostdata(id)
    }, [])
    useEffect(() => {
        if (bidders && bidders !== undefined && bidders.length > 0) {
            fetchbidder()
        }
        console.log(bidders)
    }, [bidders])
    useEffect(() => {
    }, [selectedFile])

    useEffect(() => {
        console.log(post)
        if (post !== undefined) {
            if (post.worksample && post.worksample !== null && Object.keys(post.worksample).length > 0) {
                setworksubmitted(true)
                setwork(true)
            } else if (post.file && post.file !== null) {
                setworksubmitted(true)
                setwork(true)
            }
        }
        if (post && post._id) {
            fetchpayment(post._id)
        }
    }, [post])
    useEffect(() => {
        if (bidders && bidders.length > 0) {
            bidders.forEach(async (q) => {
                // console.log(q.image)
                const img = await getImage(q.image)
                setImageSrc(prev => [...prev, img.request.responseURL])

            })

        }
    }, [bidders])
    useEffect(() => {
        console.log(ImageSrc)
    }, [ImageSrc])

    return (
        <>
            <div className="hidden">
                <Madal show={showmodal} message={message} close={() => setshowmodal(false)} />
            </div>
            {post && body && (
                <div class="flex h-max bg-transparent font-sans my-16">
                    {/* <!-- left --> */}

                    {/* <!-- main --> */}
                    <div class="flex-1 flex flex-col overflow-hidden">
                        <main class="flex-1 overflow-x-hidden overflow-y-auto mx-2">
                            <div class="w-full px-2 md:w-2/3 mx-auto my-10 mb-20 lg:px-20 md:px-12 pb-12 bg-white shadow-2xl rounded-2xl">
                                {/* <!-- search --> */}

                                {/* <!-- title --> */}
                                <div class=" flex flex-col justify-center items-center">
                                    <div>
                                        <h1 className="flex justify-center mt-8 mb-4 text-4xl leading-8 text-gray-700 py-6">
                                            {post.title}
                                        </h1>

                                    </div>
                                </div>
                                <hr class="border-gray-500 mt-8 mb-4" />
                                <div className="text-lg bg-inherit">
                                    <MDEditor.Markdown source={body} />
                                </div>
                                <div class="flex flex-col items-center mt-8">
                                    <div class="space-y-4 ">
                                        <ul class="list-disc ml-4 space-y-2">
                                            <span class="text-lg font-semibold text-gray-800 -ml-4">
                                                Minimum qualifications:
                                            </span>
                                            <li class="text-gray-600 text-base">
                                                Bachelor's degree in Design, related field, or equifalent
                                                practical experience.
                                            </li>
                                            <li class="text-gray-600 text-base">
                                                7 years of experience as a UX or Interaction Designer.
                                            </li>
                                        </ul>
                                        <ul class="list-disc ml-4 font-bold space-y-2 py-4">
                                            <span class="font-semibold text-lg text-gray-800 -ml-4">
                                                Details
                                            </span>
                                            <li class="text-gray-600 text-base">
                                                {post.price} {post.currency}
                                            </li>
                                            <li class="text-gray-600 text-base">
                                                {post.location}
                                            </li>
                                        </ul>
                                        <hr class="border-gray-500 my-4" />
                                        <div className="py-6">
                                            <span className="font-semibold text-lg my-2 text-gray-800">
                                                About the job:
                                            </span>
                                            <p class="text-base text-gray-600">
                                                Spam identification is one of the most basic applications of machine learning. Most of our email inboxes also have an unsolicited, bulk, or spam inbox, where our email provider automatically filters unwanted spam emails.
                                                But how do they know that the email is spam? consectetur adipisicing elit.
                                                Cumque, aspernatur. Sequi consequatur aspernatur architecto
                                                temporibus voluptatibus quidem a quas iure. Perspiciatis
                                                cumque, minus fuga dolorem repudiandae molestiae natus saepe
                                                quam!
                                            </p>
                                        </div>

                                    </div>
                                </div>
                                {!applied && (
                                    < div class="mt-8 flex justify-center">
                                        {initialState.userDetails.role[0] === 'FREELANCER' && (
                                            <div class="flex items-center justify-between space-x-2 my-6">
                                                <button onClick={() => { apply() }}
                                                    type="button"
                                                    class="hover:scale-105 delay-300 px-8 py-3 rounded-2xl bg-indigo-500 text-base text-white font-semibold focus:outline-none focus:border-red-800"
                                                >
                                                    Apply Now
                                                </button>

                                            </div>
                                        )}
                                    </div>
                                )}
                                {bidders && !Suser && (
                                    <div className="w-full p-4 my-12 h-auto bg-white border border-gray-200 rounded-2xl shadow-2xl sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                        <div className="flex items-center justify-between mb-4">
                                            <h5 className="text-2xl font-bold leading-9 text-gray-900 dark:text-white ">
                                                Latest Applied Users
                                            </h5>
                                        </div>
                                        {bidders.length === 0 && (
                                            <div className="flex  text-xl my-4 leading-6 text-gray-700">
                                                No one has applied!!! Be the first one
                                            </div>
                                        )}
                                        {bidders.length > 0 && (
                                            <div className="flow-root ">
                                                <ul
                                                    role="list"
                                                    className="divide-y my-8 divide-gray-200 dark:divide-gray-700"
                                                >
                                                    {bidders.map((q, i) => (
                                                        <li className="py-3 sm:py-4">
                                                            <div className="flex items-center space-x-4">
                                                                <div className="hidden md:block flex-shrink-0">
                                                                    <img
                                                                        className="w-12 h-12 rounded-full"
                                                                        src={ImageSrc[i]}
                                                                        alt="Neil image"
                                                                    />
                                                                </div>
                                                                <div className="flex-1 min-w-0 text-xs md:text-base">
                                                                    <p className="text-xl font-medium text-gray-900 truncate dark:text-white">
                                                                        {q.fullname}
                                                                    </p>

                                                                </div>
                                                                <div className="inline-flex md:items-center text-xs md:text-base font-semibold text-gray-900 dark:text-white">
                                                                    <button
                                                                        onClick={() => { toProfile(q.profileID) }}
                                                                        className="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                                                                        View Profile
                                                                    </button>
                                                                </div>
                                                            </div>

                                                        </li>
                                                    ))}

                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {selected && Suser && selectedImg && (
                                    <div className="w-full p-4 my-12 h-auto bg-white border border-gray-200 rounded-2xl shadow-2xl sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                        <div className="flex items-center ml-4 mt-4 justify-between mb-4">
                                            <h5 className="text-2xl  font-bold leading-9 text-gray-900 dark:text-white ">
                                                Selected Freelancer
                                            </h5>
                                        </div>
                                        {User && initialState.userDetails.role[0] === 'FREELANCER' && (
                                            <div className="flex mx-4 font-semibold text-xl my-6 leading-6 text-gray-700">
                                                Congratulations!! You have been selected for this work
                                            </div>
                                        )}
                                        {!User && initialState.userDetails.role[0] === 'FREELANCER' && (
                                            <div className="flex mx-4 font-semibold text-xl my-6 leading-6 text-gray-700">
                                                Sorry! User have selected some other Freelancer. Try some other post.
                                            </div>
                                        )}
                                        <div className="flow-root ">
                                            <ul
                                                role="list"
                                                className="divide-y my-4 divide-gray-200 dark:divide-gray-700"
                                            >
                                                <li className="py-3 sm:py-4">
                                                    <div className="flex items-center md:ml-4 space-x-4">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                className="w-12 h-12 rounded-full"
                                                                src={selectedImg}
                                                                alt="Neil image"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xl font-medium md:ml-4 text-gray-900 truncate dark:text-white">
                                                                {selected.fullname}
                                                            </p>
                                                        </div>
                                                        <div className="inline-flex items-center text-xs md:text-base font-semibold text-gray-900 dark:text-white">

                                                            {initialState.userDetails.id === selected._id && initialState.userDetails.role[0] === 'FREELANCER' && (
                                                                <button
                                                                    onClick={() => { tochat() }}
                                                                    className="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                                                                    Chat
                                                                </button>
                                                            )}


                                                        </div>

                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                )}
                                {Suser && !work && initialState.userDetails.id === selected._id && (
                                    <div className="w-full p-4 my-12 h-auto bg-white border border-gray-200 rounded-2xl shadow-2xl sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                        <div className="flex items-center ml-4 mt-4 justify-between mb-2">
                                            <h5 className="text-2xl  font-bold leading-9 text-gray-900 dark:text-white ">
                                                Your work
                                            </h5>
                                        </div>
                                        {post && post.confirm === "no" ?
                                            <div className="flex ml-4 text-xl mb-8 leading-6 text-gray-700">
                                                Resubmit your work here.
                                            </div>
                                            :
                                            <div className="flex ml-4 text-xl mb-8 leading-6 text-gray-700">
                                                Submit your work here.
                                            </div>
                                        }
                                        <div className="mx-4 mt-12 text-base font-normal">
                                            <button onClick={() => { setlinkA() }}
                                                className="px-6 py-2 border-2 border-gray-400"> Link </button>
                                            <button onClick={() => { setfileA() }}
                                                className="ml-4 px-6 py-2 border-2 border-gray-400">  File </button>
                                        </div>
                                        {file && !work && (
                                            <div className="flex flex-col mb-8">
                                                <label htmlFor="fileInput" className="ml-4 mt-8 mb-2 font-medium">
                                                    Choose a file:
                                                </label>
                                                <input
                                                    id="fileInput"
                                                    type="file"
                                                    accept=".pdf,.docx,image/*"
                                                    onChange={handleFileInput}
                                                    className="py-2 px-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                />
                                                {selectedFile && (
                                                    <p className="ml-4 my-2">
                                                        Selected file: {selectedFile.name}
                                                    </p>
                                                )}
                                                <div className="pt-8 flex justify-center">
                                                    <button onClick={() => { sendfile() }}
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>

                                        )}
                                        {link && !work && (
                                            <>
                                                <div className="flex-auto sm:flex mt-8 mb-2 ml-4">
                                                    <div className="w-full px-1">
                                                        <label className="block text-gray-700 font-bold">Name/Title</label>
                                                        <input
                                                            type="text" name="name" value={worksample.name} onChange={handleChangeW}
                                                            placeholder="title "
                                                            className="shadow appearance-none  w-full h-10 mt-2 mb-6 px-2 py-1 border outline-none leading-tight rounded text-gray-700 focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className="w-full px-1">
                                                        <label className="block text-gray-700 font-bold ">Link</label>
                                                        <input
                                                            type="text" name="link" value={worksample.link} onChange={handleChangeW}
                                                            placeholder="link to the work"
                                                            className="shadow appearance-none w-full h-10 mt-2 mb-6 px-2 py-1 border outline-none leading-tight rounded text-gray-700 focus:outline-none"
                                                        />
                                                    </div>
                                                </div>
                                                <div className=" flex justify-center mb-4">
                                                    <button onClick={() => { sendlink() }}
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                        Submit
                                                    </button>
                                                </div>
                                            </>
                                        )}


                                    </div>
                                )}

                                {post && Suser && worksubmitted && work && initialState.userDetails.id === selected._id && (
                                    <div className="w-full p-4 my-12 h-auto bg-white border border-gray-200 rounded-2xl shadow-2xl sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                        <div className="flex items-center ml-4 mt-4 justify-between mb-2">
                                            <h5 className="text-2xl  font-bold leading-9 text-gray-900 dark:text-white ">
                                                Your work
                                            </h5>
                                        </div>
                                        {payment && payment.message === "No" && (
                                            <div className="flex ml-4 text-xl my-8 mb-8 leading-6 text-gray-700">
                                                Wait until the Provider reviews and proceeds with payment.
                                            </div>
                                        )}
                                        {payment.data && payment.data.length ===1 && paystatus === "unpaid" && (
                                            <div className="my-6">
                                                <h5 className="text-xl  font-semibold leading-9 text-gray-900 dark:text-white ">
                                                    {post.Provider.fullname} has made payment. Verify payment
                                                </h5>
                                                <div className=" ">
                                                    <button onClick={() => { verifypayment() }}
                                                        className="mr-2 my-1 uppercase tracking-wider px-4 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                                                        yes
                                                    </button>
                                                </div>

                                            </div>
                                        )}
                                        {payment.data && paystatus === "paid" && (
                                            <div className="my-6">
                                                <h5 className="text-2xl  font-semibold leading-9 text-gray-900 dark:text-white ">
                                                   Congratulations!!! Post is Completed!!.
                                                </h5>
                                            
                                            </div>
                                        )}

                                    </div>
                                )}
                            </div>
                        </main>
                    </div>
                    {/* <!-- right --> */}
                </div>
            )}

        </>
    )
}

export default Post;
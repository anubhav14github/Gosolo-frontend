import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getpostbyID, selectbidder, reviewwork, resubmit, order, verify, getpaymentbypostID } from "../services/postAPI";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import { initialState } from "../context/reducer";
import { getImage } from "../services/profileAPI";
import Madal from "../home/modal";
import Loader from "../home/loader";


export function Provider(props) {
    const [showmodal, setshowmodal] = useState(false);
    const [message, setmessage] = useState();
    const [post, setpost] = useState({})
    const [body, setbody] = useState()
    const [bidders, setbidders] = useState([])
    const [selected, setselected] = useState()
    const [Suser, setSuser] = useState(false)
    const [work, setwork] = useState(false)
    const [WS, setWS] = useState({})
    const [confirm, setconfirm] = useState(false)
    const [file, setfile] = useState()
    const [selectedImg, setselectedImg] = useState()
    const [ImageSrc, setImageSrc] = useState([]);
    const [payment, setpayment] = useState({});
    const [Paystatus, setPaystatus] = useState();
    const [loading, setloading] = useState(false);
    const [success, setsuccess] = useState(false);
    const navigate = useNavigate()
    async function fetchpostdata(id) {
        const res = await getpostbyID(id)
        if (res) {
            setpost(res)
            setbody(res.body)
            if (res.Selected !== null) {
                setselected(res.Selected)
                const img = res.Selected.image
                const r = await getImage(img)
                setselectedImg(r.request.responseURL)
                setSuser(true)
            }
            else {
                setbidders(res.bidders)
                res.bidders?.map(async (q) => {
                    const img = await getImage(q.image)
                    setImageSrc(prev => [...prev, img.request.responseURL])
                })
            }
            if (res.confirm === "no") {
                setwork(false)
            }
            if (res.Paystatus === "paid") {
                setPaystatus(res.Paystatus)
            }
        }
    }
    async function fetchwork(file) {
        if (file !== undefined) {
            const res = await getImage(file)
            if (res) {
                setwork(true)
                setfile(res.request.responseURL)
            }
        }
    }
    async function fetchpayment() {
        const result = await getpaymentbypostID(post._id)
        if (result) {
            setpayment(result)
        }
    }
    async function fetchWS() {
        setwork(true)
        setWS(post.worksample)
    }
    const toProfile = (id) => {
        navigate('/Freelancer', { state: { ID: id } })
    }
    const verifywork = async (ans) => {
        const res = await reviewwork(post._id, ans)
        if (res.data) {
            setshowmodal(true)
            setmessage("response noted succesfully")
            if (res.data.confirm === "no") {
                const r = await resubmit(post._id)
                setwork(false)
            } else {
                setsuccess(true)
                setpost(res.data)
            }
        }
    }
    const select = async (id) => {
        const postID = post._id
        const res = await selectbidder(postID, id)
        if (res) {
            setmessage("User selected succesfully")
            setshowmodal(true)
            setSuser(true)
            setselected(res.data.Selected)
            const img = res.data.Selected.image
            const r = await getImage(img)
            setselectedImg(r.request.responseURL)
        }
    }
    const tochat = async (sID) => {
        const iID = initialState.userDetails.id;
        var a = [];
        a.push(sID, iID);
        navigate('/Chat', { state: { ids: a, me: iID, other: sID, postID: post._id } })
    }
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    const handlePayment = async () => {
        try {
            const res = await order(post.price, post._id)
            if (res) {
                console.log(res)
                initPayment(res.result.data);
            }

        } catch (error) {
            console.log(error);
        }
    };
    const initPayment = async (data) => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        const options = {
            key: "rzp_test_r6AlcEV3sS9jSE",
            amount: data.amount,
            currency: data.currency,
            name: "Work Payment",
            description: "Test Transaction",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const res = await verify(response)
                    if (res) {
                        console.log(res)
                        const result = await getpaymentbypostID(post._id)
                        if (result) {
                            console.log(result)
                            setpayment(result)
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };


    useEffect(() => {
        fetchpostdata(props.id)
    }, [])
    useEffect(() => {
        console.log(post)
    }, [post])
    useEffect(() => {
        if (post && post.file === undefined) {
        } else{
            if (post && post.file !== null) {
                fetchwork(post.file)
            }
        }
    }, [post])
    useEffect(() => {
           if(post&& post.worksample !== undefined  ){
            if (post && post.worksample !== null&& Object.keys(post.worksample).length > 0) {
                fetchWS()
            }
           }
    }, [post])
    useEffect(() => {
        if (post && post.confirm === "yes") {
            setsuccess(true)
        }
        if (post && post._id) {
            fetchpayment(post._id)
        }
    }, [post])

    useEffect(() => {
        console.log(selected)
    }, [selected])
    useEffect(() => {
    }, [ImageSrc])
    useEffect(() => {
    }, [bidders])
    useEffect(() => {
        console.log(payment)
    }, [payment])

    return (
        <>
            <div className="hidden">
                <Madal show={showmodal} message={message} close={() => setshowmodal(false)} />
            </div>
            {post && (
                <div class="flex h-max bg-transparent font-roboto">
                    {/* <!-- left --> */}
                    {/* <!-- main --> */}
                    <div class="flex-1 flex flex-col overflow-hidden">
                        <main class="flex-1 overflow-x-hidden overflow-y-auto ">
                            <div class="mx-4 w-auto sm:w-2/3 sm:mx-auto my-10 mb-20 px-4 md:px-20 pb-12 bg-white shadow-xl rounded-2xl">
                                {/* <!-- search --> */}

                                {/* <!-- title --> */}
                                <div class=" flex justify-center items-center">
                                    <div>
                                        <h1 className="flex justify-center font-bold mt-12 mb-4 text-4xl leading-8 text-gray-700 py-6">
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
                                            <span class="font-semibold text-lg text-gray-800">
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
                                    <div class="mt-8">
                                        {initialState.userDetails.role[0] === 'FREELANCER' && (
                                            <div class="flex items-center justify-between space-x-2">
                                                <button
                                                    type="button"
                                                    class="px-10 py-2 rounded-2xl bg-indigo-500 text-xs text-white font-semibold focus:outline-none focus:border-red-800"
                                                >
                                                    Apply Now
                                                </button>
                                                <button
                                                    type="button"
                                                    class="px-4 py-2 rounded-2xl bg-indigo-500 text-white font-semibold"
                                                >
                                                    <svg
                                                        class="w-5 h-5 text-white"
                                                        viewBox="0 0 512 512.0002"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill="white"
                                                            d="m256 0c-141.484375 0-256 114.496094-256 256 0 44.902344 11.710938 88.757812 33.949219 127.4375l-32.984375 102.429688c-2.300782 7.140624-.410156 14.96875 4.894531 20.273437 5.253906 5.253906 13.0625 7.214844 20.273437 4.894531l102.429688-32.984375c38.679688 22.238281 82.535156 33.949219 127.4375 33.949219 141.484375 0 256-114.496094 256-256 0-141.484375-114.496094-256-256-256zm0 472c-40.558594 0-80.09375-11.316406-114.332031-32.726562-4.925781-3.078126-11.042969-3.910157-16.734375-2.078126l-73.941406 23.8125 23.8125-73.941406c1.804687-5.609375 1.042968-11.734375-2.082032-16.734375-21.40625-34.238281-32.722656-73.773437-32.722656-114.332031 0-119.101562 96.898438-216 216-216s216 96.898438 216 216-96.898438 216-216 216zm25-216c0 13.804688-11.191406 25-25 25s-25-11.195312-25-25c0-13.808594 11.191406-25 25-25s25 11.191406 25 25zm100 0c0 13.804688-11.191406 25-25 25s-25-11.195312-25-25c0-13.808594 11.191406-25 25-25s25 11.191406 25 25zm-200 0c0 13.804688-11.191406 25-25 25-13.804688 0-25-11.195312-25-25 0-13.808594 11.195312-25 25-25 13.808594 0 25 11.191406 25 25zm0 0"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {bidders && !Suser && (
                                    <div className="w-full p-4 my-12 h-auto bg-white border border-gray-200 rounded-2xl shadow-2xl sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                        <div className="flex items-center justify-between mb-4">
                                            <h5 className="text-2xl font-bold leading-9 text-gray-900 dark:text-white ">
                                                Latest Applied Users
                                            </h5>
                                        </div>
                                        {bidders.length === 0 && (
                                            <div className="flex  text-xl my-8 leading-6 text-gray-700">
                                                No one has applied!!! Wait until users apply.
                                            </div>
                                        )}
                                        {bidders.length > 0 && (
                                            <div className="flow-root ">
                                                <ul
                                                    role="list"
                                                    className="divide-y my-8 divide-gray-200 dark:divide-gray-700"
                                                > {bidders.map((q, i) => (
                                                    <li className="py-3 sm:py-4">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex-shrink-0">
                                                                <img
                                                                    className="w-12 h-12 rounded-full"
                                                                    src={ImageSrc[i]}
                                                                    alt="Neil image"
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xl font-medium text-gray-900 truncate dark:text-white">
                                                                    {q.fullname}
                                                                </p>

                                                            </div>
                                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                                <button onClick={() => { toProfile(q.profileID) }}
                                                                    className="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                                                                    View Profile
                                                                </button>
                                                                <button onClick={() => { select(q._id) }}
                                                                    className="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                                                                    Accept
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
                                                Your Selected Freelancer
                                            </h5>
                                        </div>
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

                                                            <button
                                                                onClick={() => { tochat(selected._id) }}
                                                                className="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                                                                Chat
                                                            </button>


                                                        </div>

                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                        {!work && (
                                            <div className="flex mx-6 font-semibold text-xl my-4 leading-6 text-gray-700">
                                                User has not submitted any work yet.
                                            </div>
                                        )}
                                    </div>
                                )}
                                {work && (
                                    <div className="w-full p-4 my-12 h-auto bg-white border border-gray-200 rounded-2xl shadow-2xl sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                        <div className="flex items-center ml-4 mt-4 justify-between mb-2">
                                            {!success && (
                                                <h5 className="text-2xl  font-bold leading-9 text-gray-900 dark:text-white ">
                                                    Review Work
                                                </h5>
                                            )}
                                            {success && (
                                                <h5 className="text-2xl  font-bold leading-9 text-gray-900 dark:text-white ">
                                                    Final Work
                                                </h5>
                                            )}
                                        </div>
                                        <div className="mx-8 my-8">
                                            {!file && !WS && !loading && (
                                                <Loader />
                                            )}
                                            {file && (
                                                <iframe
                                                    title="PDF viewer"
                                                    src={file}
                                                    className="w-full h-96 border-none shadow-md"
                                                />
                                            )}
                                            {WS && !file && (
                                                <div>
                                                    <div className="text-teal-600 font-semibold text-xl">{WS.name}</div>
                                                    <a href={WS.link} target="_blank" className="text-gray-500 text-base "> Link: {WS.link} </a>
                                                </div>
                                            )}
                                            {!success && (
                                                <div className="my-6">
                                                    <h5 className="text-xl  font-semibold leading-9 text-gray-900 dark:text-white ">
                                                        Verify and Final work submission.
                                                    </h5>
                                                    <div className=" ">
                                                        <button onClick={() => { verifywork("yes") }}
                                                            className="mr-2 my-1 uppercase tracking-wider px-4 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                                                            Yes
                                                        </button>
                                                        <button onClick={() => { verifywork("no") }}
                                                            className="mr-2 my-1 uppercase tracking-wider px-4 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                                                            No
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            {success && payment.message === "No" && (
                                                <div className="my-6">
                                                    <h5 className="text-xl  font-semibold leading-9 text-gray-900 dark:text-white ">
                                                        Proceed to payment
                                                    </h5>
                                                    <div className=" ">
                                                        <button onClick={() => { handlePayment() }}
                                                            className="mr-2 my-1 uppercase tracking-wider px-4 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                                                            payment
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            {success && payment.data && Paystatus === "unpaid" && (
                                                <div className="my-6">
                                                    <h5 className="text-xl  font-semibold leading-9 text-gray-900 dark:text-white ">
                                                        Thank you for completing the payment. {payment.message}. wait until freelancer verifies it.!
                                                    </h5>

                                                </div>
                                            )}
                                            {success && payment.data && Paystatus === "paid" && (
                                                <div className="my-6">
                                                    <h5 className="text-2xl  font-semibold leading-9 text-gray-900 dark:text-white ">
                                                        Thank you. This post is completed.
                                                    </h5>

                                                </div>
                                            )}

                                        </div>

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

export default Provider;
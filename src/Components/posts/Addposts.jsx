import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import { Container, Modal } from "@mui/material";
import { addPost, deletepostbyid, getpostsbyproviderID } from "../services/postAPI";
import Madal from "../home/modal";
import Loader from "../home/loader";
import { initialState } from "../context/reducer";
import { useNavigate } from "react-router-dom";
import Provider from "./provider";


export function Addposts() {
    const mkdStr = `
# Markdown Editor

---

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

\`\`\`
`;
    const navigate = useNavigate()
    const [value, setValue] = React.useState(0);
    const [showmodal, setshowmodal] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [Post, setPost] = useState({
        title: "",
        category: '',
        price: '0',
        currency: "USD",
        location: ""
    })
    const [body, setbody] = useState(mkdStr);
    const [message, setmessage] = useState();
    const [viewpost, setviewpost] = useState(false);
    const [ID, setID] = useState();
    const [userpost, setuserpost] = useState([])
    const [loading, setloading] = useState(true)
    const handleChangePost = (e) => {
        setPost({ ...Post, [e.target.name]: e.target.value });
    };
    async function fetchUserpost(id) {
        const res = await getpostsbyproviderID(id)
        if (res) {
            console.log(res)
            setuserpost(res)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await addPost(Post, body)
        if (res) {
            setshowmodal(true)
            setmessage(`post created successfully`)
            fetchUserpost(res.Provider)
            setValue(0)
        }

    };

    const toPost = (id) => {
        // navigate(`/ViewPosts/:${id}`);
        console.log(id)
        setID(id)
        setviewpost(true)
    }
    const goback = () => {
        setviewpost(false)
    }
    const deletebyid = async (q) => {
        console.log(q)
        const res = await deletepostbyid(q._id)
        if (res) {
            console.log(res)
            setshowmodal(true)
            setmessage(`Post deleted succesfully`)
            // fetchUserpost(initialState.userDetails.id)
            setuserpost(oldValues => {
                return oldValues.filter(p => p !== q)
            })
        }
    }

    useEffect(() => {
    }, [userpost])
    useEffect(() => {
        const id = initialState.userDetails.id
        fetchUserpost(id)
    }, [])
    useEffect(() => {
    }, [value])


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
            <div className="hidden">
                <Madal show={showmodal} message={message} close={() => setshowmodal(false)} />
            </div>
            {!viewpost && (
                <div class="w-auto mx-1 sm:mx-8 my-8 h-max bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            <Tab label="Your Posts " {...a11yProps(0)} />
                            <Tab label="Create Post" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={1}>
                        <div className=" h-max w-full mx-1 sm:mx-auto ">
                            <div className=" my-16 w-full lg:flex font-serif lg:w-full mx-auto  flex flex-col items-center">
                                <div className="bg-white w-full md:w-2/3 m-8 p-8 md:mx-auto md:px-20 lg:m-0 border-2 shadow-2xl lg:rounded-3xl border-white">
                                    <h1 className="flex justify-center mt-4 mb-4 text-4xl leading-8 text-gray-700 py-6">
                                        Create Post
                                    </h1>
                                    <hr className=" bg-slate-600" />
                                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                                        <div className="my-10">
                                            <label
                                                className="block font-base xs:font-semibold text-lg capitalize tracking-wide text-gray-700 mb-2"
                                                htmlFor="title"
                                            >
                                                Job Title
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outlineS"
                                                type="text"
                                                name="title"
                                                id="title"
                                                placeholder="eg. I want to hire someone for my project"
                                                value={Post.title}
                                                onChange={handleChangePost}
                                            />
                                        </div>
                                        <div className="my-10">
                                            <label
                                                className="block font-base xs:font-semibold text-lg capitalize tracking-wide text-gray-700 mb-2"
                                                htmlFor="category"
                                            >
                                                Job Category
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outlineS"
                                                type="text"
                                                name="category"
                                                id="category"
                                                placeholder="eg. Programming"
                                                value={Post.category}
                                                onChange={handleChangePost}
                                            />
                                        </div>

                                        <div className="my-10">
                                            <label
                                                className="block font-base xs:font-semibold text-lg capitalize tracking-wide text-gray-700 mb-2"
                                                htmlFor="price"
                                            >
                                                Job Price
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outlineS"
                                                type="string"
                                                name="price"
                                                id="price"
                                                placeholder="0-1000"
                                                value={Post.price}
                                                onChange={handleChangePost}
                                            />
                                        </div>
                                        <div className="my-10">
                                            <label
                                                className="block font-base xs:font-semibold text-lg capitalize tracking-wide text-gray-700 mb-2"
                                                htmlFor="currency"
                                            >
                                                Currency
                                            </label>
                                            <select
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outlineS"
                                                name="currency"
                                                id="currency"
                                                value={Post.currency}
                                                onChange={handleChangePost}
                                            >
                                                <option value="INR">INR</option>
                                                <option value="USD">USD</option>
                                                <option value="EUR">EUR</option>
                                                <option value="GBP">GBP</option>
                                            </select>
                                        </div>
                                        <div className="my-10">
                                            <label
                                                className="block font-base xs:font-semibold text-lg capitalize tracking-wide text-gray-700 mb-2"
                                                htmlFor="category"
                                            >
                                                Location
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outlineS"
                                                type="text"
                                                name="location"
                                                id="location"
                                                placeholder="eg. WFH or Mumbai"
                                                value={Post.location}
                                                onChange={handleChangePost}
                                            />
                                        </div>
                                        <div className="my-10">
                                            <label
                                                className="block font-base xs:font-semibold text-lg capitalize tracking-wide text-gray-700 mb-2"
                                                htmlFor="description"
                                            >
                                                Job Description
                                            </label>
                                            <div className="mt-4" data-color-mode="light">
                                                <MDEditor height={400} value={body} onChange={setbody} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center mt-20 my-10">
                                            <button
                                                type="submit"
                                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                            >
                                                Submit
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={0}>
                        <div className="bg-inherit  font-sans font-medium">
                            {userpost.length > 0 && (
                                <div className="h-max grid grid-col-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-row-4 gap-10 ">
                                    {userpost?.map((q, i) => (
                                        <div className="bg-white font-sans my-12 text-black border-slate-300 rounded-b-2xl shadow-2xl">
                                            <div className="h-42 overflow-hidden relative">
                                                <img
                                                    className="mb-2 rounded-t-2xl"
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

                                                        {q.Paystatus === "paid" && (
                                                            <span className="ml-4">
                                                                {" "}
                                                                Status: <span> Completed</span>

                                                            </span>
                                                        )}
                                                        {q.Paystatus === "unpaid" && (
                                                            <span className="ml-4">
                                                                {" "}
                                                                Status: <span>Active </span>

                                                            </span>
                                                        )}
                                                    </div>
                                                    <div>
                                                    
                                                    </div>

                                                    <hr className="h-px my-4 ml-2 mr-2 bg-gray-200 border-0 dark:bg-gray-700" />

                                                    {/* <p className="space-x-1 px-4 text-base">Posted by ..... "Bradly Ramos"</p> */}
                                                    <div>
                                                        <div className="flex flex-col my-1">
                                                            <button
                                                                onClick={() => {
                                                                    toPost(q._id);
                                                                }}
                                                                className="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer"
                                                            >
                                                                View Details
                                                            </button>
                                                            <button
                                                                onClick={() => { deletebyid(q) }}
                                                                className="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer"
                                                            >
                                                                Delete
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            )}
                            {userpost.length === 0 && (
                                <>
                                    <div className="mt-20 my-10">
                                        <h1 className="flex justify-center mt-4 mb-4 text-4xl leading-8 text-gray-700 py-6">
                                            No posts available. Create one!!!
                                        </h1>
                                        <hr className=" bg-slate-600" />
                                        <hr className=" bg-slate-600" />
                                    </div>
                                </>
                            )}
                        </div>
                    </TabPanel>
                </div>
            )}
            {viewpost && (
                <>
                    <div className="flex justify-start mx-8 mt-8 text-base font-semibold text-gray-900  dark:text-white">
                        <button onClick={goback}
                            className="mr-2 my-1 uppercase tracking-wider p-4 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-base font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                            Go Back
                        </button>
                    </div>
                </>

            )}
            {viewpost && <Provider id={ID} />}
        </>
    );
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Container>
                    <Box sx={{ span: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                </Container>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
export default Addposts;
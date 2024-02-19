import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Madal from "../home/modal";
import { addBlog } from '../services/blogAPI';

function TabPanel(props) {

    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 6 }}>
                    <Typography>{children}</Typography>
                </Box>
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
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

export function CreateBlog(props) {
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
    const [showmodal, setshowmodal] = useState(false);
    const [message, setmessage] = useState();
    const [value, setValue] = React.useState(0);
    const [blog, setblog] = useState({
        title: '',
        category: '',
    });
    const [body, setbody] = useState(mkdStr)
    const navigate = useNavigate()
    const handleChangeBlog = (e) => {
        setblog({ ...blog, [e.target.name]: e.target.value });
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleBlog = async (e) => {
        try {
            const res = await addBlog(blog, body)
            if (res) {
                setshowmodal(true)
                setmessage("Blog created succesfully")
                setTimeout(() => {
                    navigate("/ViewBlog", { state: { id: res._id } })
                }, 3000);
            }
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        console.log(blog)
    }, [blog])

    return (
        <>
            <div className="hidden">
                <Madal show={showmodal} message={message} close={() => setshowmodal(false)} />
            </div>
            <div className="h-auto w-auto mx-16 my-16  ">
                <div className=" bg-white border border-gray-200 rounded-3xl shadow-2xl">
                    <Box
                        sx={{
                            flexGrow: 1,
                            bgcolor: "background.paper",
                            display: {
                                sm: "flex",
                            },
                            height: {
                                xs: 700,
                                md: 550
                            }
                        }}
                    >
                        <Tabs className="mx-2 my-4"
                            orientation="vertical"
                            // variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 6, borderColor: "divider" }}
                        >
                            <Tab label="Title" {...a11yProps(0)} />
                            <Tab label="Category" {...a11yProps(1)} />
                            <Tab label="Body" {...a11yProps(2)} />
                        </Tabs>
                        <TabPanel className="sm:w-2/3 w-full" value={value} index={0}>
                            <div className="">
                                <label
                                    for="default-input"
                                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                                >
                                    Add a Title
                                </label>

                                <input
                                    type="text" name="title" value={blog.title} onChange={handleChangeBlog}
                                    placeholder="Title"
                                    id="default-input"
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block  p-3 "
                                />

                            </div>
                        </TabPanel>
                        <TabPanel className="sm:w-2/3 w-full" value={value} index={1}>
                            <div className="">
                                <label
                                    for="default-input"
                                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                                >
                                    Category
                                </label>

                                <input
                                    type="text" name="category" value={blog.category} onChange={handleChangeBlog}
                                    placeholder="Category"
                                    id="default-input"
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block  p-3 "
                                />

                            </div>
                        </TabPanel>
                        <TabPanel className="w-full" value={value} index={2}>
                            <div className="">
                                <label
                                    for="default-input"
                                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                                >
                                    Add Body
                                </label>
                                <div>
                                    <MDEditor height={370} value={body} onChange={setbody} />
                                </div>
                                <div className="flex flex-col items-center my-8">
                                    <button onClick={handleBlog}
                                        type="submit"
                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>

                        </TabPanel>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default CreateBlog;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addcomments, getcommentsbyBlogID } from "../services/blogAPI";
import { initialState } from "../context/reducer";
import moment from "moment";


export function Comments(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [comments, setComments] = useState([
    ]);
    const [date, setdate] = useState([
    ]);
    const [blogID, setblogID] = useState();
    const [newComment, setNewComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newComment)
        const res = await addcomments(blogID, newComment)
        if (res) {
            console.log(res)
        }
        setNewComment("");
        fetchcomments(blogID)
    }
    async function fetchcomments(id) {
        const res = await getcommentsbyBlogID(id);
        if (res) {
            console.log(res)
            res.forEach(e => {
                const date = moment(e.createdAt).format("YYYY/MM/DD kk:mm:ss");
                setdate(prev => [...prev, date])
            });
            setComments(res)
        }

    }

    useEffect(() => {
        setblogID(props.blogID)
        fetchcomments(props.blogID)
    }, [])


    return (
        <div className="bg-transparent px-4 rounded-lg pb-20 pt-4 mb-8 shadow-2xl w-2/3 flex-col mx-auto">
            <h3 className="text-xl font-medium mb-4 text-center mt-16">Comments</h3>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="flex items-center pb-8 w-4/5 mx-auto">

                    <input
                        type="text"
                        placeholder="Add a comment"
                        className="border outline-none rounded-lg p-2 flex-grow"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="ml-2 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
                    >
                        Post
                    </button>
                </div>
            </form>
            {comments && date && comments !== undefined && comments.length > 0 && comments.map((q, i) => (
                <div className="flex mb-4 sm:mx-8 h-auto">

                    <div>
                        <div className="flex items-center mb-1">
                            {initialState.userDetails.fullname === q.user.fullname
                                ? <p className="text-gray-900 font-medium"> You</p>
                                : <p className="text-gray-900 font-medium">  {q.user.fullname}</p>}

                            <p className="text-gray-600 ml-2 text-sm">{date[i]}</p>
                        </div>
                        <p className="text-gray-800">{q.body}</p>
                    </div>
                </div>
            ))}


        </div>
    );
};

export default Comments;
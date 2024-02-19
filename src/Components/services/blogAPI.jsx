import axios from "axios";
import api, { baseURL } from "./api"
import { initialState } from "../context/reducer";

export async function addBlog(blog, bbody) {
    let res = {
        title: blog.title,
        category: blog.category,
        body: bbody,
    }
    const response = await axios.post(`${baseURL}/Createblog`, res, { headers: { 'Content-Type': 'application/json', 'x-access-token': `${initialState.token}` } })
    return response.data
}

export async function getblogById(id) {
    const response = await axios.get(`${baseURL}/getblogBy/${id}`, { headers: { 'Content-Type': 'application/json', 'x-access-token': `${initialState.token}` } })
    return response.data
}
export async function getblogByUserID(id) {
    const response = await axios.get(`${baseURL}/getblogbyUserID/${id}`, { headers: { 'Content-Type': 'application/json', 'x-access-token': `${initialState.token}` } })
    return response.data
}
export async function getblogs() {
    const response = await axios.get(`${baseURL}/getblogs`, { headers: { 'Content-Type': 'application/json', 'x-access-token': `${initialState.token}` } })
    return response.data
}
export async function addcomments(blogID, body) {
    let res = {
        blog: blogID,
        body: body,
    }
    const response = await axios.post(`${baseURL}/addComment`, res, { headers: { 'Content-Type': 'application/json', 'x-access-token': `${initialState.token}` } })
    return response.data
}

export async function getcommentsbyBlogID(id) {
    const response = await axios.get(`${baseURL}/getcommentsbyBlogID/${id}`, { headers: { 'Content-Type': 'application/json', 'x-access-token': `${initialState.token}` } })
    return response.data
}
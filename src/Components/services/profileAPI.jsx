import axios from "axios";
import api, { baseURL } from "./api"
import { initialState } from "../context/reducer";

export async function addQ(data) {
    let res = {
        types: data.types,
        Institute: data.Institute,
        marks: data.marks,
        year: data.year
    }
    const response = await axios.post(`${baseURL}/addqualifications`, res, { headers: { 'Content-Type': 'application/json', 'x-access-token': `${initialState.token}` } })
    return response.data
}
export async function addJ(data) {
    let res = {
        company: data.company,
        duration: data.duration,
        position: data.position
    }
    const response = await axios.post(`${baseURL}/addjob`, res, { headers: { 'Content-Type': 'application/json', 'x-access-token': `${initialState.token}` } })
    return response.data
}
export async function addW(data) {
    let res = {
        name: data.name,
        link: data.link,
    }
    const response = await axios.post(`${baseURL}/addworksample`,res, { headers: { 'Content-Type': 'application/json', 'x-access-token': `${initialState.token}` } })
    return response.data
}
export async function profilepic(pic) {
    let res = {
        file: pic
    }
    const response = await axios.post(`${baseURL}/upload`, res ,{ headers: { "Content-Type": "multipart/form-data", 'x-access-token': `${initialState.token}` } })
    return response.data
}
export async function Profiledata(data) {
    let res ={
        fullname: data.fullname,
        gender: data.gender,
        DOB: data.DOB ,
        phone : data.phone,
        qualification : data.qualification,
        worksample: data.work,
        job: data.job,
        Aboutme: data.Aboutme,
        image: data.pic
    }

    const response = await axios.post(`${baseURL}/addprofile`,res, { headers: { 'Content-Type': 'application/json', 'x-access-token': `${initialState.token}` } })
    return response.data
}
export async function addprofileID(id,fullname,img) {
    let res = {
        profileID: id,
        fullname: fullname,
        image:img
    }
    const response = await axios.patch(`${baseURL}/addprofileID`, res ,{ headers: { 'Content-Type': 'application/json', 'x-access-token': `${initialState.token}` } })
    return response.data
}
export async function getProfile(id) {
    const response = await axios.get(`${api.baseURL}/getprofile/${id}` ,{ headers: { 'Content-Type': 'application/json', 'x-access-token': `${initialState.token}` } })
    return response.data
}


export async function getImage(name) {
    try{
        const response = await axios.get(`${api.baseURL}/getImage/${name}`,{ headers: {'x-access-token': `${initialState.token }`,responseType: 'arraybuffer' }})
        return response
    }catch(error){
        console.log(error)
    }
}
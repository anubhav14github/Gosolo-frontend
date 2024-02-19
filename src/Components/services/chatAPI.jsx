import axios from "axios";
import api, { baseURL } from "./api"
import { initialState } from "../context/reducer";

export async function startchart(data) {
    const res={
        userIds:data.userIds,
        type: data.type,
        postID:data.postID
    }
    const response = await axios.post(`${baseURL}/initiate`, res, { headers: { 'Content-Type': 'application/json', 'x-access-token': `${initialState.token}` } })
    return response.data
}
export async function postmsg(chatroomID, msg) {
    const res={
        messageText:msg
    }
    const response = await axios.post(`${baseURL}/${chatroomID}/message`, res, { headers: { 'Content-Type': 'application/json', 'x-access-token': `${initialState.token}` } })
    return response.data
}
export async function getchatbyroomID(ID) {
    
    const response = await axios.get(`${baseURL}/${ID}`, { headers: { 'Content-Type': 'application/json', 'x-access-token': `${initialState.token}` } })
    return response.data
}
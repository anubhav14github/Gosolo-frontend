/* eslint-disable jsx-a11y/anchor-is-valid */
import { Routes, Route, Navigate } from "react-router-dom"
import { Home } from "../src/Components/home/home";
import { Register } from "./Components/register/register";
import { Login } from "./Components/register/login";
import { Viewposts } from "./Components/posts/viewposts";
import { Post } from "./Components/posts/post";
import { Header } from "./Components/home/header";
import { AuthProvider } from "./Components/context";
import { Profile } from "./Components/profile/Profile";
import { Blogs } from "./Components/blogs/blogs";
import { initialState } from "./Components/context/reducer";
import { Addposts } from "./Components/posts/Addposts"
import { React, useEffect } from "react";
import ProfileData from "./Components/profile/ProfileData";
import Freelancer from "./Components/profile/freelancer";
import ChatWindow from "./Components/chat/ChatWindow";
import { CreateBlog } from "./Components/blogs/CreateBlog";
import ViewBlog from "./Components/blogs/ViewBlog";


function App() {
 
  let user = sessionStorage.getItem("currentUser")
    ? JSON.parse(sessionStorage.getItem("currentUser"))
    : "";
  let token = sessionStorage.getItem("currentUser")
    ? JSON.parse(sessionStorage.getItem("currentUser")).accessToken
    : "";
  if (user && token) {
    if (initialState.isAuthenticated === false) {
      initialState.isAuthenticated = !initialState.isAuthenticated;
    }
  }
  return (
    <>
      <AuthProvider>
        <Header />
        <div className="isolate ">
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/ViewProfile" element={<ProfileData />} />
            <Route path="/ViewPosts" element={<Viewposts />} />
            <Route path="/Freelancer" element={<Freelancer />} />
            <Route path="/CreatePost" element={<Addposts />} />
            <Route path="/ViewPosts/:id" element={<Post />} />
            <Route path="/Blogs" element={<Blogs />} />
            <Route path="/ViewBlog" element={<ViewBlog />} />
            <Route path="/CreateBlog" element={<CreateBlog />} />
            <Route path="/Chat" element={<ChatWindow />} />
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;

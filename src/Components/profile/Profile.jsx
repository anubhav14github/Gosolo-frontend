import { React, useEffect, useState } from "react";
import { initialState } from "../context/reducer";
import { ProfileForm } from "./profileForm"
import Loader from "../home/loader";
import { useNavigate } from "react-router-dom";


export function Profile() {
   const [loading, setloading] = useState(true)
   const navigate = useNavigate();
   const onLoadEffect = () => {
      setTimeout(() => {
         setloading(false);
      }, 2000);

   }; useEffect(onLoadEffect, []);
   if (loading) {
      return <Loader />;
   } else if (initialState.userDetails.profileID !== null ) {
      navigate("/ViewProfile") 
   } return (
      <>
         {initialState.userDetails.profileID === null ? <ProfileForm /> : <></>}

      </>
   )
}

export default Profile;
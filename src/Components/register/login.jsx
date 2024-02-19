import { React, useState, useEffect } from 'react';
import img1 from "../assets/login1.jpg";
import PlaceholderImg from '../assets/log.jpg'
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
//import { useAuthDispatch, useAuthState } from '../context/context';
import { loginUser } from '../context/actions';
import { initialState } from '../context/reducer';
import Madal from '../home/modal';

export function Login() {
    // const dispatch = useAuthDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showin, setshowin] = useState(false)
    const [pass, setpass] = useState("password")
    const [message, setmessage] = useState();
	const [showmodal, setshowmodal] = useState(false);
    // const { loading, errorMessage } = useAuthState()
    //const [login, setlogin] = useState(initialState)
    useEffect(() => {
        if (initialState.isAuthenticated) {
            navigate("/profile")
        }
    }, [])

    const handleview = async (e) => {
        e.preventDefault()
        setshowin(!showin);
        if (showin) {
            setpass("password")
        } else {
            setpass("text")
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            let response = await loginUser({ email, password })
            if (response) {
                if (response.code === "ERR_BAD_REQUEST") {
                    if (response.response.data.message !== undefined)  {
                        setshowmodal(true)
                        setmessage(`${response.response.data.message}`)
                    } else {
                        setshowmodal(true)
                        setmessage(`${response.response.data}`)
                    }
                } else {
                    initialState.isAuthenticated = !initialState.isAuthenticated
                    initialState.loading = !initialState.loading
                    initialState.userDetails = response.data
                    initialState.token = response.data.accessToken
                    console.log(initialState)
                    navigate("/Profile")
                }

            }
        } catch (error) {

        }
    }

    return (
        <><div className="hidden">
            <Madal show={showmodal} message={message} close={() => setshowmodal(false)} />
        </div>
            <div className="pb-20 pt-16">
                <section className="bg-inherit min-h-screen flex items-center justify-center">
                    {/* Login */}
                    <div className="bg-transparent font-serif mx-8 xs:mx-16 border-2 justify-between flex rounded-2xl shadow-lg max-w-3xl p-5">
                        {/* form */}
                        <div className="w-auto xs:w-auto  sm:w-1/2 mr-2 my-auto xs:px-8">
                            <h2 className="xs:pt-4 font-medium text-4xl">Login</h2>
                            <p className="text-m text-gray-600 mt-2">If you are already a member, please log in</p>
                            <form onSubmit={handleLogin} data-testid="login-form"
                                autoComplete='off' action="" className="flex flex-col gap-4">
                                <input className="outline-none p-2 mt-8 rounded-xl border" data-testid="email-input"
                                    type="text" name="email" value={email}
                                    placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="relative">
                                    <input className="outline-none p-2 mt-3 rounded-xl border w-full"
                                        type={pass} name="password" value={password} data-testid="password"
                                        placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <svg onClick={handleview} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="cursor-pointer bi bi-eye absolute top-1/2 right-3" viewBox="0 0 16 16 ">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                    </svg>
                                </div>



                                {/* <button className="bg-[#BDBBC0] hover:bg-white rounded-xl text-black pt-1 pb-1">Login</button> */}
                                <button data-testid="submit-button"
                                    className="bg-indigo-600 mt-4 hover:bg-tertiary rounded-xl text-white py-2">Login</button>
                            </form>
                            {/* <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
                            <hr className="border-gray-500" />
                            <p className="text-center text-sm">OR</p>
                            <hr className="border-gray-500" />
                        </div>
                       <button className="bg-gray-300 border  hover:bg-gray-200 px-2 py-2 w-full rounded-xl mt-4 flex justify-center items-center text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="20" fill="currentColor" className="bi bi-google mr-3" viewBox="0 0 16 16">
                                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                            </svg>
                            Login with Google</button>
                            <div className="mt-3 text-xs flex justify-between items-center">
                            <p>Forgot your password?</p>
                            <button className="bg-white border px-5 py-2 rounded-xl ml-20 hover:underline">Click here</button>

                        </div>

                       */}
                            <hr className="mt-8 border-gray-500" />
                            <div className=" mt-10 text-base flex justify-between items-center">
                                <p>If you don't have an account register here.</p>
                                <Link to="/register" className="bg-white border px-5 py-2 rounded-xl hover:underline">Register</Link>
                            </div>

                        </div>

                        {/* image */}
                        <div className="sm:block hidden mx:auto my-auto h-max w-1/2">
                            <LazyLoadImage className="rounded-2xl" placeholderSrc={PlaceholderImg} src={img1} alt="" />
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default Login;
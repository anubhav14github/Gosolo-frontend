import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { initialState } from "../context/reducer";
import { logout } from "../context";
import { useAuthDispatch } from "../context";
export function Header() {
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(initialState)
    }, [initialState])
    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const logoutuser = async (e) => {
        e.preventDefault()
        initialState.isAuthenticated = !initialState.isAuthenticated
        dispatch({ type: 'LOGOUT' });
        logout(dispatch);
        navigate("/")
        window.location.reload()
    }
    return (
        <>
            <div className="isolate bg-white">
                <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
                    <svg
                        className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
                        viewBox="0 0 1155 678"
                    >
                        <path
                            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                            fillOpacity=".4"
                            d="M317.219 528.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                        />
                        <defs>
                            <linearGradient
                                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                                x1="1155.49"
                                x2="-78.208"
                                y1=".177"
                                y2="474.645"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4f9ce3" />
                                <stop offset={1} stopColor="#4f9ce3" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div className="px-8 pt-7 lg:px-8">
                    <nav
                        className="flex items-center justify-between "
                        aria-label="Global"
                    >
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="hidden lg:flex lg:gap-x-12">
                            <Link
                                to="/home"
                                className=" font-semibold leading-6 text-lg text-gray-900"
                            >
                                Home
                            </Link>
                            {initialState.isAuthenticated ? (
                                <Link
                                    to="/Profile"
                                    className="text-lg font-semibold leading-6 text-gray-900"
                                >
                                    Profile
                                </Link>
                            ) :
                                <Link
                                    to="/register"
                                    className="text-lg font-semibold leading-6 text-gray-900"
                                >
                                    Signup
                                </Link>
                            }

                            <Link
                                to="/ViewPosts"
                                className="text-lg font-semibold leading-6 text-gray-900"
                            >
                                Posts
                            </Link>
                            <Link
                                to="/Blogs"
                                className="text-lg font-semibold leading-6 text-gray-900"
                            >
                                Blogs
                            </Link>
                        </div>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            {initialState.isAuthenticated ? (
                                <button onClick={logoutuser}
                                    className="text-lg font-semibold leading-6 text-gray-900"
                                >
                                    Logout
                                </button>
                            ) :
                                <Link
                                    to="/login"
                                    className="text-lg font-semibold leading-6 text-gray-900"
                                >
                                    Log in <span aria-hidden="true">&rarr;</span>
                                </Link>
                            }
                        </div>
                    </nav>

                    <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                        <Dialog.Panel
                            focus="true"
                            className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden"
                        >
                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        <Link
                                            to="register"
                                            className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                                        >
                                            posts
                                        </Link>
                                        <Link
                                            to="register"
                                            className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                                        >
                                            blogs
                                        </Link>
                                    </div>
                                    <div className="py-6">
                                        {!initialState.isAuthenticated ? (
                                        <Link
                                            to="/login"
                                            className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                                        >
                                            Log in</Link>
                                        ) :
                                        (
                                        <button onClick={logoutuser}
                                            className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                                        >
                                            Logout
                                        </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Dialog>
                </div>
            </div>
        </>
    )
}

export default Header;
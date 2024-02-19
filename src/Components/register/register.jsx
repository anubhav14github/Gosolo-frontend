import { React, useState } from 'react';
import img2 from '../assets/signup.jpg'
import PlaceholderImg from '../assets/Lsignup.jpg'
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Madal from '../home/modal';
import { reguser } from '../services/regAPI';

// import { useAuthDispatch } from '../context/context';
export function Register() {

	const navigate = useNavigate();
	// const dispatch = useAuthDispatch();
	const RegUser = {
		isSubmitting: false,
		email: "",
		password: "",
		cnfpass: "",
		role: "",
		loading: false,
		errorMessage: null
	};
	const [message, setmessage] = useState();
	const [showmodal, setshowmodal] = useState(false);
	const [Data, setData] = useState(RegUser);
	const handleInputChange = async (e) => {
		setData({
			...Data,
			[e.target.name]: e.target.value
		});
	};
	const [showin, setshowin] = useState(false)
	const [pass, setpass] = useState("password")
	const handleview = async (e) => {
		e.preventDefault()
		setshowin(!showin);
		if (showin) {
			setpass("password")
		} else {
			setpass("text")
		}
	}

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			setData({
				...Data,
				isSubmitting: true,
				errorMessage: null,
				loading: true
			});
			try {
				let response = await reguser(Data)
				if (response) {
					console.log(response)
					setshowmodal(true)
					setmessage("Account created succesfully")
					setTimeout(() => {
						navigate("/login")
					}, 2000);
				}
			} catch (error) {
				console.log(error)
			}

		} catch (error) {
		}

	};
	return (
		<>
			<div className="hidden">
				<Madal show={showmodal} message={message} close={() => setshowmodal(false)} />
			</div>
			<div className="hidden">
				<Madal show={showmodal} message={message} close={() => setshowmodal(false)} />
			</div>
			<div className='pb-20 pt-20'>
				<section className="bg-inherit min-h-screen flex items-center justify-center">
					{/* reg */}
					<div className="bg-transparent font-serif flex justify-between mx-8  border-2 rounded-2xl shadow-lg max-w-3xl p-2">
						{/* form */}
						<div className="w-56 xs:w-auto sm:w-1/2 sm:my-auto px-2 xs:px-8">
							<h2 className="pt-8 font-medium text-4xl">Register</h2>
							<p className="text-base font-normal leading-8 text-gray-600 mt-2">If you are new, please register here</p>
							<form autoComplete='off' onSubmit={handleFormSubmit} className="flex flex-col gap-4 pt-4">
								<input
									className="outline-none p-2 mt-5 rounded-xl border"
									type={"text"}
									name="email" id="email" value={Data.email} onChange={handleInputChange}
									placeholder="Email"
								/>

								<div className="relative ">
									<input
										className="outline-none p-2 mt-3 rounded-xl border w-full"
										type={pass}
										name="password" id="password" value={Data.password} onChange={handleInputChange}
										placeholder="password"
									/>
									<svg onClick={handleview}
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="cursor-pointer bi bi-eye absolute top-1/2 right-3"
										viewBox="0 0 16 16 "
									>
										<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
										<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
									</svg>
								</div>

								<div className="relative pb-4">
									<input
										className="outline-none p-2 mt-5 rounded-xl border w-full"
										type={pass}
										name="cnfpass" id="cnfpass" value={Data.cnfpass} onChange={handleInputChange}
										placeholder="Confirm Password"
									/>
									<svg onClick={handleview}
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="cursor-pointer bi bi-eye absolute top-1/2 right-3"
										viewBox="0 0 16 16 "
									>
										<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
										<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
									</svg>
								</div>
								<div className="mb-3 text-inherit ">
									<select id="countries" name="role" value={Data.role} onChange={handleInputChange}
										className="bg-inherit font-serif border border-gray-300 text-gray-600 text-base font-medium rounded-lg outline-none block w-full p-2.5">
										<option defaultValue >Choose a Role</option>
										<option value="freelancer">Freelancer</option>
										<option value="provider">Provider</option>
									</select>
								</div>
								<button type="submit"
									className="bg-secondary rounded-xl text-white pt-2 pb-2 hover:bg-tertiary">
									Register
								</button>
							</form>
							{/*
							<div className="mt-10 grid grid-cols-3 items-center text-gray-500">
								<hr className="border-gray-500" />
								<p className="text-center text-sm">OR</p>
								<hr className="border-gray-500" />
							</div>

							<button className="bg-white border font-normal px-1 py-1 w-full rounded-xl mt-4 flex justify-center items-center text-m ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="30px"
									height="20"
									fill="currentColor"
									className="text-secondary bi bi-google mr-3"
									viewBox="0 0 16 16"
								>
									<path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
								</svg >
								Register with Google
	</button> */}
							<hr className="mt-10 mb-6 border-gray-500" />
							<div className=" mt-3 pb-4 text-base flex justify-between items-center">
								<p className='rounded-xl'>Already,If you have an account then Login here.</p>
								<Link to="/login" className="bg-white border ml-2 px-5 py-2 rounded-xl hover:bg-primary">
									Login
								</Link>
							</div>
						</div>

						{/* image */}
						<div className="sm:block hidden h-max my-auto w-1/2 px-3 ">
							<LazyLoadImage className="rounded-2xl h-fit my-auto "
								placeholderSrc={PlaceholderImg} src={img2} alt="" />
						</div>
					</div>
				</section>
			</div>
		</>
	)
}
export default Register;
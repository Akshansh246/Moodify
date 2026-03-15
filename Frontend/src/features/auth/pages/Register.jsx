import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";
import { useNavigate } from "react-router";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const {loading, handleRegister} = useAuth()
    const navigate = useNavigate()

    if (loading) {
        return <Loading/>
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await handleRegister({username, email, password})
        navigate('/')
    }


    return (
        <main className="w-full lg:h-full flex flex-col lg:flex-row justify-center items-center">
        <div className="w-full lg:w-130 lg:h-150 bg-linear-to-bl from-indigo-500 to-purple-600 text-stone-50 flex flex-col justify-center p-10 gap-7 lg:rounded-l-2xl">
            <div className="flex items-center gap-1.5">
                <svg
                    className="w-12"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M15 4.58152V12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C12.3506 9 12.6872 9.06016 13 9.17071V2.04938C18.0533 2.5511 22 6.81465 22 12C22 17.5229 17.5228 22 12 22C6.47715 22 2 17.5229 2 12C2 6.81465 5.94668 2.5511 11 2.04938V4.0619C7.05369 4.55399 4 7.92038 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 8.64262 17.9318 5.76829 15 4.58152Z"></path>
                </svg>
                <h2 className="font-bold text-2xl">Moodify</h2>
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold">
                Start Your journey to emotional well-being
            </h3>
            <div className="flex flex-col gap-2">
                <div className="h-0 w-15 border border-white/50" />
                    <p>
                        <i>
                        "Your emotions are the key to understanding your inner world."
                        </i>
                    </p>
            </div>
            <p className="text-white/50">
                Join thousands of users tracking their emotional patterns and
                listening to music according to their mood, finding peace in their
                lives.
            </p>
            <div className="w-full flex items-center justify-end lg:hidden">
                <div className="bg-white w-fit rounded-full p-2">
                    <svg className="w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 16.1716L18.3641 10.8076L19.7783 12.2218L12.0001 20L4.22192 12.2218L5.63614 10.8076L11.0001 16.1716V4H13.0001V16.1716Z"></path></svg>
                </div>
            </div>
        </div>

        <div className="bg-white w-full lg:h-160 lg:w-130 lg:rounded-2xl p-10 flex flex-col gap-7 shadow-lg shadow-black/50">
            <div>
                <h2 className="text-2xl font-bold">Create Account</h2>
                <p className="text-black/50">
                    Fill in your details to get started with Moodify
                </p>
            </div>

            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Username</label>
                    <input
                    className="border border-black/40 p-3 rounded-lg "
                    onInput={(e)=>{setUsername(e.target.value)}}
                    value={username}
                    type="text"
                    placeholder="John Doe"
                    name="username"
                    id="username"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email Address</label>
                    <input
                    value={email}
                    onInput={(e)=>{setEmail(e.target.value)}}
                    className='border border-black/40 p-3 rounded-lg '
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    id="email"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <input
                    value={password}
                    onInput={(e)=>{setPassword(e.target.value)}}
                    className='border border-black/40 p-3 rounded-lg '
                    type="text"
                    placeholder="*******"
                    name="password"
                    id="password"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input
                    value={confirmPass}
                    onInput={(e)=>{setConfirmPass(e.target.value)}}
                    className='border border-black/40 p-3 rounded-lg '
                    type="password"
                    placeholder="*******"
                    name="confirmPass"
                    id="confirmPass"
                    />
                </div>

                <button  className="bg-orange-400 text-white py-3 cursor-pointer rounded-lg mt-3" type="submit">Create Account</button>
            </form>
            <p className="text-sm text-center text-black/50">
                By clicking Create Account, you agree to our <u>Terms of Service</u> and <u>Privacy Policy</u>.
            </p>
        </div>
        </main>
    );
};

export default Register;

import React, { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {loading, handleLogin} = useAuth();
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        await handleLogin({email, password})
        navigate('/')
    }

    if (loading) {
        return(
            <Loading/>
        )
    }

    return (
        <main className='w-full h-full flex items-center justify-center'>
            <div className='h-160 w-130 bg-linear-to-r from-indigo-500 to-purple-600 text-stone-50 flex  flex-col justify-between p-10 rounded-2xl shadow-lg shadow-black/50'>
                <div className='flex flex-col gap-5'>
                    <svg className='w-12' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15 4.58152V12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C12.3506 9 12.6872 9.06016 13 9.17071V2.04938C18.0533 2.5511 22 6.81465 22 12C22 17.5229 17.5228 22 12 22C6.47715 22 2 17.5229 2 12C2 6.81465 5.94668 2.5511 11 2.04938V4.0619C7.05369 4.55399 4 7.92038 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 8.64262 17.9318 5.76829 15 4.58152Z"></path>
                    </svg>
                    <h1 className='font-bold text-4xl'>Embrace Your <br /> emotions.</h1>
                    <p className='text-white/80'>Join Thousands of users tracking their mental well-being and finding their inner-peace by chilling and listening to music they like at the moment. </p>
                </div>
                <div className='flex gap-3'>
                    <div className='h-13 w-0 border-white/50 border-2' />
                    <p className='text-white/50'><i>"The first step towards change is awareness. The second is acceptance."</i></p>
                </div>
            </div>
            <div className='h-150 w-130 p-10 rounded-r-2xl bg-white flex flex-col justify-evenly gap-5'>
                <div>
                    <h2 className='text-3xl font-bold'>Moodify</h2>
                    <p className='text-black/50'>Find your inner balance</p>
                </div>
                <form className='w-full flex flex-col gap-6' onSubmit={handleSubmit}>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email">Email or Username</label>
                        <input 
                        value={email}
                        onInput={(e)=>{setEmail(e.target.value)}}
                        className='border border-black/40 p-4 rounded-lg ' 
                        type="email" 
                        placeholder='hello@example.com' 
                        name='email' 
                        id='email' 
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="password">Password</label>
                        <input 
                        value={password}
                        onInput={(e)=>{setPassword(e.target.value)}}
                        className='border border-black/40 p-4 rounded-lg ' 
                        type="password" 
                        placeholder='*********' 
                        name='password' 
                        id='password' 
                        />
                    </div>

                    <button className='bg-orange-400 text-white py-3 rounded-lg cursor-pointer' type='submit'>Login to Dashboard</button>
                </form>
                <p>New to Moodify? <Link className='text-indigo-500' to={'/register'}>Create an Account.</Link></p>
            </div>
        </main>
    )
}

export default Login

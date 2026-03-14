import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { getMe, loginUser, logoutUser, registerUser } from "../services/auth.api";

export const useAuth = ()=>{
    const context = useContext(AuthContext)

    const {user, setUser, loading, setLoading} = context

    async function handleRegister({username, email, password}) {
        setLoading(true)
        const data = await registerUser({username, email, password})
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogin({username, email, password}) {
        setLoading(true)
        const data = await loginUser({username,email, password})
        setUser(data.user)
        setLoading(false)
    }

    async function handleGetMe() {
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogout() {
        setLoading(true)
        await logoutUser()
        setUser(null)
        setLoading(false)
    }

    useEffect(()=>{
        handleGetMe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return({
        user, loading, handleRegister, handleLogin, handleGetMe, handleLogout
    })
}
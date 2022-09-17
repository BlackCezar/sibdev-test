import { useState } from "react"

type useTokenReturn = {
    setToken: (token: string) => void,
    token: string | null,
    removeToken: () => void
}

const useToken = ():useTokenReturn => {
    const getToken = () => {
        const tokenString = localStorage.getItem('token')
        return tokenString
    }
    const [token, setToken] = useState(getToken())


    const saveToken = (token: string) => {
        localStorage.setItem('token', token)
        setToken(token)
    }

    const removeToken = () => {
        localStorage.removeItem('token')
    }

    return {
        setToken: saveToken,
        token,
        removeToken
    }
}

export default useToken
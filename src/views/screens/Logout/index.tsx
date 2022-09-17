import React from 'react'
import { Navigate } from 'react-router-dom'
import { logoutFetch } from 'store/authentication/authentication.actions'
import { useAppDispatch } from 'store/hook'
import useToken from 'views/lib/useToken'
interface ILogout {}

const Logout:React.FC<ILogout> = () => {
    const dispatch = useAppDispatch()
    const {removeToken} = useToken()
    
    dispatch(logoutFetch())
    removeToken()

    return <Navigate to="/login" />
}

export default Logout
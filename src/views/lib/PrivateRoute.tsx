// @flow
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "../../store/hook";
import {getUserProfile} from "../../store/authentication/authentication.actions";
import Layout from '../layout/Layout';
import { logout } from 'store/authentication/authentication.slice';
import useToken from "./useToken";
import { useEffect } from "react";

const PrivateRoute = ({children}: {children: JSX.Element}) => {
    const {token} = useToken()

    useEffect(() => {
        token ? dispatch(getUserProfile(token)) : dispatch(logout())
    }, [token])
    const dispatch = useAppDispatch()

    if (!token) {
        return <Navigate to='/login' />
    } else {
        return <Layout>{children}</Layout>;
    }
};

export default PrivateRoute
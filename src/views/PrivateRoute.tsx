// @flow
import * as React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const PrivateRoute = ({children}: {children: JSX.Element}) => {
    let location = useLocation()
    // @ts-ignore
    const { isAuth, loading } = useSelector(state => state.auth)

    if (loading) {
        return <p>Loading</p>
    }
    if (!isAuth) {
        return <Navigate to={'/login'} state={{from: location}} />
    }
    return children;
};

export default PrivateRoute
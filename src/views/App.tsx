import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import '../assets/scss/Common.scss'
import Home from './Home/index'
import Login from './Login'
import Logout from './Logout'
import NotFound from './NotFound'
import PrivateRoute from "./PrivateRoute";

export interface IAppProps {
}

const App: React.FC<IAppProps> = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='login' element={<Login/>}/>
                <Route path='logout' element={<Logout/>}/>
                <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

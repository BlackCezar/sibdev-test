import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import '../assets/scss/Common.scss'
import Home from './screens/Home/index'
import Login from './screens/Login/Login'
import Logout from './screens/Logout'
import NotFound from './screens/NotFound'
import PrivateRoute from "./lib/PrivateRoute";
import Favorite from './screens/Favorite/Favorite';

export interface IAppProps {
}

const App: React.FC<IAppProps> = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='login' element={<Login/>}/>
                <Route path='logout' element={<Logout/>}/>
                <Route path='favorite' element={<PrivateRoute><Favorite/></PrivateRoute>}/>
                <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

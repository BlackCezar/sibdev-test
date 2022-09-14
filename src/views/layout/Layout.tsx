import React from "react";
import Header from "./Header";
import {ILayout} from "./Layout.interface";
import './Layout.scss'

const Layout: React.FC<ILayout> = ({children}) => {
    return (
        <div className='layout'>
            <Header />
            <div className="layout-container">
                {children}
            </div>
        </div>
    )
}
export default Layout
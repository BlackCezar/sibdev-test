import React, {useState} from "react";
import {ReactComponent as EyeOff} from "assets/imgs/eye-off.svg";
import {ReactComponent as EyeOn} from "assets/imgs/eye-on.svg";

interface IPasswordToggle {
    showPass: React.MouseEventHandler,
    hidePass: React.MouseEventHandler
}

const PasswordToggle: React.FC<IPasswordToggle> = ({showPass, hidePass}) => {
    const [active, setActive] = useState('off')

    return (<div className='input-btn'>
        {active === 'off' ? <EyeOff onClick={ev => {
                setActive('on')
                showPass(ev)
            }}/> :
            <EyeOn onClick={ev => {
                setActive('off')
                hidePass(ev)
            }}/>}
    </div>)
}

export default PasswordToggle
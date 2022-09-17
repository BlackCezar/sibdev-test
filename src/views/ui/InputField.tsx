import React, { HTMLInputTypeAttribute, InputHTMLAttributes, useEffect, useLayoutEffect, useState } from "react"
import PasswordToggle from "./passwordToggle"

interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    name: string,
    items?: Array<SelectItem>,
    change: (val: string, type: string) => void
}

export type SelectItem = {
    value: string,
    label: string
}

export enum InputTypes {
    Text = 'text',
    Range = 'range',
    Select = 'select',
    Password = 'password'
}

const InputField: React.FC<IInputField> = ({ type, label, change, name, ...props }) => {
    const [tmpVal, setTmpVal] = useState<string>('')
    const togglePasswordType = () => {
        passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')
    }
    const [passwordType, setPasswordType] = useState('password')

    useLayoutEffect(() => {
        console.log(props.defaultValue, props.items)
        if (props.defaultValue) setTmpVal(props.defaultValue.toString())
    }, [props.defaultValue])

    useEffect(() => {
        if (tmpVal) change(tmpVal, name)
    }, [tmpVal])

    if (type === InputTypes.Range) {
        return <div className="input-field">
            <label htmlFor={name}>{props.required ? <span style={{ color: '#FF0000' }}>*</span> : ''}{label}</label>
            <div className="range">
                <input name={name} id={name} type="range" value={tmpVal} onChange={ev => setTmpVal(ev.target.value)} /><input onChange={ev => setTmpVal(ev.target.value)} value={tmpVal} />
            </div>
        </div>
    }
    if (type === InputTypes.Select) {
        return <div className="input-field">
            <label htmlFor={name}>{props.required ? <span style={{ color: '#FF0000' }}>*</span> : ''}{label}</label>
            <select name={name} id={name} value={tmpVal} onChange={ev => setTmpVal(ev.target.value)}>
                <option disabled>{props.placeholder || 'Выберите из списка'}</option>
                {props.items?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
    }
    if (type === InputTypes.Password) {
        return <div className="input-field">
            <label htmlFor={name}>{props.required ? <span style={{ color: '#FF0000' }}>*</span> : ''}{label}</label>
            <input name={name} id={name} type={passwordType} value={tmpVal} onChange={ev => setTmpVal(ev.target.value)} />
            <PasswordToggle showPass={togglePasswordType} hidePass={togglePasswordType}/>
        </div>
    }
    return <div className="input-field">
        <label htmlFor={name}>{props.required ? <span style={{ color: '#FF0000' }}>*</span> : ''}{label}</label>
        <input disabled={props.disabled} name={name} id={name} type="text" value={tmpVal} onChange={ev => setTmpVal(ev.target.value)} />
    </div>
}

export default InputField
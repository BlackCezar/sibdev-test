import React, { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from "react"

interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    items?: Array<SelectItem>,
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

const InputField: React.FC<IInputField> = ({ type, label, ...props }) => {
    const [tmpVal, setTmpVal] = useState('')

    if (type === InputTypes.Range) {
        return <div className="input-field">
            <label htmlFor="">{props.required ? <span style={{ color: '#FF0000' }}>*</span> : ''}{label}</label>
            <div className="range">
                <input  value={tmpVal} onChange={ev => setTmpVal(ev.target.value)} type="range" {...props} /><input onChange={ev => setTmpVal(ev.target.value)} value={tmpVal} />
            </div>
        </div>
    }
    if (type === InputTypes.Select) {
        return <div className="input-field">
            <label htmlFor="">{props.required ? <span style={{ color: '#FF0000' }}>*</span> : ''}{label}</label>
            <select value={tmpVal} onChange={ev => setTmpVal(ev.target.value)}>
                <option disabled>{props.placeholder || 'Выберите из списка'}</option>
                {props.items?.map(opt => <option value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
    }
    if (type === InputTypes.Password) {
        return <div className="input-field">
            <label htmlFor="">{props.required ? <span style={{ color: '#FF0000' }}>*</span> : ''}{label}</label>
            <input type="password" {...props} value={tmpVal} onChange={ev => setTmpVal(ev.target.value)} />
        </div>
    }
    return <div className="input-field">
        <label htmlFor="">{props.required ? <span style={{ color: '#FF0000' }}>*</span> : ''}{label}</label>
        <input type="text" value={tmpVal} onChange={ev => setTmpVal(ev.target.value)} {...props} />
    </div>
}

export default InputField
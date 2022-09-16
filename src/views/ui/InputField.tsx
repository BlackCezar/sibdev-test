import React, { HTMLInputTypeAttribute, InputHTMLAttributes, useEffect, useLayoutEffect, useState } from "react"

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
    const [tmpVal, setTmpVal] = useState('')

    useLayoutEffect(() => {
        if (props.defaultValue) setTmpVal(props.defaultValue.toString())
    }, [props.defaultValue])

    useEffect(() => {
        change(tmpVal, name)
    }, [tmpVal])

    if (type === InputTypes.Range) {
        return <div className="input-field">
            <label htmlFor={name}>{props.required ? <span style={{ color: '#FF0000' }}>*</span> : ''}{label}</label>
            <div className="range">
                <input name={name} id={name} value={tmpVal} onChange={ev => setTmpVal(ev.target.value)} type="range" {...props} /><input onChange={ev => setTmpVal(ev.target.value)} value={tmpVal} />
            </div>
        </div>
    }
    if (type === InputTypes.Select) {
        return <div className="input-field">
            <label htmlFor={name}>{props.required ? <span style={{ color: '#FF0000' }}>*</span> : ''}{label}</label>
            <select name={name} id={name}  onChange={ev => setTmpVal(ev.target.value)}>
                <option disabled>{props.placeholder || 'Выберите из списка'}</option>
                {props.items?.map(opt => <option selected={props.defaultValue === opt.label || tmpVal === opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
    }
    if (type === InputTypes.Password) {
        return <div className="input-field">
            <label htmlFor={name}>{props.required ? <span style={{ color: '#FF0000' }}>*</span> : ''}{label}</label>
            <input name={name} id={name} type="password" {...props} value={tmpVal} onChange={ev => setTmpVal(ev.target.value)} />
        </div>
    }
    return <div className="input-field">
        <label htmlFor={name}>{props.required ? <span style={{ color: '#FF0000' }}>*</span> : ''}{label}</label>
        <input name={name} id={name} type="text" value={tmpVal} onChange={ev => setTmpVal(ev.target.value)} {...props} />
    </div>
}

export default InputField
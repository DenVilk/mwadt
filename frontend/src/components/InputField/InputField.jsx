import './InputField.css'

const InputField = (props) => {
    return (
        <>
            <div className="input-block">
                {props?.label && <label htmlFor={props.name}>{props.label}</label>}
                <input {...props} className="input-field"></input>
            </div>
        </>
    )
}

export default InputField;
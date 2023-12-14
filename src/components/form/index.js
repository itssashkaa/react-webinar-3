import {cn as bem} from "@bem-react/classname"
import PropTypes from "prop-types";
import FormInput from "../form-input";
import { memo } from "react";
import "./style.css"

function Form (props) {
    const cn = bem('Form')
    return (
        <div className={cn()}>
            <div className={cn('title')}>{props.title}</div>
            <form className={cn('fields')} onSubmit={props.onSubmit}>
                {props.fields.map((field, index) => (
                    <FormInput {...field} key={index}/>
                ))}
                {props.error && <div className={cn('error')}>{props.error}</div>}
                <button>{props.buttonTitle}</button>
            </form>  
        </div>
    )
}

Form.propTypes = {
    title: PropTypes.string,
    fields: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        onChange: PropTypes.func,
        type: PropTypes.string,
        placeholder: PropTypes.string,
        title: PropTypes.string
    })).isRequired,
    buttonTitle: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
}

Form.defaultProps = {
    error: ''
}



export default memo(Form);

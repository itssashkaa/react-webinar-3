import PropTypes from "prop-types";
import { memo } from "react";
import {cn as bem} from "@bem-react/classname"
import "./style.css"

function FormInput(props) {
    const cn = bem("FormInput");

  return (
    <div className={cn()}>
        <div className={cn('title')}>{props.title}</div>
        <input
            className={cn('input')}
            value={props.value}
            onChange={props.onChange}
            type={props.type}
            placeholder={props.placeholder}
            required={props.required}
        />
    </div>
  );
}

FormInput.PropTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  required: PropTypes.bool
};

FormInput.defaultProps = {
  type: "text",
  placeholder: "",
  title: "",
  required: false
};

export default memo(FormInput);

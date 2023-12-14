import PropTypes from "prop-types";

function Button (props) {
    return (
        <button onClick={props.action}>{props.title}</button>
    )
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
}

export default memo(props)
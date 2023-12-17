import PropTypes from "prop-types"
import useSelector from "../../hooks/use-selector"
import { Navigate } from "react-router";
import { memo } from "react";
import Spinner from "../../components/spinner";

function ProtectedRoute (props) {   
    if(props.wait) {
        return (
            <Spinner active={true}>{props.children}</Spinner>
        )
    }
    if (!props.isAllowed) {
        return (
            <Navigate to={props.redirectPath} replace />
        )
    }

    return props.children
}

ProtectedRoute.propTypes = {
    redirectPath: PropTypes.string,
    children: PropTypes.node.isRequired,
    isAllowed: PropTypes.bool.isRequired,
    wait: PropTypes.bool.isRequired
}

ProtectedRoute.defaultProps = {
    redirectPath: '/login',
}

export default memo(ProtectedRoute)
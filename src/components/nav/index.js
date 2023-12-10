import PropTypes from "prop-types";
import './style.css'

function Nav ({children}) {
    return (
        <div className="nav">
            {children}
        </div>
    )
}

Nav.propTypes = {
    children: PropTypes.node
};

export default Nav;

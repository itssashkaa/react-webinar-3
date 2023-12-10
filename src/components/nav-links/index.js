import './style.css'
import PropTypes from "prop-types";

function NavLinks ({children}) {
    return (
        <div className="NavLinks">
            {children}
        </div>
    )
}

NavLinks.propTypes = {
    children: PropTypes.node
};

export default NavLinks;

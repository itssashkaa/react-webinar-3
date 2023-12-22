import { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './style.css'

function CommentNotLogin ({isReply, closeReply, onSignIn}) {
    return (
        <div className="CommentNotLogin">
        {isReply
            ? <div className="CommentNotLogin-text"><div className="CommentNotLogin-link" onClick={onSignIn}>Войдите,</div> <div>чтобы иметь возможность ответить.</div> <div className="CommentNotLogin-btn" onClick={closeReply}>Отмена</div></div>
            : <div className="CommentNotLogin-text"><div className="CommentNotLogin-link" onClick={onSignIn}>Войдите,</div> <div>чтобы иметь возможность комментировать</div></div>
        }
        </div>
    )
}

CommentNotLogin.propTypes = {
    isReply: PropTypes.bool,
    closeReply: PropTypes.func,
    onSignIn: PropTypes.func
}

CommentNotLogin.defaultProps = {
    isReply: false,
    closeReply: () => {},
    onSignIn: () => {}
}

export default memo(CommentNotLogin)
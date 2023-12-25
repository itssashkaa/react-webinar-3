import { memo, useState } from "react"
import {cn as bem} from '@bem-react/classname'
import './style.css'
import PropTypes from 'prop-types';

function CommentForm (props) {
    const cn = bem('CommentForm')
    const [commentText, setCommentText] = useState("");
    const handleSend = () => {
        props.callback(commentText, props.parentId, props.type);
        setCommentText('');
    }
    return (
        <div className={cn()}>
            <div className={cn('header')}>{props.isReply ? 'Новый ответ' : 'Новый комментарий'}</div>
            <textarea className={cn('textarea')} onChange={(e) => setCommentText(e.target.value)} value={commentText}></textarea>
            <div className={cn('controls')}>
                <button onClick={handleSend}>Отправить</button>
                {props.isReply && <button onClick={props.closeReply}>Отмена</button>}
            </div>
        </div>
    )
}

CommentForm.propTypes = {
    callback: PropTypes.func,
    isReply: PropTypes.bool,
    closeReply: PropTypes.func,
    parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired
};

CommentForm.defaultProps = {
    callback: () => {},
    isReply: false,
    closeReply: () => {},
}

export default memo(CommentForm)
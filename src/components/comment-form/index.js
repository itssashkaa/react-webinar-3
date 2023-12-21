import { memo } from "react"
import {cn as bem} from '@bem-react/classname'
import './style.css'
import PropTypes from 'prop-types';

function CommentForm ({callback, commentText, setCommentText, isReply, closeReply, parentId, type}) {
    const cn = bem('CommentForm')

    return (
        <div className={cn()}>
            <div className={cn('header')}>{isReply ? 'Новый комментарий' : 'Новый ответ'}</div>
            <textarea className={cn('textarea')} onChange={setCommentText} value={commentText}></textarea>
            <div className={cn('controls')}>
                <button onClick={() => callback(commentText, parentId, type)}>Отправить</button>
                {isReply && <button onClick={closeReply}>Отмена</button>}
            </div>
        </div>
    )
}

CommentForm.propTypes = {
    callback: PropTypes.func,
    commentText: PropTypes.string,
    setCommentText: PropTypes.func,
    isReply: PropTypes.bool,
    closeReply: PropTypes.func,
    parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string.isRequired
};

CommentForm.defaultProps = {
    callback: () => {},
    commentText: '',
    setCommentText: () => {},
    isReply: false,
    closeReply: () => {},
    parentId: ''
}

export default memo(CommentForm)
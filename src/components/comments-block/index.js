import {cn as bem} from "@bem-react/classname"
import PropTypes from "prop-types";
import CommentsList from "../comments-list";
import "./style.css"
import { memo } from "react";
import CommentForm from "../comment-form";
import CommentNotLogin from "../comment-not-login";

function CommentsBlock (props) {
    const cn = bem('CommentsBlock');

    return (
        <div className={cn()}>
            <div className={cn("header")}>Комментарии ({props.count})</div>
            <CommentsList
                comments={props.comments}
                addComment={props.addComment}
                selectedComment={props.selectedComment}
                setSelectedComment={props.setSelectedComment}
                parentId={props.parentId}
                closeReply={props.closeReply}
                isAuth={props.isAuth}
                onSignIn={props.onSignIn}
                currentUserId={props.currentUserId}
            />
            {props.selectedComment == props.parentId && (
                props.isAuth 
                ? <CommentForm
                callback={props.addComment}
                commentText={props.commentText}
                setCommentText={props.setCommentText}
                type={'article'}
                parentId={props.parentId}
                />
                : <CommentNotLogin onSignIn={props.onSignIn}/>   
            )}
        </div>
    )
}

CommentsList.propTypes = {
    comments: PropTypes.array,
    count: PropTypes.number,
    addComment: PropTypes.func,
    selectedComment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setSelectedComment: PropTypes.func,
    parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    closeReply: PropTypes.func,
    isAuth: PropTypes.bool,
    onSignIn: PropTypes.func,
    currentUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
  
CommentsList.defaultProps = {
    comments: [],
    count: 0,
    addComment: () => {},
    closeReply: () => {},
    isAuth: false,
    onSignIn: () => {},
    currentUserId: '',
};

export default memo(CommentsBlock)
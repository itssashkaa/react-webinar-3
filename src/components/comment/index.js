import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";
import { memo } from "react";
import CommentsList from "../comments-list";
import dateFormat from "../../utils/date-format";
import CommentForm from "../comment-form";
import CommentNotLogin from "../comment-not-login";

function Comment(props) {
  const cn = bem("Comment");
  const dateCreate = props.comment.dateCreate ? dateFormat(props.comment.dateCreate) : ""
  return (
    <div
      className={cn()}
    >
      <div className={cn("header")}>
        <div className={cn('userName', { current: props.currentUserId == props.comment.author._id })}>
          {props.comment.author?.profile.name}
        </div>
        <div className={cn("date")}>{dateCreate}</div>
      </div>
      <div className={cn("body")}>{props.comment.text}</div>
      <div
        className={cn("addBtn")}
        onClick={() => props.setSelectedComment(props.comment._id)}
      >
        Ответить
      </div>
      {!!props.comment.children?.length && (
        <div className={cn("replyes")}>
          <CommentsList 
            comments={props.comment.children}
            addComment={props.addComment}
            setSelectedComment={props.setSelectedComment}
            parentId={props.comment._id}
            closeReply={props.closeReply}
            isAuth={props.isAuth}
            onSignIn={props.onSignIn}
            currentUserId={props.currentUserId}
            isReplyes={true}
            selectedComment={props.selectedComment}
          />
        </div>       
      )}
      {props.selectedComment == props.comment._id && (
        props.isAuth ?
        <CommentForm
          callback={props.addComment}
          commentText={props.commentText}
          setCommentText={props.setCommentText}
          parentId={props.comment._id}
          type={'comment'}
          isReply={true}
          closeReply={props.closeReply}
        />
        :
        <CommentNotLogin isReply={true} closeReply={props.closeReply} onSignIn={props.onSingIn}/>
      )}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    parent: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      type: PropTypes.string,
    }),
    level: PropTypes.number,
  }),
  setSelectedComment: PropTypes.func.isRequired,
  addComment: PropTypes.func,
  closeReply: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
  onSignIn: PropTypes.func,
  currentUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  replyes: PropTypes.array,
  selectedComment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Comment.defaultProps = {
  addComment: () => {},
  isAuth: false,
  onSignIn: () => {},
  isCurrentUser: false,
  replyes: []
};

export default memo(Comment);

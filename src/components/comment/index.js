import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";
import { memo } from "react";
import CommentForm from "../comment-form";

function Comment(props) {
  const cn = bem("Comment");

  return (
    <div
      className={cn()}
      style={{ paddingLeft: props.comment.level * 30 + "px" }}
    >
      <div className={cn("header")}>
        <div className={cn("userName")}>
          {props.comment.author?.profile.name}
        </div>
        <div className={cn("date")}>{props.comment.dateCreate}</div>
      </div>
      <div className={cn("body")}>{props.comment.text}</div>
      <div
        className={cn("addBtn")}
        onClick={() => props.setSelectedComment(props.comment._id)}
      >
        Ответить
      </div>
      {props.isSelected && (
        <CommentForm
          callback={props.addComment}
          commentText={props.commentText}
          setCommentText={props.setCommentText}
          parentId={props.parentId}
          type={'comment'}
          isReply={true}
          closeReply={props.closeReply}
        />
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
  isSelected: PropTypes.bool.isRequired,
  addComment: PropTypes.func,
  commentText: PropTypes.string,
  setCommentText: PropTypes.func,
  closeReply: PropTypes.func.isRequired
};

Comment.defaultProps = {
  addComment: () => {},
  commentText: '',
  setCommentText: () => {},
};

export default memo(Comment);

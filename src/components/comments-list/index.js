import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { memo, useState } from "react";
import Comment from "../comment";
import CommentForm from "../comment-form";

function CommentsList(props) {
  const cn = bem("CommentsList");
  

  return (
    <div className={cn()}>
      <div className={cn("header")}>Комментарии ({props.count})</div>
      <div className={cn("body")}>
        {props.comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            addComment={props.addComment}
            isSelected={props.selectedComment === comment._id}
            commentText={props.commentText}
            setCommentText={props.setCommentText}
            setSelectedComment={props.setSelectedComment}
            closeReply={props.closeReply}
          />
        ))}
      </div>
      {props.selectedComment == props.parentId && (
        <CommentForm
          callback={props.addComment}
          commentText={props.commentText}
          setCommentText={props.setCommentText}
          type={'article'}
          parentId={props.parentId}
        />
      )}
    </div>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.array,
  count: PropTypes.number,
  addComment: PropTypes.func,
  selectedComment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setSelectedComment: PropTypes.func,
  commentText: PropTypes.string,
  setCommentText: PropTypes.func,
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  closeReply: PropTypes.func
};

CommentsList.defaultProps = {
  comments: [],
  count: 0,
  addComment: () => {},
  commentText: '',
  setCommentText: () => {},
  closeReply: () => {}
};

export default memo(CommentsList);

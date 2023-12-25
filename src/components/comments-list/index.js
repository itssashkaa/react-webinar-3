import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { memo } from "react";
import Comment from "../comment";

function CommentsList(props) {
  const cn = bem("CommentsList");

  return (
    <div className={cn()}>
      <div className={cn("body")}>
        {props.comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            addComment={props.addComment}
            setSelectedComment={props.setSelectedComment}
            closeReply={props.closeReply}
            isAuth={props.isAuth}
            onSignIn={props.onSignIn}
            currentUserId={props.currentUserId}
            selectedComment={props.selectedComment}
            level={props.level}
          />
        ))}
      </div>
    </div>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.array,
  addComment: PropTypes.func,
  selectedComment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setSelectedComment: PropTypes.func,
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  closeReply: PropTypes.func,
  isAuth: PropTypes.bool,
  onSignIn: PropTypes.func,
  currentUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  level: PropTypes.number
};

CommentsList.defaultProps = {
  comments: [],
  addComment: () => {},
  closeReply: () => {},
  isAuth: false,
  onSignIn: () => {},
  currentUserId: '',
  level: 0
};

export default memo(CommentsList);

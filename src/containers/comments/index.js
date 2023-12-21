import { memo, useCallback, useMemo, useState } from "react";
import CommentsList from "../../components/comments-list";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import Spinner from "../../components/spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import commentsActions from "../../store-redux/comments/actions";
import useInit from "../../hooks/use-init";
import shallowEqual from "shallowequal";
import CommentForm from "../../components/comment-form";
import dateFormat from "../../utils/date-format";
import useSelectorCustom from '../../hooks/use-selector';

function Comments() {
  const params = useParams();
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [selectedComment, setSelectedComment] = useState(params.id);

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);
  const user = useSelectorCustom(state  => state.session.user,)
  const select = useSelector(
    (state) => ({
      waiting: state.comments.waiting,
      comments: state.comments.data.items,
      count: state.comments.data.count,
    }),
    shallowEqual
  );

  const sortedComments = useMemo(() => {
    return treeToList(listToTree(select.comments), (comment, level) => ({
      ...comment,
      level: level - 1,
      dateCreate: comment.dateCreate ? dateFormat(comment.dateCreate) : "",
    })).slice(1);
  }, [select.comments]);

  const callbacks = {
    // Добавление в корзину
    addComment: useCallback((text, parentId, type) => {
      console.log('text', text);
      console.log('id', parentId);
      console.log('type', type);
      dispatch(commentsActions.postComment(text, parentId, type, user.profile?.name));
    }, [user]),
    closeReply: useCallback(() => {
      setSelectedComment(params.id);
    }, [params]),
  };

  return (
    <Spinner active={select.waiting}>
      <CommentsList
        comments={sortedComments}
        count={select.count}
        addComment={callbacks.addComment}
        commentText={commentText}
        setCommentText={(e) => setCommentText(e.target.value)}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        parentId={params.id}
        closeReply={callbacks.closeReply}
      />
    </Spinner>
  );
}

export default memo(Comments);

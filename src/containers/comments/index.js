import { memo, useCallback, useMemo, useState } from "react";
import listToTree from "../../utils/list-to-tree";
import Spinner from "../../components/spinner";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import commentsActions from "../../store-redux/comments/actions";
import useInit from "../../hooks/use-init";
import shallowEqual from "shallowequal";
import useSelectorCustom from '../../hooks/use-selector';
import CommentsBlock from "../../components/comments-block";

function Comments() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedComment, setSelectedComment] = useState(params.id);
  const location = useLocation();

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);
  const selectCustom = useSelectorCustom(state => ({
    user: state.session.user,
    exists: state.session.exists,
  }));
  const select = useSelector(
    (state) => ({
      waiting: state.comments.waiting,
      comments: state.comments.data.items,
      count: state.comments.data.count,
    }),
    shallowEqual
  );
  console.log(listToTree(select.comments));

  const commentsTree = useMemo(() => {
    // return treeToList(listToTree(select.comments), (comment, level) => ({
    //   ...comment,
    //   level: level - 1,
    //   dateCreate: comment.dateCreate ? dateFormat(comment.dateCreate) : "",
    // })).slice(1);
    return listToTree(select.comments)[0]?.children;
  }, [select.comments]);

  const callbacks = {
    // Добавление в корзину
    addComment: useCallback((text, parentId, type) => {
      if(text.trim().length > 0) {
        dispatch(commentsActions.postComment(text, parentId, type, selectCustom.user.profile?.name));
        callbacks.closeReply();
      }
    }, [selectCustom.user]),
    closeReply: useCallback(() => {
      setSelectedComment(params.id);
    }, [params]),
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  };

  return (
    <Spinner active={select.waiting}>
      <CommentsBlock
        comments={commentsTree}
        count={select.count}
        addComment={callbacks.addComment}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        parentId={params.id}
        closeReply={callbacks.closeReply}
        isAuth={selectCustom.exists}
        onSignIn={callbacks.onSignIn}
        currentUserId={selectCustom.user._id}
      />
    </Spinner>
  );
}

export default memo(Comments);

export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Товар загружен успешно
        console.log(res);
        dispatch({
          type: "comments/load-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/load-error" });
      }
    };
  },
  postComment: (text, parentId, type, user) => {
    console.log(user);
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load-start" });
      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: "POST",
          headers: {
            "X-Token":
              "ed9b341d85860b91420b216594a433c1e3d564cd7246e714ee02b3ec395a6ce5",
          },
          body: JSON.stringify({
            text: text,
            parent: {
              _id: parentId,
              _type: type,
            },
          }),
        });
        dispatch({
          type: "comments/post-success",
          payload: {
            data: {
              ...res.data.result,
              author: {
                profile: { name: user },
                _id: res.data.result.author.id,
              },
            },
          },
        });
      } catch (error) {
        dispatch({
          type: "comments/load-error",
          payload: { error: error.message },
        });
      }
    };
  },
};

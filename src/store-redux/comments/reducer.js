export const initialState = {
    data: {
      items: [],
      count: 0
    },
    waiting: false // признак ожидания загрузки
  }
  
  // Обработчик действий
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "comments/load-start":
        return {...state, waiting: true};
  
      case "comments/load-success":
        return {...state, data: action.payload.data, waiting: false};

      case "comments/post-success":
        return {
            ...state, 
            data: {
                ...state.data,
                items: [...state.data.items, action.payload.data],
                count: state.data.count + 1
            }, 
            waiting: false};
  
      case "comments/load-error":
        return {...state, data: {}, waiting: false, error: action.payload.error}; //@todo текст ошибки сохранять?
  
      default:
        // Нет изменений
        return state;
    }
  }
  
  export default reducer;
const initialData = {
    list: [],
  };
  
  const todoReducers = (state = initialData, action) => {
    switch (action.type) {
      case "ADD_TODO":
        const { id, data } = action.payload;
        return {
          ...state,
          list: [
            ...state.list,
            {
              id: id,
              data: data,
            },
          ],
        };
      case "DELETE_TODO":
        const newList = state.list.filter((ele) => ele.id !== action.id);
        return {
          ...state,
          list: newList,
        };
      case "REMOVE_TODO":
        return {
          ...state,
          list: [],
        };
      case "EDIT_TODO":
        const updatedList = state.list.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              data: action.payload.data,
            };
          }
          return item;
        });
        return {
          ...state,
          list: updatedList,
        };
      default:
        return state;
    }
  };
  
  export default todoReducers;
  
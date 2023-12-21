// reducers.js
const cartReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const existingBook = state.find((item) => item.id === action.payload.id);
  
        if (existingBook) {
          return state.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...state, { ...action.payload, quantity: 1 }];
        }
      default:
        return state;
    }
  };
  
  export default cartReducer;
  
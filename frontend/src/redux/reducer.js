const initialState = {
  diplomas: [],
};

// export function rootReducer(state = initialState, { type, payload }) {
export function rootReducer(state = initialState, { type }) {
  switch (type) {
    case 'bro':
      return { ...state };

    default:
      return state;
  }
}

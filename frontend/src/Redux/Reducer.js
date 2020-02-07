let reducer = (state, action) => {
  if (action.type === "LOGGED_IN") {
    return { ...state, loggedIn: action.loggedIn, user: action.user };
  }

  if (action.type === "LOGOUT") {
    return { ...state, loggedIn: false, user: {} };
  }

  if (action.type === "CURRENT_PATH") {
    return { ...state, currentPath: action.path };
  }

  return state;
};

export default reducer;

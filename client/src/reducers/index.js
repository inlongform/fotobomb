import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import errorsReducer from "./errorsReducer";
import authReducer from "./authReducer";
import postReducer from "./postReducer";

export default combineReducers({
  users: usersReducer,
  errors: errorsReducer,
  auth: authReducer,
  post: postReducer
});

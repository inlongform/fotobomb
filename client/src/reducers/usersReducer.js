import { GET_USERS, SHOW_UPLOAD_PANEL } from "../actions/types";

const initialState = {
  users: {},
  showUploadPanel: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS: {
      console.log("got here", action.payload);
      return {
        ...state,
        users: action.payload
      };
    }
    case SHOW_UPLOAD_PANEL: {
      return {
        ...state,
        showUploadPanel: action.payload
      };
    }
    default:
      return state;
  }
}

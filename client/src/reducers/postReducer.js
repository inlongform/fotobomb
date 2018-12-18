import {
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST_BY_ID,
  UPLOADING,
  LOADING_COMPLETE
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false,
  uploading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOADING: {
      return {
        ...state,
        uploading: action.payload
      };
    }

    case POST_LOADING: {
      return {
        ...state,
        loading: true
      };
    }

    case LOADING_COMPLETE: {
      console.log("loading complete");
      return {
        ...state,
        loading: false
      };
    }
    case GET_POSTS: {
      let { items } = action.payload;

      const prevItems = state.posts.items;
      //this needs to be thought out a little better
      if (prevItems && prevItems.length > 0) {
        items = [...state.posts.items, ...action.payload.items];
      }

      return {
        ...state,
        posts: {
          count: action.payload.count,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          items: action.payload.items
        },

        loading: false
      };
    }
    case GET_POST_BY_ID: {
      console.log(action.payload);
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    }

    case ADD_POST: {
      console.log(action.payload);
      return {
        ...state,
        post: action.payload
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    }
    default:
      return state;
  }
};

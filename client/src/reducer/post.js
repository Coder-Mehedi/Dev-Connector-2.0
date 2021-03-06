import {
  GET_ALL_POSTS,
  GET_POST_BY_USERNAME,
  POST_ERROR,
  CLEARE_POSTS,
  CLEARE_USER_POST,
  CREATE_POST,
  DELETE_POST,
  CURRENT_POST,
  EDIT_POST,
  LIKE,
  COMMENTS,
  DELETE_COMMENT,
  REPLAY,
  DELETE_REPLAY,
  SINGLE_POST,
} from "../action/Type";

const initialState = {
  posts: [],
  userPosts: [],
  post: null,
  loading: true,
  current: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_POSTS:
    case DELETE_POST:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST_BY_USERNAME:
      return {
        ...state,
        userPosts: payload,
        loading: false,
      };
    case SINGLE_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        userPosts: [payload, ...state.userPosts],
      };
    case CURRENT_POST:
      return {
        ...state,
        current: payload,
      };
    case EDIT_POST:
      return {
        ...state,
        posts: payload,
        current: null,
        post: payload.find((p) => p._id === state.post._id && p),
      };
    case COMMENTS:
    case DELETE_COMMENT:
    case REPLAY:
    case DELETE_REPLAY:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? payload.comments : post
        ),
        userPosts: state.userPosts.map((post) =>
          post._id === payload.postId ? payload.comments : post
        ),
        post:
          state.post && state.post._id === payload.postId
            ? payload.comments
            : state.post,
      };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? payload.likes : post
        ),
        userPosts: state.userPosts.map((post) =>
          post._id === payload.postId ? payload.likes : post
        ),
        post:
          state.post && state.post._id === payload.postId
            ? payload.likes
            : state.post,
      };
    case CLEARE_POSTS:
      return {
        ...state,
        posts: [],
      };
    case CLEARE_USER_POST:
      return {
        ...state,
        userPosts: [],
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

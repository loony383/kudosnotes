import { ADD_DOCUMENT, EDIT_DOCUMENT, DELETE_DOCUMENT } from "../actions";

import uuidv4 from "uuid/v4";

const initialState = {
  documents: {}
};

export default function documentsReducer(state, action) {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    case ADD_DOCUMENT:
      return {
        ...state,
        documents: {
          ...state.documents,
          [uuidv4()]: { title: action.title, content: action.content }
        }
      };
    case EDIT_DOCUMENT:
      return {
        ...state,
        documents: {
          ...state.documents,
          [action.id]: { title: action.title, content: action.content }
        }
      };
    case DELETE_DOCUMENT:
      return {
        ...state,
        documents: state.documents.filter(id => id !== action.id)
      };
    default:
      return state;
  }
}

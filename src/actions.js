export const ADD_DOCUMENT = "ADD_DOCUMENT";
export const DELETE_DOCUMENT = "DELETE_DOCUMENT";
export const EDIT_DOCUMENT = "EDIT_DOCUMENT";

export function addDocument(title, content) {
  return {
    type: ADD_DOCUMENT,
    title: title,
    content: content
  };
}

export function deleteDocument(title, id) {
  return {
    type: DELETE_DOCUMENT,
    id: id
  };
}

export function editDocument(id, title, content) {
  return {
    type: ADD_DOCUMENT,
    id: id,
    title: title,
    content: content
  };
}

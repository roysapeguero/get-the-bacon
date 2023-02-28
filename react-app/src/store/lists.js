const GET_LISTS = "lists/GET_LISTS";
const GET_LIST = "lists/GET_LIST";
const CREATE_LIST = "lists/CREATE_LIST";
const EDIT_LIST = "lists/EDIT_LIST";
const DELETE_LIST = "lists/DELETE_TASK";

const loadLists = (lists) => {
  return {
    type: GET_LISTS,
    payload: lists
  }
};

const loadList = (list) => {
  return {
    type: GET_LIST,
    payload: list
  }
};

const createList = (list) => {
  return {
    type: CREATE_LIST,
    payload: list,
  }
};


const editList = (list) => {
  return {
    type: EDIT_LIST,
    payload: list
  };
};

const deleteList = (listId) => {
  return {
    type: DELETE_LIST,
    payload: listId
  }
};


// Get lists
export const getListsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/lists`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadLists(data));
  }
};

// Get list
export const getListThunk = (listId) => async (dispatch) => {
  const res = await fetch(`/api/lists/${listId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadList(data));
  }
};

// Edit
export const editListThunk = (list, listId) => async (dispatch) => {
  console.log('hello', list, listId)
  const res = await fetch(`/api/lists/${listId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editList(data));
    return data
  }
};

// Create list
export const createListThunk = (list) => async (dispatch) => {
  const res = await fetch("/api/lists/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(list),
  });

  if (res.ok) {

    const list = await res.json();
    dispatch(createList(list));
    return list
  }
};


// Delete list
export const deleteListThunk = (listId) => async (dispatch) => {
  const res = await fetch(`/api/lists/${listId}`, {
    method: "DELETE"
  });

  if (res.ok) {
    const data = await res.json()
    dispatch(deleteList(listId));
    return data
  }
};

const initialState = { allLists: {}, singleList: {}}

const listsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_LISTS:
      newState = {...state}
      action.payload.forEach(list => {
        newState.allLists[list.id] = list
      })
      return newState
    case GET_LIST:
      newState = {...state, singleList: { ...state.singleList, ...action.payload }}
      return newState
      case EDIT_LIST:
        newState = {
          ...state,
          allLists: {
            ...state.allLists,
            [action.payload.id]: {
              ...state.allLists[action.payload.id],
              ...action.payload,
            },
          },
          singleList: {
            ...state.singleList,
            ...action.payload,
          },
        };
        newState.allLists[action.payload.id] = action.payload

        return newState;
    case CREATE_LIST:
      newState = {...state, allLists: {...state.allLists}}
      newState.allLists[action.payload.id] = action.payload
      return newState
    case DELETE_LIST:
      newState = { ...state }
      newState.allLists = { ...state.allLists };
      delete newState.allLists[action.payload]
      return newState
    default:
      return state
  }
}

export default listsReducer;

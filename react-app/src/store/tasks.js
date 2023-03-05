const GET_TASKS = "tasks/GET_TASKS";
const GET_TASK = "tasks/GET_TASK";
const CREATE_TASK = "tasks/CREATE_TASK";
const EDIT_TASK = "tasks/EDIT_TASK";
const DELETE_TASK = "tasks/DELETE_TASK";

const loadTasks = (tasks) => {
  return {
    type: GET_TASKS,
    payload: tasks
  }
};

const loadTask = (task) => {
  return {
    type: GET_TASK,
    payload: task
  }
};

const createTask = (task) => {
  return {
    type: CREATE_TASK,
    payload: task,
  }
};


const editTask = (task) => {
  return {
    type: EDIT_TASK,
    payload: task
  };
};

const deleteTask = (taskId) => {
  return {
    type: DELETE_TASK,
    payload: taskId
  }
};


// Get Tasks
export const getTasksThunk = () => async (dispatch) => {
  const res = await fetch(`/api/tasks`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadTasks(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

// Get task
export const getTaskThunk = (taskId) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${taskId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadTask(data));
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};

// Edit
export const editTaskThunk = (task, taskId) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (res.ok) {
    const task = await res.json();
    dispatch(editTask(task));
  } else {
    const data = await res.json();
    if (data.errors) return data;
  }
};

// Create Task
export const createTaskThunk = (task) => async (dispatch) => {
  const res = await fetch("/api/tasks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task),
  });

  if (res.ok) {
    const task = await res.json();
    dispatch(createTask(task));
  } else {
    const data = await res.json();
    if (data.errors) return data;
  }
};


// Delete Task
export const deleteTaskThunk = (taskId) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE"
  });

  if (res.ok) {
    const data = await res.json()
    dispatch(deleteTask(taskId));
    return data
  } else {
    const data = await res.json();
    if (data.errors) return data;
  }
};

const initialState = { allTasks: {}, singleTask: {}}

const tasksReducer = (state = initialState, action) => {
  // let newState = { allTasks: { ...state.allTasks }, singleTask: {...state.singleTask} }
  let newState = { ...state}
  switch (action.type) {
    case GET_TASKS:
      newState = {...state}
      newState.allTasks = action.payload
      return newState

    case GET_TASK:
      return { ...state, singleTask: action.payload }

    case EDIT_TASK:
      newState.allTasks = {...newState.allTasks, [action.payload.id]: {...state.allTasks[action.payload.id], ...action.payload}}
      newState.singleTask = {...newState.singleTask, ...action.payload}
      return newState

    case CREATE_TASK:
      newState.allTasks = { [action.payload.id]: action.payload}
      return newState

    case DELETE_TASK:
      newState.singleTask = {}
      delete newState.allTasks[action.payload]
      return newState

    default:
      return state
  }
}

export default tasksReducer;

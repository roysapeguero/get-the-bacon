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
  }
};

// Get task
export const getTaskThunk = (taskId) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${taskId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadTask(data));
  }
};

// Edit
export const editTaskThunk = (task, taskId) => async (dispatch) => {
  console.log('hello', task, taskId)
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editTask(data));
    return data
  }
};

// Create Task
export const createTaskThunk = (task) => async (dispatch) => {
  console.log('task at thunk ', task)
  const res = await fetch("/api/tasks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task),
  });
  console.log('res at thunk ', res)

  if (res.ok) {
    console.log('res ok ', res)

    const task = await res.json();
    dispatch(createTask(task));
    console.log('task create', task)
    return task
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
  }
};

const initialState = { allTasks: {}, singleTask: {}}

const tasksReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_TASKS:
      newState = {...state}
      action.payload.forEach(task => {
        newState.allTasks[task.id] = task
      })
      return newState
    case GET_TASK:
      newState = {...state, singleTask: {...state.singleTask, ...action.payload}}
      return newState

    case EDIT_TASK:
      newState = {
        ...state,
        allTasks: {
          ...state.allTasks, [action.payload.id]: {
            ...state.allTasks[action.payload.id],
            ...action.payload
          },
        },
        singleTask: {...state.group}
      }
    case CREATE_TASK:
      newState = {...state, allTasks: {...state.allTasks}}
      newState.allTasks[action.payload.id] = action.payload
      console.log(action.payload)
      console.log(newState)
      return newState
    case DELETE_TASK:
      newState = { ...state, allTasks: {...state.allTasks} }
      delete newState.allTasks[action.payload]
      return newState
    default:
      return state
  }
}

export default tasksReducer;

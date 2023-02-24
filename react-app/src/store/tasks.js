const GET_TASKS = "tasks/GET_TASKS";
const GET_TASK = "tasks/GET_TASK";
const CREATE_TASK = "tasks/CREATE_TASK";
const EDIT_TASK = "tasks/EDIT_TASK";
const DELETE_TASK = "tasks/DELETE_TASK";

export const loadTasks = (tasks) => ({
  type: GET_TASKS,
  tasks,
});

const loadTask = (task) => ({
  type: GET_TASK,
  task,
  });

const createTask = (task) => ({
  type: CREATE_TASK,
  task,
});


const editTask = (task) => {
  return {
    type: EDIT_TASK,
    task
  };
};

const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  taskId,
});


// Get Tasks
export const getTasksThunk = () => async (dispatch) => {
  const res = await fetch(`/api/tasks`);

  if (res.ok) {
    const data = await res.json();
    // console.log('data', data)
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
    const task = await res.json();
    dispatch(loadTask(task));
  } else {
    const data = await res.json();
    if (data.errors) return res
  }
};

// Edit
export const editTaskThunk = (taskId, taskData) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  if (res.ok) {
    const task = await res.json();
    dispatch(editTask(task));
    // dispatch(getTaskThunk(task.id));
  } else {
    const data = await res.json();
    if (data.errors) {
      return res;
    }
  }
};

// Create Task
export const createTaskThunk = (task) => async (dispatch) => {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (res.ok) {
    const createdTask = await res.json();
    dispatch(createTask(createdTask));
    return createdTask;
  } else {
    const data = await res.json();
    if (data.errors) return res;
  }
};


// Delete Task
export const deleteTaskThunk = (taskId) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteTask(taskId));
  }
};

const initialState = { allTasks: {}, singleTask: {}}

const tasksReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_TASKS:
      newState = { ...state };
      newState.allTasks = action.tasks;
      return newState;
    case GET_TASK:
      return { ...state, singleTask: action.task };
    case CREATE_TASK:
      newState.allTasks = {...state.allTasks, [action.task.id]: action.task}
      return newState
    case EDIT_TASK:
      newState.allTasks = { ...newState.allTasks };
      newState.allTasks[action.task.id] = {
        ...state.allTasks[action.task.id],
        ...action.task,
      };
      newState.singleTask = { ...state.singleTask, ...action.task };
      return newState;

    case DELETE_TASK:
      newState.allTasks = { ...state.allTasks }
      delete newState.allTasks[action.taskId]
      return newState
    default:
      return state
  }
}

export default tasksReducer;

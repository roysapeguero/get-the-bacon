const GET_TASKS = "tasks/GET_TASKS";
const GET_TASK = "tasks/GET_TASK";
const CREATE_TASK = "tasks/CREATE_TASK";
const EDIT_TASK = "tasks/EDIT_TASK";
const DELETE_TASK = "tasks/DELETE_TASK";

const loadTasks = (tasks) => ({
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

const editTask = (task) => ({
  type: EDIT_TASK,
  task,
});

const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  taskId,
});


// Get Tasks
export const getTasksThunk = () => async (dispatch) => {
  const res = await fetch(`/api/tasks`);

  if (res.ok) {
    const tasks = await res.json();
    dispatch(loadTasks(tasks));
    return tasks;
  } else {
    return res;
  }
};

// Get task
export const getTaskThunk = (taskId) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${taskId}`);

  if (res.ok) {
    const task = await res.json();
    dispatch(loadTask(task));
    return task;
  } else {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  }
};

// Create Task
export const createTaskThunk = (data) => async (dispatch) => {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  });

  if (res.ok) {
    const createdTask = await res.json();
    dispatch(createTask(createdTask));
    return createdTask;
  } else {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  }
};

// Edit Task
export const editTaskThunk = (task) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (res.ok) {
    const editedTask = await res.json();
    dispatch(editTask(editedTask));
  }
};

// Delete Task
export const deleteTaskThunk = (taskId) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const deletedTask = await res.json();
    dispatch(deleteTask(taskId));
    return deletedTask;
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
      newState = { singleTask: { ...state.singleTask, ...action.task }}
      return newState
    case CREATE_TASK:
      newState.allTasks = {...state.allTasks, [action.task.id]: action.task}
      return newState
    case EDIT_TASK:
      return {...state, singleTask: action.task}
    case DELETE_TASK:
      newState.allTasks = { ...state.allTasks }
      delete newState.allTasks[action.taskId]
      return newState
    default:
      return state
  }
}

export default tasksReducer;

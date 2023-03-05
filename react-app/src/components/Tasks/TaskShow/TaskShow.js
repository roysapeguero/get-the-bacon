import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskThunk,
  editTaskThunk,
  getTaskThunk,
  getTasksThunk,
} from "../../../store/tasks";
import { useModal } from "../../../context/Modal";
// import { useHistory } from "react-router-dom";
import "./TaskShow.css";
// import { getListsThunk } from "../../../store/lists";
// import { loadTasks } from "../../../store/tasks"

const TaskShow = ({ task }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const currentTask = useSelector((state) => state.Tasks.singleTask);
  const [name, setName] = useState(task?.name || "Task Name");
  // const [due, setDue] = useState(task?.due || "");
  const [notes, setNotes] = useState(task?.notes || "");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const task =
          {
            ...currentTask,
            name,
            // due,
            notes,
          }

        const data = await dispatch(editTaskThunk(task, currentTask.id))
        if (data){
          setErrors(data.errors);
        } else {
          setErrors([]);
          closeModal()
        }

  };


  useEffect(() => {
    dispatch(getTaskThunk(task.id));
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="modal-form-title">Task Details</h1>
        <ul className="errors-container">
          {errors.map((error, idx) => (
            <p className="errors" key={idx}>{error}</p>
          ))}
        </ul>
        <div className="todo-title-duedate">
          <input
            className="todo-task-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="due-by-container">
            {/* <label className="todo-due-date">Due by: </label>
            <input
              className="todo-due-date-input"
              type="date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
            /> */}
          </div>
        </div>
        <div className="todo-notes">
          <label className="todo-notes-text" htmlFor="todo-notes-text">
            Notes
          </label>
          <textarea
            className="input-item text-big"
            name="todo-notes"
            placeholder="Write more details about your task :)"
            value={notes}
            maxLength="2000"
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="todo-action-buttons">
          {/* <button className='todo-button' type='button'>Mark Complete</button> */}
          <button
            className="todo-button"
            type="button"
            onClick={() => {
              dispatch(deleteTaskThunk(task.id)).then(() => closeModal());
              dispatch(getTasksThunk());
            }}
          >
            Delete
          </button>
          <button className="todo-button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskShow;

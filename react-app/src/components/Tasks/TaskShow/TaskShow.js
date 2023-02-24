import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTaskThunk, editTaskThunk, createTaskThunk, getTaskThunk, getTasksThunk } from "../../../store/tasks"
import { useModal } from "../../../context/Modal"
import { useHistory } from "react-router-dom"
// import { loadTasks } from "../../../store/tasks"

const TaskShow = ({ task }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { closeModal } = useModal()
  const currentUser = useSelector(state => state.session.user)
  const [name, setName] = useState(task?.name || '')
  const [due, setDue] = useState(task?.due || '')
  const [notes, setNotes] = useState(task?.notes || '')
  const [errors, setErrors] = useState([]);

  // console.log(currentTask)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([]);
    if (task?.name.length) {
      let editTask = {
        ...task,
        name,
        due,
        notes,
      }
      dispatch(editTaskThunk(task.id, editTask));
      closeModal();

    } else {
      let newTask = {
        name,
        due,
        notes,
        user_id: currentUser.id,
        list_id: null,
        status: 'Not Started'
      }
      dispatch(createTaskThunk(newTask))
      console.log('hiiiiiiii---------')
      closeModal();
    }
  }

  useEffect(() => {
    dispatch(getTasksThunk());
  }, [dispatch]);

  return (
    <div>
      <form type='submit' onSubmit={handleSubmit}>
        <ul className="errors-container">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
				</ul>
        <div className="todo-title-duedate">
          {/* <label className="todo-task-name">{task.name}</label> */}
          <input
            className="todo-task-name"
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required

          />
          <label className="todo-due-date">Due by: </label>
          <input
            className="todo-due-date-input"
            type='text'
            value={due}
            onChange={(e) => setDue(e.target.value)}
            // required
          />
        </div>
        <div className="todo-notes">
          <label htmlFor="todo-notes-text">Notes</label>
          <textarea
            className='input-item text-big'
            name="todo-notes"
            placeholder="Write more details about your task :)"
            value={notes}
            maxLength="2000"
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="todo-action-buttons">
          <button type='button'>Mark Complete</button>
          <button  type='button' onClick={() =>
            // dispatch(deleteTaskThunk(task.id)).then(closeModal()).then(dispatch(() => getTasksThunk()))}>
            dispatch(deleteTaskThunk(task.id)).then(() => closeModal())}>
              Delete
          </button>
          <button>Save</button>
        </div>
      </form>
    </div>
  )
}

export default TaskShow

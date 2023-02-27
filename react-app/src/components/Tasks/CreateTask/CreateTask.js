import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTaskThunk, editTaskThunk, createTaskThunk, getTaskThunk, getTasksThunk } from "../../../store/tasks"
import { useModal } from "../../../context/Modal"
import { useHistory } from "react-router-dom"
import './CreateTask.css'

const CreateTask = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { closeModal } = useModal()
  const user = useSelector(state => state.session.user)
  let allTasks = useSelector(state => state.Tasks.allTasks)
  const [name, setName] = useState('Task Name')
  const [due, setDue] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([]);
    return dispatch(
      createTaskThunk({
        name,
        due,
        notes,
        user_id: user.id,
        list_id: 1,

      })
    )
    // .then(history.push(`/`))
    // .then(dispatch(getTasksThunk(allTasks)))
    .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(Object.values(data.errors));
      });
    }



  useEffect(() => {
      dispatch(getTasksThunk());
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul className="errors-container">
          {errors.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))}
				</ul>
        <h1 className="modal-form-title">Task Details</h1>
        <div className="todo-title-duedate">
          {/* <label className="todo-task-name">{task.name}</label> */}
          <input
            className="todo-task-name"
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="due-by-container">
            <label className="todo-due-date">Due by: </label>
            <input
              className="todo-due-date-input"
              type='date'
              value={due}
              onChange={(e) => setDue(e.target.value)}
            />
          </div>
        </div>
        <div className="todo-notes">
          <label className="todo-notes-text" htmlFor="todo-notes-text">Notes</label>
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
          {/* <button type='button'>Mark Complete</button>
          <button  type='button' onClick={() =>
            // dispatch(deleteTaskThunk(task.id)).then(closeModal()).then(dispatch(() => getTasksThunk()))}>
            dispatch(deleteTaskThunk(task.id)).then(() => closeModal())}>
              Delete
          </button> */}
          <button className='todo-button' type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}


export default CreateTask;

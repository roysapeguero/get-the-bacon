import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteListThunk, editListThunk, createListThunk, getListThunk, getListsThunk } from "../../../store/lists"
import { useModal } from "../../../context/Modal"
import { useHistory } from "react-router-dom"
import './ListShow.css'
import TaskItem from "../../Tasks/TaskItem/TaskItem"
import { getTasksThunk } from "../../../store/tasks"
// import { loadTasks } from "../../../store/tasks"

const ListShow = ({ list }) => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const currentList = useSelector(state => state.Lists.singleList)

  const [taskItems, setTaskItems] = useState([])
  const [name, setName] = useState(list?.name || 'list Name')
  const [due, setDue] = useState(list?.due || '')
  const [notes, setNotes] = useState(list?.notes || '')
  const [errors, setErrors] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([]);
    return dispatch(
      editListThunk(
        {
          ...currentList,
          name,
          due,
          notes,
        },
        currentList.id
      )
    )
    .then(dispatch(getListThunk(currentList.id)))
    .then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(Object.values(data.errors));
    });
  }

  useEffect(() => {
      dispatch(getListThunk(list.id));
  }, [dispatch]);

  useEffect(() => {
    if (currentList.id && Object.values(currentList.tasks).length) {
      setTaskItems(Object.values(currentList.tasks).map((task) => {
          return <TaskItem key={task.id} task={task} taskId={task.id} />;
        })
      )
    }
  }, [currentList]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul className="errors-container">
          {errors.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))}
				</ul>
        <h1 className="modal-form-title">List Details</h1>
        <div className="todo-title-duedate">
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
        <div className="list-task-items">
            {taskItems}
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

          {/* <button className='todo-button' type='button'>Mark Complete</button> */}
          <button className='todo-button' type='button' onClick={() =>
            dispatch(deleteListThunk(list.id)).then(() => closeModal()).then(dispatch(getTasksThunk()))}>
              Delete
          </button>
          <button className='todo-button' type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}

export default ListShow

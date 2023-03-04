import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteListThunk, editListThunk, getListThunk} from "../../../store/lists"
import { useModal } from "../../../context/Modal"
import { useHistory } from "react-router-dom"
import './ListShow.css'
import TaskItem from "../../Tasks/TaskItem/TaskItem"
// import OpenModalButton from "../../OpenModalButton"
// import CreateTask from "../../Tasks/CreateTask/CreateTask"


const ListShow = ({ list }) => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const currentList = useSelector(state => state.Lists.singleList)
  const history = useHistory()

  const [taskItems, setTaskItems] = useState([])
  const [name, setName] = useState(list?.name || 'Type Name Here')
  // const [due, setDue] = useState(list?.due || '')
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
          // due,
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


  const deleteList = listId => {
    dispatch(deleteListThunk(listId))
    closeModal()
  }


  useEffect(() => {
      dispatch(getListThunk(list.id));
  }, [dispatch]);

  useEffect(() => {
    if (currentList.id == list.id && Object.values(currentList.tasks).length) {
      setTaskItems(Object.values(currentList.tasks).map((task) => {
          return <TaskItem key={task.id} task={task} taskId={task.id} />;
        })
      )
    }
  }, [currentList]);



  return (
    <div className="list-show-container">
      <form onSubmit={handleSubmit}>
        <ul className="errors-container">
          {errors.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))}
				</ul>
        <h1 className="modal-form-title">List Details</h1>
        <div className="list-title-duedate">
          <input
            className="list-task-name"
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="due-by-container">
            {/* <label className="list-due-date">Due by: </label>
            <input
              className="list-due-date-input"
              type='date'
              value={due}
              onChange={(e) => setDue(e.target.value)}
            /> */}
          </div>
        </div>
        <div className="list-task-items">
            {taskItems}
        </div>
        {/* <OpenModalButton
                className="add-task-modal-button"
                modalComponent={<CreateTask />}
                buttonText="+"
              /> */}
        <div className="list-notes">
          <label className="list-notes-text" htmlFor="list-notes-text">Notes</label>
          <textarea
            className='input-item text-big'
            name="list-notes"
            placeholder="Write more details about your task :)"
            value={notes}
            maxLength="2000"
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="list-action-buttons">

          {/* <button className='list-button' type='button'>Mark Complete</button> */}
          <button className='list-button' type='button' onClick={() => deleteList(currentList.id)}>
              Delete
          </button>
          <button className='list-button' type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}

export default ListShow

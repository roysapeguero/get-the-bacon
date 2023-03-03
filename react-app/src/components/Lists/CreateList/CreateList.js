import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createListThunk, getListsThunk } from "../../../store/lists"
import { useModal } from "../../../context/Modal"
import './CreateList.css'

const CreateList = () => {
  const dispatch = useDispatch()
  // const history = useHistory()
  const { closeModal } = useModal()
  const user = useSelector(state => state.session.user)
  // let allLists = useSelector(state => state.Lists.allLists)
  const [name, setName] = useState('')
  // const [due, setDue] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([]);
    return dispatch(
      createListThunk({
        name,
        // due,
        notes,
        user_id: user.id,
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
      dispatch(getListsThunk());
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul className="errors-container">
          {errors.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))}
				</ul>
        <h1 className="modal-form-title">List Details</h1>
        <div className="list-title-duedate">
          {/* <label className="list-task-name">{task.name}</label> */}
          <input
            className="list-task-name"
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Click to add name here"
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
        <div className="list-notes">
          <label className="list-notes-text" htmlFor="list-notes-text">Notes</label>
          <textarea
            className='input-item text-big'
            name="list-notes"
            placeholder="Write more details about your list :)"
            value={notes}
            maxLength="2000"
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="list-action-buttons">
          {/* <button type='button'>Mark Complete</button>
          <button  type='button' onClick={() =>
            // dispatch(deleteTaskThunk(task.id)).then(closeModal()).then(dispatch(() => getTasksThunk()))}>
            dispatch(deleteTaskThunk(task.id)).then(() => closeModal())}>
              Delete
          </button> */}
          <button className='list-button' type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}


export default CreateList;

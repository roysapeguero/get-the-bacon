import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createTaskThunk, getTasksThunk } from "../../../store/tasks"
import { useModal } from "../../../context/Modal"
// import { useHistory } from "react-router-dom"
import './CreateTask.css'
import { getListsThunk } from "../../../store/lists"

const CreateTask = () => {
  const dispatch = useDispatch()
  // const history = useHistory()
  const { closeModal } = useModal()
  const user = useSelector(state => state.session.user)

  const allLists = useSelector(state => state.Lists.allLists)
  const allListsArr = Object.values(allLists);

  let listItems;
  if (Object.values(allLists).length) {
    listItems = allListsArr.map((list) => {
      return [list.name, list.id, list]
    });
  }
  const [name, setName] = useState('')
  // const [due, setDue] = useState('')
  const [notes, setNotes] = useState('')
  const [listId, setListId] = useState(listItems[0][1])
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([]);


    const task = {
        name,
        // due,
        notes,
        user_id: user.id,
        list_id: listId
      }

      const data = await dispatch(createTaskThunk(task))
      if (data){
          setErrors(data.errors);
        } else {
          setErrors([]);
          dispatch(getTasksThunk());
          dispatch(getListsThunk());
          closeModal()
        }
      // });
    }



  useEffect(() => {
      dispatch(getTasksThunk());
      // dispatch(getListThunk(listId));
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
          {/* <label className="todo-task-name">{task.name}</label> */}
          <input
            className="todo-task-name"
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Click to add name here"
          />
          <div className="due-by-container">
            {/* <label className="todo-due-date">Due by: </label>
            <input
              className="todo-due-date-input"
              type='date'
              value={due}
              onChange={(e) => setDue(e.target.value)}
            /> */}
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

          <label className="select-field-label">Select a list: </label>
          <select
            className="select-field"
            name='list'
            value={listId}
            onChange={(e) => setListId(e.target.value)}
          >

            {listItems ? listItems.map((list) => (
              <option key={list[1]} value={list[1]}>
                {list[0]}
              </option>

            )) :  ''}
          </select>
          <button className='todo-button' type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}


export default CreateTask;

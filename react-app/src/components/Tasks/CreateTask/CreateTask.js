import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTaskThunk, editTaskThunk, createTaskThunk, getTaskThunk, getTasksThunk } from "../../../store/tasks"
import { useModal } from "../../../context/Modal"
import { useHistory } from "react-router-dom"
import './CreateTask.css'
import { editListThunk, getListsThunk, getListThunk } from "../../../store/lists"

const CreateTask = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { closeModal } = useModal()
  const user = useSelector(state => state.session.user)

  const allLists = useSelector(state => state.Lists.allLists)
  const allListsArr = Object.values(allLists);

  const [name, setName] = useState('Task Name')
  const [due, setDue] = useState('')
  const [notes, setNotes] = useState('')
  const [listId, setListId] = useState(1)
  const [errors, setErrors] = useState([]);

  let listItems;
  if (Object.values(allLists).length) {
    listItems = allListsArr.map((list) => {
      return [list.name, list.id, list]
    });
  }

  let itemIdx;
  listItems.forEach((item, idx) => {
    if (listId && item[1] == listId) itemIdx = idx
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([]);
    return await dispatch(
      createTaskThunk({
        name,
        due,
        notes,
        user_id: user.id,
        list_id: listId

      })
    )
    .then(() => {
      dispatch(getTasksThunk());
      dispatch(getListsThunk());
      closeModal();
    })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(Object.values(data.errors));
      });
    }



  useEffect(() => {
      dispatch(getTasksThunk());
      // dispatch(getListThunk(listId));
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
          <label>List: </label>
          <select
            name='list'
            value={listId}
            onChange={(e) => setListId(e.target.value)}
          >
            {listItems.map((list) => (
              <option key={list[1]} value={list[1]}>
                {list[0]}
              </option>
            ))}
          </select>
          <button className='todo-button' type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}


export default CreateTask;

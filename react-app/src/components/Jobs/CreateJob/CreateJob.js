import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJobThunk, getJobsThunk } from "../../../store/jobs";
import { useModal } from "../../../context/Modal";
// import { useHistory } from "react-router-dom"
import "./CreateJob.css";
import { getListsThunk } from "../../../store/lists";

const CreateJob = () => {
  const dispatch = useDispatch();
  // const history = useHistory()
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);

  // const allLists = useSelector(state => state.Lists.allLists)
  // const allListsArr = Object.values(allLists);

  // let listItems;
  // if (Object.values(allLists).length) {
  //   listItems = allListsArr.map((list) => {
  //     return [list.name, list.id, list]
  //   });
  // }
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyImageUrl, setCompanyImageUrl] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [status, setStatus] = useState("");
  const [benefits, setBenefits] = useState("");
  const [listingUrl, setListingUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [jobNotes, setJobNotes] = useState("");
  const [hooks, setHooks] = useState("");
  const [extraNotes, setExtraNotes] = useState("");

  // const [listId, setListId] = useState(listItems[0][1])
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const job = {
      job_title: jobTitle,
      company_name: companyName,
      company_image_url: companyImageUrl,
      job_location: jobLocation,
      status,
      benefits,
      listing_url: listingUrl,
      job_description: jobDescription,
      salary,
      job_notes: jobNotes,
      hooks,
      extra_notes: extraNotes,
    };

    const data = await dispatch(createJobThunk(job));
    if (data) {
      setErrors(data.errors);
    } else {
      setErrors([]);
      dispatch(getJobsThunk());
      // dispatch(getListsThunk());
      closeModal();
    }
  };

  useEffect(() => {
    dispatch(getJobsThunk());
    // dispatch(getListThunk(listId));
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="modal-form-title">Job Details</h1>
        <ul className="errors-container">
          {errors.map((error, idx) => (
            <p className="errors" key={idx}>
              {error}
            </p>
          ))}
        </ul>
        <div className="todo-title-duedate">
          {/* <label className="todo-task-name">{task.name}</label> */}
          <input
            className="todo-task-name"
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
            placeholder="Click to add name here"
          />
          {/* <div className="due-by-container">

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
          </select> */}
          <button className="todo-button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;

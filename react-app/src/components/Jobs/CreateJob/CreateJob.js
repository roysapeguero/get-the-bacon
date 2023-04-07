import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteJobThunk,
  editJobThunk,
  getJobThunk,
  getJobsThunk,
  createJobThunk
} from "../../../store/jobs";
import { createListThunk } from "../../../store/lists";
import { useModal } from "../../../context/Modal";
import "./CreateJob.css";
import TaskItem from "../../Tasks/TaskItem/TaskItem";

const CreateJob = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const allTasks = useSelector((state) => state.Tasks.allTasks);
  const currentUser = useSelector((state) => state.session.user);
  const allTasksArr = Object.values(allTasks);

  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyImageUrl, setCompanyImageUrl] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [status, setStatus] = useState("");
  const [benefits, setBenefits] = useState("");
  const [listingUrl, setListingUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salary, setSalary] = useState(0);
  const [jobNotes, setJobNotes] = useState("");
  const [hooks, setHooks] = useState("");
  const [extraNotes, setExtraNotes] = useState("");
  const [jobStatus, setJobStatus] = useState("Not Applied");
  const [listId, setListId] = useState(4);
  const [toggleState, setToggleState] = useState(1);
  const [errors, setErrors] = useState([]);

  let taskItems;
  if (Object.values(allTasks).length) {
    taskItems = allTasksArr.map((task) => {
      if (task.list_id === listId) {
        return <TaskItem key={task.id} task={task} taskId={task.id} />;
      }
    });
  }

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const jobList = {
      name: `${jobTitle} todo`,
      notes: '',
      user_id: currentUser.id,
    }

    const list = dispatch(createListThunk(jobList))
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
      listId: list.id
    };



    const data = await dispatch(createJobThunk(job));
    if (data) {
      setErrors(data.errors);
    } else {
      setErrors([]);
      dispatch(getJobsThunk());
      closeModal();
    }
  };

  useEffect(() => {
    dispatch(getJobsThunk());
  }, [dispatch]);

  return (
    <div className="job-modal">
      <form onSubmit={handleSubmit}>
        <h1 className="modal-form-title">Job Details</h1>
        <ul className="errors-container">
          {errors.map((error, idx) => (
            <p className="errors" key={idx}>
              {error}
            </p>
          ))}
        </ul>
        <div className="tabs-container">
          <div className="bloc-tabs">
            <button
              type="button"
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              Basic Info
            </button>
            <button
              type="button"
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              Description
            </button>
            <button
              type="button"
              className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(3)}
            >
              Notes
            </button>
            <button
              type="button"
              className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(4)}
            >
              To-dos
            </button>
          </div>
          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "content  active-content" : "content"
              }
            >
              <div className="company-img-container create">
                {/* <img className="company-img" src={companyImageUrl} alt="" /> */}
                <label className="input-text-label" htmlFor="job-image">
                  Company Image URL:
                </label>
                <input
                  // name="job-title"
                  className="job-title job-input-item"
                  type="text"
                  value={companyImageUrl}
                  onChange={(e) => setCompanyImageUrl(e.target.value)}
                  required
                />
              </div>
              <div className="basic-info-text">
                <label className="input-text-label" htmlFor="job-title">
                  Job Title:
                </label>
                <input
                  name="job-title"
                  className="job-title job-input-item"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
                <label className="input-text-label" htmlFor="company-name">
                  Company Name:
                </label>
                <input
                  name="company-name"
                  className="company-name job-input-item"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
                <label className="input-text-label" htmlFor="job-benefits">
                  Job Location:
                </label>
                <input
                  className="job-location job-input-item"
                  type="text"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  required
                />
                <label className="input-text-label" htmlFor="job-benefits">
                  Application Status:
                </label>
                <input
                  className="job-status job-input-item"
                  type="text"
                  value={jobStatus}
                  onChange={(e) => setJobStatus(e.target.value)}
                  required
                />
                <label className="input-text-label" htmlFor="job-benefits">
                  Benefits:
                </label>
                <input
                  name="job-benefits"
                  className="job-benefits job-input-item"
                  type="text"
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                />
              </div>
            </div>
            <div
              className={
                toggleState === 2 ? "content  active-content" : "content"
              }
            >
              <div className="description-text">
                <label className="input-text-label" htmlFor="job-benefits">
                  Listing URL:
                </label>
                <input
                  className="job-listing job-input-item"
                  type="text"
                  value={listingUrl}
                  onChange={(e) => setListingUrl(e.target.value)}
                />
                <label className="input-text-label" htmlFor="job-text-area">
                  Job Description:
                </label>
                <textarea
                  name="job-text-area"
                  className="job-text-area job-input-item"
                  type="text-area"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <label className="input-text-label" htmlFor="job-benefits">
                  Possible Salary:
                </label>
                <input
                  className="job-salary job-input-item"
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
            </div>

            <div
              className={
                toggleState === 3 ? "content  active-content" : "content"
              }
            >
              <div className="basic-info-text">
                <label className="input-text-label">Research Notes:</label>
                <textarea
                  name="research-notes"
                  className="job-text-area notes job-input-item"
                  type="text"
                  value={jobNotes}
                  onChange={(e) => setJobNotes(e.target.value)}
                />
                <label className="input-text-label">Interview Hooks:</label>
                <textarea
                  name="interview-notes"
                  className="job-text-area notes job-input-item"
                  type="text"
                  value={hooks}
                  onChange={(e) => setHooks(e.target.value)}
                />
                <label className="input-text-label">Extra Notes:</label>
                <textarea
                  name="extra-notes"
                  className="job-text-area notes job-input-item"
                  type="text"
                  value={extraNotes}
                  onChange={(e) => setExtraNotes(e.target.value)}
                />
              </div>
            </div>
            <div
              className={
                toggleState === 4 ? "content  active-content" : "content"
              }
            >
              <div className="basic-info-text">
                <label className="input-text-label" htmlFor="job-benefits">
                  To-dos:
                </label>
                <p className="job-task-item">{taskItems}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="todo-action-buttons">

          <button className="todo-button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;

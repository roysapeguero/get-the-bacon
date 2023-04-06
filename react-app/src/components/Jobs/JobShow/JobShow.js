import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteJobThunk,
  editJobThunk,
  getJobThunk,
  getJobsThunk,
} from "../../../store/jobs";
import { useModal } from "../../../context/Modal";
import "./JobShow.css";
import TaskItem from "../../Tasks/TaskItem/TaskItem";

const JobShow = ({ job }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const allTasks = useSelector((state) => state.Tasks.allTasks);
  const allTasksArr = Object.values(allTasks);

  const currentJob = useSelector((state) => state.Jobs.singleJob);
  const [jobTitle, setJobTitle] = useState(job?.job_title || "");
  const [companyName, setCompanyName] = useState(job?.company_name || "");
  const [companyImageUrl, setCompanyImageUrl] = useState(
    job?.company_image_url || ""
  );
  const [jobLocation, setJobLocation] = useState(job?.job_location || "");
  const [jobStatus, setJobStatus] = useState(job?.status || "Not Applied");
  const [benefits, setBenefits] = useState(job?.benefits || "");
  const [listingUrl, setListingUrl] = useState(job?.listing_url || "");
  const [jobDescription, setJobDescription] = useState(
    job?.job_description || ""
  );
  const [salary, setSalary] = useState(job?.salary || 0);
  const [jobNotes, setJobNotes] = useState(job?.job_notes || "");
  const [hooks, setHooks] = useState(job?.hooks || "");
  const [extraNotes, setExtraNotes] = useState(job?.extra_notes || "");
  const [listId, setListId] = useState(job?.list_id || 4);
  const [errors, setErrors] = useState([]);
  const [toggleState, setToggleState] = useState(1);

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
    const job = {
      ...currentJob,
      job_title: jobTitle,
      company_name: companyName,
      company_image_url: companyImageUrl,
      job_location: jobLocation,
      status: jobStatus,
      benefits,
      listing_url: listingUrl,
      job_description: jobDescription,
      salary,
      job_notes: jobNotes,
      hooks,
      extra_notes: extraNotes,
      list_id: listId
    };

    const data = await dispatch(editJobThunk(job, currentJob.id));
    if (data) {
      setErrors(data.errors);
      closeModal()
    } else {
      setErrors([]);
    }
  };

  useEffect(() => {
    dispatch(getJobThunk(job.id));
  }, [dispatch]);

  return (
    <div className="job-modal">
      <form onSubmit={handleSubmit}>
        <h1 className="modal-form-title">Job Details</h1>
        <ul className="errors-container">
          {errors?.map((error, idx) => (
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
              <div className="company-img-container">
                {/* {companyImageUrl ? } */}
                <img className="company-img" src={companyImageUrl} alt="" />
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
          <button
            className="todo-button"
            type="button"
            onClick={() => {
              dispatch(deleteJobThunk(job.id)).then(() => closeModal());
              dispatch(getJobsThunk());
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

export default JobShow;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobsThunk } from "../../../store/jobs";
import "./AllJobs.css";
import OpenModalButton from "../../OpenModalButton";
// import TaskShow from "../TaskShow/TaskShow";
import JobItem from "../JobItem/JobItem";
import CreateJob from "../CreateJob/CreateJob";

const AllJobs = () => {
  const dispatch = useDispatch();
  const allJobs = useSelector((state) => state.Jobs.allJobs);
  const currentJob = useSelector((state) => state.Jobs.singleJob);
  // const lists = useSelector((state) => state.Lists.allLists);
  // const allListsArr = Object.values(lists);

  const allJobsArr = Object.values(allJobs);
  // const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getJobsThunk()).then(() => {
      // setIsLoaded(true);
    });
  }, [dispatch, currentJob]);

  let jobItems;
  if (Object.values(allJobs).length) {
    jobItems = allJobsArr.map((job) => {
      return <JobItem key={job.id} job={job} jobId={job.id} />;
    });
  }

  return (
    <div className="all-jobs-container">
      <div className="jobs-top-container">
        <h2 className="all-jobs-header">Jobs</h2>
      </div>
      {allJobsArr.length ? (
        <>
          <div className="jobs-container">
            <ul className="jobs-wrapper">{jobItems}</ul>
          </div>
        </>
      ) : (
        <>
          <h2>Click 'Add Job' to make your first job!</h2>
        </>
      )}
      <div className="jobs-button-container">
        <OpenModalButton
          className="add-job-modal-button"
          modalComponent={<CreateJob />}
          buttonText="Add Job"
        />
      </div>
    </div>
  );
};

export default AllJobs;

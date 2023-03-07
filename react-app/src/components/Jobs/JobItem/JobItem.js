// import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import JobShow from "../JobShow/JobShow";
import OpenModalButton from "../../OpenModalButton";
import './JobItem.css'

const JobItem = ({ job }) => {

  return (
    <div className="job-item">
      <OpenModalButton
        className="open-task-modal-button list"
        modalComponent={
          <JobShow job={job}/>
        }
        buttonText={
          <div className="job-name-item">
            <img className="company-img" src={job.company_image_url} alt="" />

            {job.job_title}
          </div>
        }
      />
    </div>
  );
};

export default JobItem;

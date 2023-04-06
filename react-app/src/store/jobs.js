const GET_JOBS = "jobs/GET_JOBS";
const GET_JOB = "jobs/GET_JOB";
const CREATE_JOB = "jobs/CREATE_JOB";
const EDIT_JOB = "jobs/EDIT_JOB";
const DELETE_JOB = "jobs/DELETE_JOB";

const loadJobs = (jobs) => {
  return {
    type: GET_JOBS,
    payload: jobs
  }
};

const loadJob = (job) => {
  return {
    type: GET_JOB,
    payload: job
  }
};

const createJob = (job) => {
  return {
    type: CREATE_JOB,
    payload: job,
  }
};


const editJob = (job) => {
  return {
    type: EDIT_JOB,
    payload: job
  };
};

const deleteJob = (jobId) => {
  return {
    type: DELETE_JOB,
    payload: jobId
  }
};


// Get Jobs
export const getJobsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/jobs`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadJobs(data));
  }
};

// Get job
export const getJobThunk = (jobId) => async (dispatch) => {
  const res = await fetch(`/api/jobs/${jobId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadJob(data));
  }
};

// Edit
export const editJobThunk = (job, jobId) => async (dispatch) => {
  console.log('hi', job, jobId)
  const res = await fetch(`/api/jobs/${job.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });
  console.log('ummm', res)

  if (res.ok) {
    const job = await res.json();
    dispatch(editJob(job));
    return job
  } else {
    const data = await res.json();
    if (data.errors) return data;
  }
};

// Create job
export const createJobThunk = (job) => async (dispatch) => {
  console.log('hi', job)
  const res = await fetch("/api/jobs/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(job),
  });

  console.log('res', res)
  if (res.ok) {
    const job = await res.json();
    dispatch(createJob(job));
    // return job
  } else {
    const data = await res.json();
    if (data.errors) return data;
  }
};


// Delete job
export const deleteJobThunk = (jobId) => async (dispatch) => {
  const res = await fetch(`/api/jobs/${jobId}`, {
    method: "DELETE"
  });

  if (res.ok) {
    const data = await res.json()
    dispatch(deleteJob(jobId));
    return data
  }
};

const initialState = { allJobs: {}, singleJob: {}}

const jobsReducer = (state = initialState, action) => {
  let newState = { allJobs: { ...state.allJobs }, singleJob: {...state.singleJob} };
  switch (action.type) {
    case GET_JOBS:
      newState = {...state}
      newState.allJobs = action.payload
      return newState

    case GET_JOB:
      newState.singleJob = action.payload
      return newState

    case EDIT_JOB:
      newState.allJobs = {...newState.allJobs, [action.payload.id]: action.payload}
      newState.singleJob = {...state.singleJob, ...action.payload}
      return newState

    case CREATE_JOB:
      newState.allJobs = {...state.allJobs, [action.payload.id]: action.payload}
      return newState

    case DELETE_JOB:
      delete newState.allJobs[action.payload]
      newState.singleJob = {}
      return newState

    default:
      return state
  }
}

export default jobsReducer;

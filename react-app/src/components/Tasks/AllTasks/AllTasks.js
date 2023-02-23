import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk, getTaskThunk } from "../../../store/tasks";
import "./AllTasks.css";

const TaskItem = ({task}) => {


  const handleClick = () => {

    if (task.status === 'Not Started' || task.status === 'In Progress') {
      task.status = 'Done'
    } else {
      task.status = 'In Progress'
    }

  }

  return (
    <div>
        <input onClick={() => handleClick()} id='task-name' type='checkbox' />
        <label className="task-label" htmlFor='task-name'>{task.name}</label>
    </div>
  )
}

const AllTasks = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.Tasks.allTasks);
  const allTasksArr = Object.values(allTasks);

  useEffect(() => {
    dispatch(getTasksThunk());
  }, [dispatch]);

  let taskItems;
  if (allTasksArr.length) {
    taskItems = allTasksArr.map((task) => {
      return <TaskItem key={task.id} task={task} />;
    });
  }


  if (!allTasksArr.length) return null;

  return (
    <div className="all-tasks-page-container">
      <h2 className="all-tasks-header">Tasks</h2>
      <div className="tasks-container">
        <ul className="tasks-wrapper">{taskItems}</ul>
      </div>
    </div>
  );
};

export default AllTasks;

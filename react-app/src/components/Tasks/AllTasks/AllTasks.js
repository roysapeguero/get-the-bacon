import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk, getTaskThunk } from "../../../store/tasks";
import "./AllTasks.css";
import OpenModalButton from "../../OpenModalButton";
import TaskShow from "../TaskShow/TaskShow";
import TaskItem from "../TaskItem/TaskItem";
import CreateTask from "../CreateTask/CreateTask";


const AllTasks = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.Tasks.allTasks);
  const allTasksArr = Object.values(allTasks);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getTasksThunk(allTasks)).then(() =>{
      setIsLoaded(true)
    });
  }, [dispatch]);


  let taskItems;
  if (Object.values(allTasks).length) {
    taskItems = allTasksArr.map((task) => {
      return <TaskItem key={task.id} task={task} taskId={task.id} />;
    });
  }

  // if (!Object.values(allTasks).length) return null;
  if (!allTasksArr.length) return null;

  return (
    <div className="all-tasks-container">
      <div className="task-top-container">
        <h2 className="all-tasks-header">Tasks</h2>
        <div className="tasks-container">
          <ul className="tasks-wrapper">{taskItems}</ul>
        </div>
      </div>
      <div className="tasks-button-container">
        <OpenModalButton
          className="add-task-modal-button"
          modalComponent={
          <CreateTask />
          }
          buttonText='Add Task'
        />
      </div>
    </div>
  );
};

export default AllTasks;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk, editTaskThunk } from "../../../store/tasks";
import "./AllTasks.css";

const TaskItem = ({ task, status }) => {
  const dispatch = useDispatch()
  const handleClick = () => {
    const newTask = { ...task };
    if (status === "Not Started" || status === "In Progress") {
      newTask.status = "Done";
    } else {
      newTask.status = "In Progress";
    }
    dispatch(editTaskThunk(newTask.id, newTask));
  };

  return (
    <div>
      <input
        onChange={() => handleClick()}
        id="task-name"
        type="checkbox"
        checked={status === "Done"}
      />
      <label className="task-label" htmlFor="task-name">
        {task.name}
      </label>
    </div>
  );
};

const AllTasks = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.Tasks.allTasks);
  const allTasksArr = allTasks ? Object.values(allTasks) : [];

  useEffect(() => {
    dispatch(getTasksThunk());
  }, [dispatch]);

  let taskItems;
  if (allTasksArr.length) {
    taskItems = allTasksArr.map((task) => {
      return <TaskItem key={task.id} task={task} status={task.status} />;
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

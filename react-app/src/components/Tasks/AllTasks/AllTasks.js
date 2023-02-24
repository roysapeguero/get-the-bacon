import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk, editTaskThunk, getTaskThunk, deleteTaskThunk } from "../../../store/tasks";
import "./AllTasks.css";
import OpenModalButton from "../../OpenModalButton";
import TaskShow from "../TaskShow/TaskShow";

const TaskItem = ({ task, status }) => {
  const dispatch = useDispatch()
  const handleClick = () => {
    // task = { ...task };
    if (status === "Not Started" || status === "In Progress") {
      task.status = "Done";
    } else {
      task.status = "In Progress";
    }
    dispatch(editTaskThunk(task.id, task));
    // dispatch(deleteTaskThunk(task.id, task));

  };


  return (
    <div>
      <input
        onChange={() => handleClick()}
        id="task-name"
        type="checkbox"
        checked={status === "Done"}
      />
      <OpenModalButton
        className="edit-task-modal-button"
        modalComponent={
        <TaskShow task={task} />
        }
        buttonText={task.name}
      />
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
      <OpenModalButton
        className="add-task-modal-button"
        modalComponent={
        <TaskShow />
        }
        buttonText={<label className="add-task-label" >
          Add task
      </label>}
      />
    </div>
  );
};

export default AllTasks;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk, editTaskThunk, getTaskThunk, deleteTaskThunk } from "../../../store/tasks";
import "./AllTasks.css";
import OpenModalButton from "../../OpenModalButton";
import TaskShow from "../TaskShow/TaskShow";

const TaskItem = ({ task, status }) => {
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    const storedCheckboxState = localStorage.getItem(`checkbox-${task.id}`);
    if (storedCheckboxState !== null) {
      setIsChecked(JSON.parse(storedCheckboxState));
    }
  }, [task.id]);

  const checkHandler = () => {
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    localStorage.setItem(`checkbox-${task.id}`, JSON.stringify(isChecked));
  }, [task.id, isChecked]);

  return (
    <div>
      <label className="check-box-label">
        <input
          onChange={checkHandler}
          id="task-name"
          type="checkbox"
          checked={isChecked}
          className='check-box'
        />
        <span className="fake-checkbox"></span>
      </label>
      <OpenModalButton
        className="open-task-modal-button"
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
      return <TaskItem key={task.id} task={task} />;
    });
  }

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
          <TaskShow />
          }
          buttonText={<label className="add-task-label" >
            Add task
          </label>}
        />
      </div>
    </div>
  );
};

export default AllTasks;

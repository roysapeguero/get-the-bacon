// import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import TaskShow from "../TaskShow/TaskShow";
import OpenModalButton from "../../OpenModalButton";
import './TaskItem.css'
import { useDispatch, useSelector } from "react-redux";
import { getTaskThunk } from "../../../store/tasks";

const TaskItem = ({ task }) => {
  const [isChecked, setIsChecked] = useState(false)
  const currentTask = useSelector(state => state.Tasks.singleTask)

  useEffect(() => {
    const storedCheckboxState = localStorage.getItem(`checkbox-${task.id}`);
    if (storedCheckboxState !== null) {
      setIsChecked(JSON.parse(storedCheckboxState));
    }
  }, [task.id]);

  useEffect(() => {
    localStorage.setItem(`checkbox-${task.id}`, JSON.stringify(isChecked));
  }, [task.id, isChecked]);

  const checkHandler = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div className="check-name-item">
      <label htmlFor="task-name" className="check-box-label">
        <input
          onChange={checkHandler}
          id="task-name"
          type="checkbox"
          checked={isChecked}
          className='check-box'
        />
        {/* <span className="fake-checkbox"></span> */}
      </label>
      <OpenModalButton
        className="open-task-modal-button list"
        modalComponent={
        <TaskShow task={task}/>
        }
        buttonText={task.name}
      />
    </div>
  );
};

export default TaskItem;

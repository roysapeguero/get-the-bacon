import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import TaskShow from "../TaskShow/TaskShow";
import OpenModalButton from "../../OpenModalButton";
import './TaskItem.css'

const TaskItem = ({ task }) => {
  const [isChecked, setIsChecked] = useState(false)

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
        className="open-task-modal-button"
        modalComponent={
        <TaskShow editTask={true} task={task}/>
        }
        buttonText={task.name}
      />
    </div>
  );
};

export default TaskItem;

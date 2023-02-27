import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import TaskShow from "../TaskShow/TaskShow";
import OpenModalButton from "../../OpenModalButton";
import { getTaskThunk } from "../../../store/tasks";

const TaskItem = ({ task, taskId }) => {
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    const storedCheckboxState = localStorage.getItem(`checkbox-${task.id}`);
    if (storedCheckboxState !== null) {
      setIsChecked(JSON.parse(storedCheckboxState));
    }
  }, [taskId]);

  useEffect(() => {
    localStorage.setItem(`checkbox-${taskId}`, JSON.stringify(isChecked));
  }, [taskId, isChecked]);

  const checkHandler = () => {
    setIsChecked(!isChecked)
  }

  // useEffect(() => {
  //   dispatch(getTaskThunk(taskId));
  // }, [dispatch, taskId]);


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
        <TaskShow editTask={true} task={task}/>
        }
        buttonText={task.name}
      />
    </div>
  );
};

export default TaskItem;

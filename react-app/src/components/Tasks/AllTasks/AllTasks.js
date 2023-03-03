import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk } from "../../../store/tasks";
import "./AllTasks.css";
import OpenModalButton from "../../OpenModalButton";
// import TaskShow from "../TaskShow/TaskShow";
import TaskItem from "../TaskItem/TaskItem";
import CreateTask from "../CreateTask/CreateTask";

const AllTasks = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.Tasks.allTasks);
  const currentTask = useSelector(state => state.Tasks.singleTask)
  const lists = useSelector((state) => state.Lists.allLists);
  const allListsArr = Object.values(lists);

  const allTasksArr = Object.values(allTasks);
  // const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getTasksThunk()).then(() => {
      // setIsLoaded(true);
    });
  }, [dispatch, lists, currentTask]);

  let taskItems;
  if (Object.values(allTasks).length) {
    taskItems = allTasksArr.map((task) => {
      return <TaskItem key={task.id} task={task} taskId={task.id} />;
    });
  }

  // if (!Object.values(allTasks).length) return null;
  // if (!allTasksArr.length) return null;

  return (
    <div className="all-tasks-container">
      <div>
        <h2 className="all-tasks-header">Tasks</h2>
      </div>
      {allTasksArr.length ? (
        <>
          <div className="tasks-container">
            <ul className="tasks-wrapper">{taskItems}</ul>
          </div>
          <OpenModalButton
                className="add-task-modal-button"
                modalComponent={<CreateTask />}
                buttonText="Add Task"
              />
        </>
      ) : (
        <>

          <div className="tasks-button-container">
            {allListsArr.length ? (
              <>
              <h2>Now try adding a task!</h2>
              <OpenModalButton
                className="add-task-modal-button"
                modalComponent={<CreateTask />}
                buttonText="Add Task"
              />
              </>
            ) : (
              <h2>Make a list to start adding tasks :D</h2>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AllTasks;

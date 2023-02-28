import AllLists from "../Lists/AllLists/AllLists";
import AllTasks from "../Tasks/AllTasks/AllTasks";
import './HomePage.css'

const HomePage = () => {

  return (
    <div className="home-page-contents">
        <AllTasks />

        <AllLists />
    </div>
  )
}

export default HomePage;

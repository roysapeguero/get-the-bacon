import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
// import AllTasks from "./components/Tasks/AllTasks/AllTasks";
import SplashPage from "./components/SplashPage/SplashPage";
import HomePage from "./components/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import AllJobs from "./components/Jobs/AllJobs/AllJobs";
import JobShow from "./components/Jobs/JobShow/JobShow";


function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const user = useSelector(state => state.session.user)
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/jobs/:jobId">
            <JobShow />
          </Route>
          <Route path="/jobs">
            {user ? <AllJobs /> : <SplashPage/>}
          </Route>
          <Route exact path="/">
            {user ? <HomePage /> : <SplashPage />}
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;

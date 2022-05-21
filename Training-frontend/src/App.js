import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Home from './Components/Home/Home';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Navbar from './Components/Navbar/Navbar';
import NotFound from './Components/NotFound/NotFound';
import Courses from './Components/new/Pages/Courses'
import { Provider } from 'react-redux';
import store from './redux/store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import PrivateRoute from './Components/private-route/PrivateRoute';
import Dashboard from './Components/Dashboard/Dashboard';
// import Navbar1 from '../Navbar/Navbar1'
// import './Dashboard.css';
// import Notfound from './Components/Pages/Notfound';
// import Viewcourse from '../new/Pages/Viewcourse';
// import HomeAfterLogin from '../new/Pages/Home'
// import Courses from '../new/Pages/Courses'
// import Trainerdetails from '../new/Pages/Trainerdetails'
// import Navbar from './Components/Layout/Navbar'
import Schedule from './Components/new/Pages/Schedule'
import Viewtrainer from './Components/new/Pages/Trainerdetails'
import CreateCourse from './Components/new/Pages/CreateCourse'
import Details from './Components/new/Pages/Details';
import Edit from './Components/new/Pages/Edit'
import Nav from './Components/Coursetable/nav'
import CreateTrainer from './Components/new/Pages/Createtrainer';
import Courseedit from './Components/new/Pages/Courseedit';
import Traineredit from './Components/new/Pages/Traineredit';
import Trainerdetails from './Components/new/Pages/Trainerdetails'
import Viewcourse from './Components/new/Pages/Viewcourse';
// import Nav from './Components/Coursetable/nav'

function App() {
  // Check for token to keep user logged in
  if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded)); // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser()); // Redirect to login
      window.location.href = './login';
    }
  }
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Nav/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
    {/* <Route exact path="/dashboard/trainingschedule" component={<Trainingschedule/>}/>
    <Route exact path="/dashboard/trainerdetails" component={<Trainerdetails/>}/>
    <Route exact path="/dashboard/courses" component={<Courses/>}/>
     */}
<PrivateRoute exact path= "/dashboard/courses" component={Courses}/>
        <Route exact path= "/dashboard/trainerdetails" component={Trainerdetails}/>
        <Route exact path= "/dashboard/schedule" component={Schedule}/>
        <Route exact path= "/dashboard/trainer/:id" component={Viewtrainer}/>
        <Route exact path= "/dashboard/createCourse" component={CreateCourse}/>
        <Route exact path= "/dashboard/createTrainer" component= {CreateTrainer}/>
        <Route exact path = "/dashboard/view/:id" component={Details}/>
        <Route exact path = "/dashboard/course/:id" component={Viewcourse} />
        <Route exact path = "/dashboard/updateCourse/:id" component={Courseedit}/>
        <Route exact path= "/dashboard/updateTrainer/:id" component={Traineredit} />
        <Route exact path= "/dashboard/edit/:id" component={Edit}/>
       
            <Route path="*" component={NotFound} />
          </Switch>
          
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

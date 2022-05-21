import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
// import Coursetable from '../Coursetable/Coursetable'
import Navbar1 from '../Navbar/Navbar1'
import "./Dashboard.css";
// import Notfound from './Components/Pages/Notfound';
import Viewcourse from '../new/Pages/Viewcourse';
import HomeAfterLogin from '../new/Pages/HomeAfterLogin'
import Courses from '../new/Pages/Courses'
import Trainerdetails from '../new/Pages/Trainerdetails'
// import Navbar from './Components/Layout/Navbar'
import Schedule from '../new/Pages/Schedule'
import Viewtrainer from '../new/Pages/Trainerdetails'
import CreateCourse from '../new/Pages/CreateCourse'
import Details from '../new/Pages/Details';
import Edit from '../new/Pages/Edit'
import Nav from '../Coursetable/nav'
import CreateTrainer from '../new/Pages/Createtrainer';
import Courseedit from '../new/Pages/Courseedit';
import Traineredit from '../new/Pages/Traineredit';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    
    return (
      
        
      <div>

         <button
          onClick={this.onLogoutClick}
          className="btn btn-lg btn-warning mt-5"
        >
          Logout
        </button>
        <Nav/>
        <HomeAfterLogin/>
      <Switch>
        {/* <Route exact path= "/dashboard" component={Home}/> */}
        {/* <Route exact path= "/dashboard/courses" component={Courses}/>
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
        <Route component={Notfound}/> */}
      </Switch>    
      </div>         
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);



// <section className="dashboard">
// <Navbar1/>
// <div className="container">
//   <div className="row">
//     <div className="col-12">
//       <div className="content">
//         <h1>
//           Hi! <b>{user.name.split(' ')[0]} </b>
//         </h1>
//         <h3>
//           <Coursetable/>
//         </h3>
//         <button
//           onClick={this.onLogoutClick}
//           className="btn btn-lg btn-warning mt-5"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
// </section>
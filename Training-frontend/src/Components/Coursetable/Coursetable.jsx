import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Table} from 'react-bootstrap'
import Courses from './Courses'
import Trainingschedule from './Trainingschedule'
import Trainerdetails from './Trainerdetails'
import Nav from './nav'


export default function Coursetable(){
 return (
     <div>
         {/* <Nav/>
         <Switch>
    <Route exact path="/dashboard/trainingschedule" component={<Trainingschedule/>}/>
    <Route exact path="/dashboard/trainerdetails" component={<Trainerdetails/>}/>
    <Route exact path="/dashboard/courses" component={<Courses/>}/> */}
    
        
{/* </Switch> */}
         
    </div>
    
 )
}
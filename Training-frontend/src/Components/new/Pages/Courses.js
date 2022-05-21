import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import "./Courses.css";
import Nav from '../../Coursetable/nav'
const Courses = () => {

const [getCourseData, setCourseData] = useState([])
// console.log(getScheduleData)

const getCourse = async (e) => {
 

  const res = await fetch("/api/users/dashboard/getCourse", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json'
    }
  })

  const data= await res.json()
  console.log(data)
  console.log(res.status)

  if(res.status === 422 || !data){
      console.log('error')
  }else{
	  	setCourseData(data)
		console.log("got Course")
  }
}

useEffect(() => {
	getCourse()	
}, []);

const deleteCourse = async(id)=>{
	const res2 = await fetch(`/api/users/dashboard/deleteCourse/${id}`,{
		method: "DELETE",
		headers: {
			"Content-Type" : "application/json"
		}
	})

	const deletedCourse = await res2.json()
	console.log(deletedCourse)

	if(res2.status === 422 || !deletedCourse){
		console.log("error")
	} else{
    alert("course is deleted")
		console.log("Course is deleted")
		getCourse()
	} 
}





  return (
    <div>
    <Nav/>
    <div className="mt-4">
      <div className="container">
        <div className="schedule_btn mt-2">
          <NavLink className="btn btn-primary" to="/dashboard/createCourse"> Create Course</NavLink>
        </div>

        <table class="table mt-4">
          <thead>
            <tr className="table-dark">
            <th scope="col">id</th>
              <th scope="col">Course</th>
              {/* <th scope="col">Description</th> */}
              <th scope="col">Category</th>
              <th scope="col">Intended audience</th>
              <th scope="col">benefits</th>
              <th scope="col">Trainer's name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
			  {
				  getCourseData.map((element, id)=>{
					  return (
						  <>
					<tr>
						<th scope="row">{id+1}</th>
						<td>{element.course}</td>
						{/* <td>{element.desc}</td> */}
						<td>{element.cat}</td>
						<td>{element.int_aud}</td>
						<td>{element.benefits}</td>
						<td>{element.trainer_name}</td>

				<td className="d-flex justify-content-between">
                  <NavLink to={`/dashboard/course/${element._id}`}><button className="btn btn-success "><i className="fa-regular fa-eye"></i></button></NavLink>
                  <NavLink to={`/dashboard/updateCourse/${element._id}`}><button className="btn btn-primary "><i className="fas fa-pen"></i></button></NavLink>
                  <button className="btn btn-danger" onClick={()=>deleteCourse(element._id)}><i className="fas fa-trash"></i></button>
              </td>					
					</tr>
					</>
					  )
				  })
			  }

          </tbody>
        </table>
      </div>
    </div>
</div>
      )
};

export default Courses;



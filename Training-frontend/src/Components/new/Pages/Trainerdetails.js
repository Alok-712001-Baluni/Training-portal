import React, {useState, useEffect} from "react";
import "./Trainerdetails.css";
import {NavLink} from 'react-router-dom'

const Trainerdetails = () => {

  const [getTrainerData, setTrainerData] = useState([])
console.log(getTrainerData)

const getTrainer = async (e) => {
 

  const res = await fetch("/api/users/dashboard/getTrainer", {
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
	  	setTrainerData(data)
		console.log("get schedule")
  }
}

useEffect(() => {
	getTrainer()	
}, []);

const deleteTrainer = async(id)=>{
	const res2 = await fetch(`/api/users/dashboard/deleteTrainer/${id}`,{
		method: "DELETE",
		headers: {
			"Content-Type" : "application/json"
		}
	})

	const deletedata = await res2.json()
	console.log(deletedata)

	if(res2.status === 422 || !deletedata){
		console.log("error")
	} else{
		console.log("Trainer deleted")
    alert("trainer deleted")
		getTrainer()
	} 
}

  return (
      <div className="mt-4">
        <div className="container">
          <div className="schedule_btn mt-2">
            <NavLink className="btn btn-primary" to="/dashboard/Createtrainer"> Create Trainer</NavLink>
          </div>
  
          <table class="table mt-4">
            <thead>
              <tr className="table-dark">
              <th scope="col">id</th>
                <th scope="col">Trainer's name</th>
                <th scope="col">Qualification</th>
                {/* <th scope="col">Short description</th> */}
                <th scope="col">Years of experience</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
          {
            getTrainerData.map((element, id)=>{
              return (
                <>
            <tr>
              <th scope="row">{id+1}</th>
              <td>{element.name}</td>
              <td>{element.qualif}</td>
              {/* <td>{element.short_desc}</td> */}
              <td>{element.yoe}</td>
          <td className="d-flex justify-content-between">
                    <NavLink to={`/dashboard/trainer/${element._id}`}><button className="btn btn-success "><i className="fa-regular fa-eye"></i></button></NavLink>
                    <NavLink to={`/dashboard/updateTrainer/${element._id}`}><button className="btn btn-primary "><i className="fas fa-pen"></i></button></NavLink>
                    <button className="btn btn-danger" onClick={()=>deleteTrainer(element._id)}><i className="fas fa-trash"></i></button>
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
   
  
  )
}
export default Trainerdetails;

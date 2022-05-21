import React, {useState, useEffect} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./Details.css";
import { useParams, NavLink } from "react-router-dom";
const Viewcourse = () => {

	const {id} = useParams("")
	console.log(id)
	const [getCourseData, setCourseData] = useState([])
	console.log(getCourseData)

	const getCourse = async (e) => {
 

		const res = await fetch(`/api/users/dashboard/getCourse/${id}`, {
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
			console.log("get individual Course")
		}
	}
	
useEffect(() => {
	getCourse()
}, [])

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
		console.log("course is deleted")
	} 
}


	return (
		<div className="container mt-4">
			<h1 style={{ fontWeight: 400 }}>{getCourseData.course}</h1>
			<Card sx={{ maxWidth: 600 }}>
				<CardContent>
					<div className="row">
						<div className="left_view col-lg-6 col-md-6 col-12 ">
							<h3 className="mt-3" style={{ fontWeight: 400 }}>
								Description:<span>{getCourseData.desc}</span>
							</h3>
							<p className="mt-3" style={{ fontWeight: 400 }}>
								Category: <span>{getCourseData.cat}</span>
							</p>
							<p className="mt-3" style={{ fontWeight: 400 }}>
								Intended audience: <span>{getCourseData.int_aud}</span>
							</p>
							<p className="mt-3" style={{ fontWeight: 400 }}>
								Benefits: <span>{getCourseData.benefits}</span>
							</p>
							<p className="mt-3" style={{ fontWeight: 400 }}>
								Trainer name: <span>{getCourseData.trainer_name}</span>
							</p>

						</div>
						<div className="right_view col-lg-6 col-md-6 col-12">
							<NavLink to={`/dashboard/updateCourse/${getCourseData._id}`} ><button className="btn btn-primary mx-2">
								<i className="fas fa-pen"></i>
							</button></NavLink>
							<button className="btn btn-danger" onClick={() => deleteCourse(getCourseData._id)}>
								<i className="fas fa-trash"></i>
							</button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Viewcourse;

import React, {useState, useEffect} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./Details.css";
import { useParams, NavLink } from "react-router-dom";
const Details = () => {

	const {id} = useParams("")
	console.log(id)
	const [getScheduleData, setScheduleData] = useState([])
	console.log(getScheduleData)

	const getSchedule = async (e) => {
 

		const res = await fetch(`/api/users/dashboard/getSchedule/${id}`, {
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
				setScheduleData(data)
			console.log("get schedule")
		}
	}
	
useEffect(() => {
	getSchedule()
}, [])

const deleteSchedule = async(id)=>{
	const res2 = await fetch(`/api/users/dashboard/deleteSchedule/${id}`,{
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
		alert("schedule is deleted")
		console.log("schedule is deleted")
	} 
}


	return (
		<div className="container mt-4">
			<h1 style={{ fontWeight: 400 }}>{getScheduleData.course}</h1>
			<Card sx={{ maxWidth: 600 }}>
				<CardContent>
					<div className="row">
						<div className="left_view col-lg-6 col-md-6 col-12 ">
							<h3 className="mt-3" style={{ fontWeight: 400 }}>
								Trainer name:<span>{getScheduleData.trainer_name}</span>
							</h3>
							<p className="mt-3" style={{ fontWeight: 400 }}>
								Date(s): <span>{getScheduleData.date}</span>
							</p>
							<p className="mt-3" style={{ fontWeight: 400 }}>
								Start time: <span>{getScheduleData.starting_time}</span>
							</p>
							<p className="mt-3" style={{ fontWeight: 400 }}>
								End time: <span>{getScheduleData.ending_time}</span>
							</p>
							<p className="mt-3" style={{ fontWeight: 400 }}>
								Fee Amount: <span>{getScheduleData.fee_amount}</span>
							</p>
							<p className="mt-3" style={{ fontWeight: 400 }}>
								Discount amount: <span>{getScheduleData.disc_amount}</span>
							</p>
							<p className="mt-3" style={{ fontWeight: 400 }}>
								batch size: <span>{getScheduleData.batch_size}</span>
							</p>
						</div>
						<div className="right_view col-lg-6 col-md-6 col-12">
							<NavLink to={`/dashboard/edit/${getScheduleData._id}`} ><button className="btn btn-primary mx-2">
								<i className="fas fa-pen"></i>
							</button></NavLink>
							<button className="btn btn-danger" onClick={() => deleteSchedule(getScheduleData._id)}>
								<i className="fas fa-trash"></i>
							</button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Details;

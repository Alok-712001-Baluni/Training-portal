import React, {useState, useEffect} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./Details.css";
import { useParams, NavLink } from "react-router-dom";
const Viewtrainer = () => {

	const {id} = useParams("")
	console.log(id)
	const [getTrainerData, setTrainerData] = useState([])
	console.log(getTrainerData)

	const getTrainer = async (e) => {
 

		const res = await fetch(`/api/users/dashboard/getTrainer/${id}`, {
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
			console.log("get individual Course")
		}
	}
	
useEffect(() => {
	getTrainer()
}, [])

const deleteTrainer = async(id)=>{
	const res2 = await fetch(`/api/users/dashboard/deleteTrainer/${id}`,{
		method: "DELETE",
		headers: {
			"Content-Type" : "application/json"
		}
	})

	const deletedTrainer = await res2.json()
	console.log(deletedTrainer)

	if(res2.status === 422 || !deletedTrainer){
		console.log("error")
	} else{
		alert("trainer deleted")
		console.log("Trainer is deleted")
	} 
}


	return (
		<div className="container mt-4">
			<h1 style={{ fontWeight: 400 }}>{getTrainerData.name}</h1>
			<Card sx={{ maxWidth: 600 }}>
				<CardContent>
					<div className="row">
						<div className="left_view col-lg-6 col-md-6 col-12 ">
							<h3 className="mt-3" style={{ fontWeight: 400 }}>
								Short Description:<span>{getTrainerData.short_desc}</span>
							</h3>
							<p className="mt-3" style={{ fontWeight: 400 }}>
								Qualification: <span>{getTrainerData.qualif}</span>
							</p>
							<p className="mt-3" style={{ fontWeight: 400 }}>
								Years of experience: <span>{getTrainerData.yoe}</span>
							</p>

						</div>
						<div className="right_view col-lg-6 col-md-6 col-12">
							<NavLink to={`/dashboard/updateTrainer/${getTrainerData._id}`} ><button className="btn btn-primary mx-2">
								<i className="fas fa-pen"></i>
							</button></NavLink>
							<button className="btn btn-danger" onClick={() => deleteTrainer(getTrainerData._id)}>
								<i className="fas fa-trash"></i>
							</button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Viewtrainer;

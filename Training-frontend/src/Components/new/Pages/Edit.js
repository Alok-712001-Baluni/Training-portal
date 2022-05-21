import React, {useState, useEffect} from "react";
import "./Details.css";
import { useParams } from "react-router-dom";
const Edit = () => {


    const {id} = useParams("")
    // const [getScheduleData, setScheduleData] = useState([])
	// console.log(getScheduleData)

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
				setINP(data)
			console.log("get schedule")
		}
	}
	
useEffect(() => {
	getSchedule()
}, []);

    const [inpval, setINP] = useState({
        course: "",
        trainer_name: "",
        date: new Date(),
        starting_time: "",
        ending_time: "",
        fee_amount: 0,
        disc_amount: 0,
        batch_size: 0,
      });
    
      const setData = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
    
        setINP((preValue) => {
          return {
            ...preValue,
            [name]: value,
          };
        });
      };
    
      const setSchedule = async (e) => {
        e.preventDefault();
        const {
          course,
          trainer_name,
          date,
          starting_time,
          ending_time,
          fee_amount,
          disc_amount,
          batch_size
        } = inpval
    
        console.log(inpval)
    
        const res = await fetch("/api/users/dashboard/schedule", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            course,
            trainer_name,
            date,
            starting_time,
            ending_time,
            fee_amount,
            disc_amount,
            batch_size
          })
        })
    
        const data= await res.json()
        console.log(data)
        console.log(res.status)
    
        if(res.status === 422 || !data){
            alert('error ')
            console.log('error')
        }
        else{
            alert('data added successfully')
        }
      }


      const updateSchedule = async(e)=>{
          e.preventDefault()
          const {
            course,
            trainer_name,
            date,
            starting_time,
            ending_time,
            fee_amount,
            disc_amount,
            batch_size
          } = inpval
          const res2= await fetch(`/api/users/dashboard/updateSchedule/${id}`, {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                course,
            trainer_name,
            date,
            starting_time,
            ending_time,
            fee_amount,
            disc_amount,
            batch_size
              })

          })

          const data2 = await res2.json()
          console.log(data2)

          if(res2.status==422 || !data2){
              alert("please fill the data")
          } else{
              alert("data is updated")
          }
      }


    return (
        <form className="mt-4 mx-2 needs-validation" novalidate>
          <div className="row">
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label for="validationTooltip01">Course</label>
              <input
                type="text"
                name="course"
                value={inpval.course}
                onChange={setData}
                className="form-control"
                id="validationTooltip01"
                placeholder="First name"
                required
              />
            </div>
            <div className=" mb-3 col-lg-6 col-md-6 col-12">
              <label for="validationTooltip02">Trainer's name</label>
              <input
                type="text"
                className="form-control"
                name="trainer_name"
                value={inpval.trainer_name}
                onChange={setData}
                id="validationTooltip02"
                placeholder="Trainer's name"
                required
              />
            </div>
            <div className=" mb-3 col-lg-6 col-md-6 col-12">
              <label for="validationTooltip02">Date(s)</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={inpval.date}
                onChange={setData}
                id="validationTooltip02"
                placeholder="Date(s)"
                required
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label for="validationTooltip02">Start time</label>
              <input
                type="text"
                className="form-control"
                value={inpval.starting_time}
                name="starting_time"
                onChange={setData}
                id="validationTooltip02"
                placeholder="start time"
                required
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label for="validationTooltip02">End time</label>
              <input
                type="text"
                className="form-control"
                name="ending_time"
                value={inpval.ending_time}
                onChange={setData}
                id="validationTooltip02"
                placeholder="end time"
                required
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label for="validationTooltip02">Fee amount</label>
              <input
                type="number"
                className="form-control"
                name="fee_amount"
                value={inpval.fee_amount}
                onChange={setData}
                id="validationTooltip02"
                placeholder="fee amount"
                required
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label for="validationTooltip02">Discount amount</label>
              <input
                type="number"
                className="form-control"
                name="disc_amount"
                value={inpval.disc_amount}
                onChange={setData}
                id="validationTooltip02"
                placeholder="discount amount"
                required
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label for="validationTooltip02">Batch size</label>
              <input
                type="number"
                className="form-control"
                name="batch_size"
                onChange={setData}
                value={inpval.batch_size}
                id="validationTooltip02"
                placeholder="batch size"
                required
              />
            </div>
          </div>
          <button className="btn btn-primary" onClick={updateSchedule} type="submit">
            Submit form
          </button>
        </form>
      );
}

export default Edit;

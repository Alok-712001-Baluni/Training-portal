import React, {useState, useEffect} from "react";
// import "./Details.css";
import { useParams } from "react-router-dom";
const Traineredit = () => {


    const {id} = useParams("")
    // const [getScheduleData, setScheduleData] = useState([])
	// console.log(getScheduleData)

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
				setINP(data)
			console.log("got individual Trainer")
		}
	}
	
useEffect(() => {
	getTrainer()
}, []);

    const [inpval, setINP] = useState({
        name: "",
        qualif: "",
        short_desc: "",
        yoe: 0
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
    
      const setTrainer = async (e) => {
        e.preventDefault();
        const {
        name,
        qualif,
        short_desc,
        yoe
            
        } = inpval
    
        console.log(inpval)
    
        const res = await fetch("/api/users/dashboard/trainer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name,
            qualif,
            short_desc,
            yoe
         })
        })
    
        const data= await res.json()
        console.log(data)
        console.log(res.status)
    
        if(res.status === 422 || !data){
            alert('error ')
            console.log('error')
        }else{
            alert('Trainer edited successfully')
        }
      }


      const updateTrainer = async(e)=>{
          e.preventDefault()
          const {
            name,
            qualif,
            short_desc,
            yoe
          } = inpval
          const res2= await fetch(`/api/users/dashboard/updateTrainer/${id}`, {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name,
                qualif,
                short_desc,
                yoe
              })

          })

          const data2 = await res2.json()
          console.log(data2)

          if(res2.status==422 || !data2){
              alert("please fill the data")
          } else{
              alert("Trainer is updated")
          }
      }


    return (
        <form className="mt-4 mx-2 needs-validation" novalidate>
          <div className="row">
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label for="validationTooltip01">Trainer's name</label>
              <input
                type="text"
                name="name"
                value={inpval.name}
                onChange={setData}
                className="form-control"
                id="validationTooltip01"
                placeholder="trainer's name"
                required
              />
            </div>
            <div className=" mb-3 col-lg-6 col-md-6 col-12">
              <label for="validationTooltip02">Qualification</label>
              <input
                type="text"
                className="form-control"
                name="qualif"
                value={inpval.qualif}
                onChange={setData}
                id="validationTooltip02"
                placeholder="qualification"
                required
              />
            </div>
            <div className=" mb-3 col-lg-6 col-md-6 col-12">
              <label for="validationTooltip02">Short description</label>
              <input
                type="text"
                className="form-control"
                name="short_desc"
                value={inpval.short_desc}
                onChange={setData}
                id="validationTooltip02"
                placeholder="short description"
                required
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label for="validationTooltip02">Years of experience</label>
              <input
                type="number"
                className="form-control"
                value={inpval.yoe}
                name="yoe"
                onChange={setData}
                id="validationTooltip02"
                placeholder="years of experience"
                required
              />
            </div>


          </div>
          <button className="btn btn-primary" onClick={updateTrainer} type="submit">
            Submit form
          </button>
        </form>
      );
}

export default Traineredit;

import React, {useState, useEffect} from "react";
import "./Details.css";
import { useParams } from "react-router-dom";
const Courseedit = () => {


    const {id} = useParams("")
    // const [getScheduleData, setScheduleData] = useState([])
	// console.log(getScheduleData)

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
				setINP(data)
			console.log("got individual course")
		}
	}
	
useEffect(() => {
	getCourse()
}, []);

    const [inpval, setINP] = useState({
    course: "",
    desc: "",
    cat: "",
    int_aud: "",
    benefits: "",
    trainer_name: ""
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
    
      const setCourse = async (e) => {
        e.preventDefault();
        const {
    course,
    desc,
    cat,
    int_aud,
    benefits,
    trainer_name
        } = inpval
    
        console.log(inpval)
    
        const res = await fetch("/api/users/dashboard/course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            course,
            desc,
            cat,
            int_aud,
            benefits,
            trainer_name
         })
        })
    
        const data= await res.json()
        console.log(data)
        console.log(res.status)
    
        if(res.status === 422 || !data){
            alert('error ')
            console.log('error')
        }else{
            alert('Course edited successfully')
        }
      }


      const updateCourse = async(e)=>{
          e.preventDefault()
          const {
            course,
            desc,
            cat,
            int_aud,
            benefits,
            trainer_name
          } = inpval
          const res2= await fetch(`/api/users/dashboard/updateCourse/${id}`, {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                course,
                desc,
                cat,
                int_aud,
                benefits,
                trainer_name
              })

          })

          const data2 = await res2.json()
          console.log(data2)

          if(res2.status==422 || !data2){
              alert("please fill the data")
          } else{
              alert("Course is updated")
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
                placeholder="course name"
                required
              />
            </div>
            <div className=" mb-3 col-lg-6 col-md-6 col-12">
              <label for="validationTooltip02">Description</label>
              <input
                type="text"
                className="form-control"
                name="desc"
                value={inpval.desc}
                onChange={setData}
                id="validationTooltip02"
                placeholder="description"
                required
              />
            </div>
            <div className=" mb-3 col-lg-6 col-md-6 col-12">
              <label for="validationTooltip02">Category</label>
              <input
                type="text"
                className="form-control"
                name="cat"
                value={inpval.cat}
                onChange={setData}
                id="validationTooltip02"
                placeholder="category"
                required
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label for="validationTooltip02">Intended audience</label>
              <input
                type="text"
                className="form-control"
                value={inpval.int_aud}
                name="int_aud"
                onChange={setData}
                id="validationTooltip02"
                placeholder="Intended audience"
                required
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label for="validationTooltip02">Benefits</label>
              <input
                type="text"
                className="form-control"
                name="benefits"
                value={inpval.benefits}
                onChange={setData}
                id="validationTooltip02"
                placeholder="benefits"
                required
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label for="validationTooltip02">Trainer's name</label>
              <input
                type="text"
                className="form-control"
                name="trainer_name"
                value={inpval.trainer_name}
                onChange={setData}
                id="validationTooltip02"
                placeholder="trainer name"
                required
              />
            </div>

          </div>
          <button className="btn btn-primary" onClick={updateCourse} type="submit">
            Submit form
          </button>
        </form>
      );
}

export default Courseedit;

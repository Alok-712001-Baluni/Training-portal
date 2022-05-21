import React, {useState} from 'react'

const CreateCourse= ()=>{
    const [inpval, setINP] = useState({
    course: "",
    desc: "",
    cat: "",
    int_aud: "",
    benefits: "",
    trainer_name: ""
      });
    
      const setCourse = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
    
        setINP((preValue) => {
          return {
            ...preValue,
            [name]: value,
          };
        });
      };



      const submitCourse = async (e) => {
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
            alert('Course added successfully')
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
          onChange={setCourse}
          className="form-control"
          id="validationTooltip01"
          placeholder="Course name"
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
          onChange={setCourse}
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
          onChange={setCourse}
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
          onChange={setCourse}
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
          onChange={setCourse}
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
          onChange={setCourse}
          id="validationTooltip02"
          placeholder="Trainer's name"
          required
        />
      </div>

      
    </div>
    <button className="btn btn-primary" type="submit" onClick={submitCourse}>
      Submit form
    </button>
  </form>
    )
}

export default CreateCourse
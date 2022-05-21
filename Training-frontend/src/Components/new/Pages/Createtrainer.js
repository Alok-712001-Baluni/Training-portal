import React, {useState} from 'react'

const CreateTrainer= ()=>{
    const [inpval, setINP] = useState({
    name: "",
    qualif: "",
    short_desc: "",
    yoe: 0
      });
    
      const setTrainer = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
    
        setINP((preValue) => {
          return {
            ...preValue,
            [name]: value,
          };
        });
      };



      const submitTrainer = async (e) => {
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
            alert('Trainer added successfully')
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
          onChange={setTrainer}
          className="form-control"
          id="validationTooltip01"
          placeholder="Trainer's name"
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
          onChange={setTrainer}
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
          onChange={setTrainer}
          id="validationTooltip02"
          placeholder="Short description"
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
          onChange={setTrainer}
          id="validationTooltip02"
          placeholder="years of experience"
          required
        />
      </div>


      
    </div>
    <button className="btn btn-primary" type="submit" onClick={submitTrainer}>
      Submit form
    </button>
  </form>
    )
}

export default CreateTrainer
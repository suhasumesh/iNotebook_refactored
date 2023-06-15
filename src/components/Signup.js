import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup =  () => {
    const [credentials, setCredentials] = useState({name:"",email: "", password: ""}) 
    let navigate = useNavigate(); 
    // const URL = process.env.REACT_APP_SERVER_DB;
    const URL = "http://localhost:5000"
    const submitHandler = async (e)=>{
        const {name,email,password} = credentials;
        e.preventDefault();
        const response = await fetch(`${URL}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json() 
        console.log(json);
        if (json.success){
            localStorage.setItem('token', json.authtoken);
            navigate("/login");

        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
      <div>
        <form onSubmit={submitHandler}>
  <div className="mb-3 my-4" >
  <h2>Create an Account to use iNotebook</h2>
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" value={credentials.name} aria-describedby="emailHelp" onChange={onChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5}   required />
  </div>
  {/* <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Confirm-Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name="cpassword" />
  </div> */}
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      </div>
    )
}

export default Signup

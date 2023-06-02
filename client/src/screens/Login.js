import React , {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Login() {
  const [credentials, setcredentials]=useState({email:"",password:""})
  let navigate = useNavigate()
    const handleSubmit = async (e) => {
    e.preventDefault(); //synthetiv event
    console.log(JSON.stringify({email: credentials.email, password: credentials.password}));
    const response = await fetch("/api/loginuser", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})

    });
    const json = await response.json()
    console.log(json);
    if(!json.success) {
        alert("Enter Valid Credentials");
    }
    if(json.success) {
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/");
  }

   

}
const onChange=(event)=> {
    setcredentials({...credentials,[event.target.name]:event.target.value})
}
  return (
    <div
    style={{
      backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
      backgroundSize: 'cover',
      height: '100vh',
    }}
  >
    <div>
      <Navbar />
    </div>
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="container">
        <form
          className="w-50 border rounded p-5 bg-dark text-white"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              id="exampleInputPassword1"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">
            I'm a new user
          </Link>
        </form>
      </div>
    </div>
  </div>
    
  )
}

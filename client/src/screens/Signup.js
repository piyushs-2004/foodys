import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar'



export default function Signup() {
  let navigate = useNavigate()

    const [credentials, setcredentials]=useState({name:"",email:"",password:"",geolocation:""})
    const handleSubmit = async (e) => {
    e.preventDefault(); //synthetiv event
    const response = await fetch("/api/createuser", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })

    });
    const json = await response.json()
    console.log(json);
    if(!json.success) {
        alert("Enter Valid Credentials");
    }
    else {
      
      navigate("/login")
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
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={credentials.name}
                onChange={onChange}
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                name="geolocation"
                value={credentials.geolocation}
                id="exampleInputPassword1"
                onChange={onChange}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
              <Link to="/login" className="btn btn-danger">
                Already A User
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

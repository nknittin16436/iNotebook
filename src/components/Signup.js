import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {

    let navigate=useNavigate();
    const [credentials, setCredentials] = useState({name:'',email:'',password:''})
     const handleSubmit = async (e) => {
         e.preventDefault();
 
         const response = await fetch('http://localhost:5000/api/auth/createuser', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({ name:credentials.name ,email: credentials.email, password:credentials.password })
         });
 
         const json = await response.json();
         console.log(json);
 
         if(json.success){
             // REDIRECT TO HOME
             props.showAlert("Account created Successful","success");
             localStorage.setItem("token",json.authToken);
             navigate('/login');
         }
         else{
             props.showAlert("Invalid Credentials","danger");
         }
     }
 
     const onChange = (e) => {
         setCredentials({...credentials,[e.target.name]:e.target.value})
     }
 
    return (
        <div className='container mt-3'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control w-25" id="name" name='name' onChange={onChange}  aria-describedby="nameHelp" placeholder="Enter your name" required minLength={3}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control w-25" id="email" name='email' onChange={onChange}  aria-describedby="emailHelp" placeholder="Enter email" required minLength={5}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control w-25" id="password"  name='password' onChange={onChange} placeholder="Password" required minLength={5}/>
                </div>
                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>
        </div>
    )
}

export default Signup
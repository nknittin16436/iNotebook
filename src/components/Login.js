import React ,{useState}from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    let navigate=useNavigate();
   const [credentials, setCredentials] = useState({email:'',password:''})
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password:credentials.password })
        });

        const json = await response.json();
        console.log(json);

        if(json.success){
            // REDIRECT TO HOME
            props.showAlert("Login succesfull","success");
            localStorage.setItem("token",json.authToken);
            navigate('/');
        }
        else{
            props.showAlert("Invalid credentials","danger");
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }


    return (
        <div className='container mt-3'>
            <h1>Login to use iNotebook</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control w-25" id="email" name='email' value={credentials.email}  onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />

                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control w-25" id="password" name='password' value={credentials.password} onChange={onChange} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary my-3" >Submit</button>
            </form>
        </div>
    )
}

export default Login
import './Login.css'

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


function Login()
{
    let userCred={};

    let navigate = useNavigate();

    let form = useRef();
    let [error,setError] = useState('');

    function readValue(property,value){
        userCred[property] = value;
        console.log(userCred);
    }

    function Login()
    {
        fetch("http://localhost:8000/users/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"

            },
            body:JSON.stringify(userCred)
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            if(data.success===true)
            {
                // data.profile="all"
                localStorage.setItem("notflix_loggedin",JSON.stringify(data));
                // console.log(data.token);
                navigate('/homepage');
            }
            else{
                console.log(data);
                setError(data.message)

            }
            form.current.reset();
        })

        .catch((err)=>{
            console.log(err.message);
            setError(err.message)
        })


    }


    return (
        <div className='Login'>
            <div className='welcome_banner'>
                <h1>welcome to notflix </h1>
            </div>
            <form className="container" ref={form}>

                <input type="email" className="form-control" placeholder="Email" onChange={(event)=>{
                    readValue("email",event.target.value)

                }}/>

                <input type="password" className="form-control" placeholder="Password" onChange={(event)=>{
                    readValue("password",event.target.value)
                }}/>

                <div className='error_msg'>
                    <small>{error}</small>
                </div>
                
                <div className='login_btn'>
                    
                    <button type='button' className="btn btn-danger" onClick={Login}>Login</button>

                    <Link to="/register" type='button' className="btn btn-danger">Register</Link>

                </div>

            </form>
        </div>
    )
}

export default Login;
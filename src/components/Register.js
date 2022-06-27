import { useRef } from "react";
// import { Link } from 'react-router-dom';

function Register()
{

    let user={};

    let form = useRef();
    function readValue(property,value){
        user[property] = value;
        console.log(user);
    }

    function register()
    {
        fetch("http://localhost:8000/users/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"

            },
            body:JSON.stringify(user)
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            form.current.reset();
        })
        .catch((err)=>{
            console.log(err);
        })


    }


    return (
        <div className="Login">
            <div className='welcome_banner'>
                <h1>Notflix Registration </h1>
            </div>
            <form className="container" ref={form}>

                <input type="text" className="form-control" placeholder="Name" onChange={(event)=>{
                    readValue("name",event.target.value)
                }}/>

                <input type="email" className="form-control" placeholder="Email" onChange={(event)=>{
                    readValue("email",event.target.value)

                }}/>

                <input type="password" className="form-control" placeholder="Password" onChange={(event)=>{
                    readValue("password",event.target.value)
                }}/>

                <input type="text" className="form-control" placeholder="Contact" onChange={(event)=>{
                    readValue("contact",event.target.value)

                }}/>

                <input type="text" className="form-control" placeholder="City" onChange={(event)=>{
                    readValue("city",event.target.value)
                }}/>

                <input type="number" className="form-control" placeholder="Pincode" onChange={(event)=>{
                    readValue("pincode",event.target.value)
                }}/>

                <button to="/login" type='button' className="btn btn-danger" onClick={register}>Register</button>

            </form>
        </div>
    )
    
}

export default Register
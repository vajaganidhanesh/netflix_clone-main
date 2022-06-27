import { Navigate } from "react-router-dom";

function Protect(props)
{
    let token = JSON.parse(localStorage.getItem("notflix_loggedin"));

    return token !==null ? props.children : <Navigate to={'/login'}/>
}

export default Protect;
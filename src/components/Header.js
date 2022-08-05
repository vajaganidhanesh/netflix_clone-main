import { useEffect, useState } from "react"
import { Link,useNavigate } from 'react-router-dom';
import './header.css'

function Header()
{
    let [movies,setMovies] = useState([]);
    let [filteredMovies,setFilteredMovies] = useState([]);
    let [searchAreaVisible,setSearchAreaVisible] = useState(false);
    let [user,setUser] = useState({});
    let [menuVisible,setMenuVisible] = useState(false);
    let navigate = useNavigate();

    // to get single movie information
    useEffect(()=>{
        
        let token = JSON.parse(localStorage.getItem("notflix_loggedin")).token;


        fetch("http://localhost:8000/movies",{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            setMovies(data)
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);


    // to get user info

    useEffect(()=>{
        let token = JSON.parse(localStorage.getItem("notflix_loggedin")).token;
        let user_id = JSON.parse(localStorage.getItem("notflix_loggedin")).user_id;

        fetch(`http://localhost:8000/users/${user_id}`,{
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            setUser(data.user)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    function searchMovies(name)
    {
        if(name!=="")
        {
            let searchedMovie = movies.filter((movie,index)=>{
                return movie.name.toUpperCase().includes(name.toUpperCase())
            })
            setFilteredMovies(searchedMovie);
        }
        else{
            setFilteredMovies([]);

        }
    }

    function logOut(){
        localStorage.removeItem("notflix_loggedin");
        navigate('/login')
    }

    let [navtoggle,setNavtoggle] =useState(false);

    function navbar(){

    if(navtoggle===false){
        document.getElementById("nav_links").style.height="auto";
        document.getElementById("icon").classList.remove("fa-bars");
        document.getElementById("icon").classList.add("fa-xmark");

        setNavtoggle(true);
    }
    else{
        document.getElementById("nav_links").style.height="0px";
        document.getElementById("icon").classList.remove("fa-xmark");
        document.getElementById("icon").classList.add("fa-bars");
        setNavtoggle(false);
    }
}

    return(
        <div>
            <header className='header'>
                <div className='navibar'>
                    <div className='not_logo' onClick={()=>{
                            navigate('/homepage')
                        }}>
                        <h2>NOTFLIX</h2>
                        <div className="mobile">
                            <i className="fa-solid fa-bars" id="icon" onClick={()=>{
                                navbar();
                            }}></i>
                        </div>
                    </div>
                    <div className='nav_links nav_container'>
                        <ul className="navb_links" id="nav_links">
                            <li className='nav_link'>Home</li>
                            <li className='nav_link'>Tv Shows</li>
                            <li className='nav_link'>Movies</li>
                            <li className='nav_link'>Recently Added</li>
                            <li className='nav_link'>My List</li>
                            <li className='nav_input'>
                                <input className=' form-control' type="text" placeholder="Search" 
                                onChange={(event)=>{
                                    searchMovies(event.target.value)
                                }}
                                onFocus={()=>{setSearchAreaVisible(true)}} 
                                onBlur={()=>{
                                    if(filteredMovies.length === 0)
                                    {
                                        setSearchAreaVisible(false)
                                    }
                                }} 
                                    />
                            </li>
                            <li><i className="fa-solid fa-user" 
                                onClick={()=>{
                                if(menuVisible === false)
                                {
                                    setMenuVisible(true)
                                }
                                else
                                {
                                    setMenuVisible(false)
                                }
                                }}></i>
                            </li>
                        </ul>
                    </div>
                </div>

                {
                    menuVisible===true?
                    (
                        <div className="user_details">
                            <ul>
                                <li onClick={logOut}>logout</li>
                            </ul>
                        </div>
                    ):null
                }
                    
                
            </header>

            {
                searchAreaVisible === true?
                (
                    <div className="search_details">
                        {
                            filteredMovies.length!==0?
                            (
                                <section className='TrendingMovies_section'>
                                    <div className='section_heading'>Last Searched Movies</div>
                                        <div className='trending_cards'>
                                            {
                                                filteredMovies.map((movie,index)=>{
                                                    return(
                                                    
                                                        <div className='trend_card' key={index}>
                                                            <div className='card_image'>
                                                                <img className='banner_img card_img' src={movie.posterURL} alt={movie.name}/>
                                                            </div>
                                                            <div className='card_details'>
                                                                <div className='card_title'>
                                                                    <span className='movie_name'>{movie.name}</span>
                                                                    <div>
                                                                        <span className='movie_names me-3'>{movie.genre}</span>
                                                                        <span className='movie_names'>Rating : {movie.imdbRating}</span>
                                                                    </div>
                    
                                                                    
                                                                </div>
                                                                <div className='card_values'>          
                                                                    <Link to={"/player/"+movie._id} 
                                                                    onClick={()=>{
                                                                        setFilteredMovies([]);
                                                                        setSearchAreaVisible(false);
                                                                    }}
                                                                    className='btn btn-danger'><i className="fa-solid fa-play"></i></Link>   
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                    
                                                    )
                                                })
                                            }
                                        </div>
                                </section>   
                            ):
                            (
                                <div className="warning_message">
                                    
                                    <p>Please search for Something or write correct name</p>
                                </div>
                            )
                        }
                    </div>
                ):
                null
            }
        </div>
    )
}

export default Header
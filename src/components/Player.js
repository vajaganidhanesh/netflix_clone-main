import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import './HomePage.css'

// custom components

import Header from "./Header";
import Footer from "./Footer";

function Player()
{

    let params = useParams();
    let [movie,setMovie] = useState({});
    let [playing,setPlaying] = useState(false);
    let [userMovie,setUserMovie] = useState({})
    let videoPlayer = useRef();

    

    useEffect(()=>{

        let token = JSON.parse(localStorage.getItem("notflix_loggedin")).token;


        fetch(`http://localhost:8000/movies/${params.id}`,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);

            setMovie(data);
            
        })
        .catch((err)=>{
            console.log(err);
        })
    },[params.id])

    useEffect(()=>{
        if(playing===true)
        {
            videoPlayer.current.currentTime = userMovie.watched;
        }
    },[playing])

    function play()
    {
        let token = JSON.parse(localStorage.getItem("notflix_loggedin")).token;
        let user_id = JSON.parse(localStorage.getItem("notflix_loggedin")).user_id;

        fetch("http://localhost:8000/users/play",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body:JSON.stringify({movie:movie._id,user:user_id})
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            if(data.success === true)
            {
                setUserMovie(data.user_movie);  
                setPlaying(true)
                
            }            
        })
        .catch((err)=>{
            console.log(err);
        })

    }

    function closePlayer()
    {

        let token = JSON.parse(localStorage.getItem("notflix_loggedin")).token;
        let watched = videoPlayer.current.currentTime;
        fetch(`http://localhost:8000/users/closeplayer/${userMovie._id}`,{
            method:"PUT",
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body:JSON.stringify({watched:watched})
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            if(data.success === true)
            { 
                setPlaying(false);
            }            
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <div>
            <Header/>

            {/* about the movie details */}
            {
                playing===false?
                (
                    <section className='banner_section'>
                        <div className='banner_img'>
                            <img className='banner_img' src={movie.posterURL} alt={movie.name}/>
                            <div className='banner_details'>
                                <h1 className='banner_title'>{movie.name}</h1>
                                <div className='movie_details'>
                                    {console.log(movie.name)}
                                    <ul> 
                                        <li><i className="fa-solid fa-film"></i> {movie.genre}</li>
                                        <li><i className="fa-solid fa-calendar"></i> {movie.releaseDate}</li>
                                        <li><i className="fa-solid fa-business-time"></i> {movie.runtime}</li>
                                    
                                    </ul>
                                </div>
                                <div className='banner_description'>
                                    
                                </div>

                                <div className='banner_btns'>

                                    <button className='btn btn-danger'
                                    onClick={()=>

                                        {play()}} 
                                    ><i className="fa-solid fa-play me-3"></i>PLAY NOW</button>
                                    <button className='btn btn-secondary'><i className="fa-solid fa-plus me-3"></i>MY LIST</button>

                                </div>
                            </div>
                        </div>
                    </section>
                )
                :
                (
                    
                    <section className="player">

                        <div className="close">
                            <h4>
                                {movie.name}
                            </h4>

                            <i className="fa-solid fa-circle-xmark close_btn"
                            onClick={()=>{closePlayer()}}
                            ></i>

                        </div>

                        <video ref={videoPlayer} className="video_player" controls autoPlay>

                            <source src={`http://localhost:8000/movies/stream/${movie._id}`}/>
                            
                        </video>

                    </section>
                )
            }


            {/* description area for movie */}
            <div className="about_movie">
                 <div className="movie_description">
                     <h2><i className="fa-solid fa-audio-description"></i>Description </h2>
                     <p>{movie.description}</p>
                 </div>
                <div>
                    <h2><i className="fa-solid fa-star-half-stroke"></i>Rating : {movie.imdbRating}</h2>
                

                </div>
            </div>

            <Footer/>

        </div>

    )
}
export default Player;
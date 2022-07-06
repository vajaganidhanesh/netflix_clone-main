import './HomePage.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

// custom compontents
import Header from './Header';
import Footer from './Footer';
function HomePage()
{

    let [top,setTop] = useState({});
    let [trending,setTrending] = useState([]);
    let [action,setAction] = useState([]);
    let [drama,setDrama] = useState([]);

    useEffect(()=>{

        let token = JSON.parse(localStorage.getItem("notflix_loggedin")).token;


        fetch("http://localhost:8000/movies",{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            let trending = data.sort((a,b)=>{
                return b.watchers - a.watchers;
            }).slice(0,5);

            setTrending(trending)

            let top = data.find((value,index)=>{
                return value.top === true;
                
            })

            setTop(top);

            let action = data.filter((value,index)=>{
                return value.genre.toUpperCase().includes("action".toUpperCase());
            })

            setAction(action);

            let drama = data.filter((value,index)=>{
                return value.genre.toUpperCase().includes("Drama".toUpperCase());
            })

            setDrama(drama);

            

           
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    return(
        <div>
            {/*  navigation bar component */}
            
            <Header/>

            {/*  jsx for banner section*/}

            <section className='banner_section'>
                <div className='banner_img'>
                    <img className='banner_img' src={top.posterURL} alt={top.name}/>
                    <div className='banner_details'>
                        <h1 className='banner_title'>{top.name}</h1>
                        <div className='movie_details'>
                            
                            <ul>  
                                <li><i className="fa-solid fa-film"></i> {top.genre}</li>
                                <li><i className="fa-solid fa-calendar"></i> {top.releaseDate}</li>
                                <li><i className="fa-solid fa-star-half-stroke"></i> : {top.imdbRating}</li>
                                <li><i className="fa-solid fa-business-time"></i> {top.runtime}</li>
                             
                            </ul>
                        </div>
                        <div className='banner_description'>
                            {top.description}
                        </div>

                        <div className='banner_btns'>

                            <Link to={"/player/"+top._id} className='btn btn-danger'><i className="fa-solid fa-play me-3"></i>Play Now</Link>   

                            <button className='btn btn-secondary'><i className="fa-solid fa-plus me-3"></i>MY LIST</button>

                        </div>
                    </div>
                </div>
            </section>

            {/* jsx for cards for trending */}
            
            <section className='TrendingMovies_section'>
                <div className='section_heading'>Trending Movies</div>
                <div className='trending_cards'>
                    {
                        trending.map((movie,index)=>{
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
                                            <Link to={"/player/"+movie._id} className='btn btn-danger'><i className="fa-solid fa-play"></i></Link>   
                                        </div>

                                    </div>
                                </div>
                            
                            )
                        })
                    }
                    </div>
            </section>

            {/* jsx for action for trending */}
            
            <section className='TrendingMovies_section'>
                <div className='section_heading'>Action Movies</div>
                <div className='trending_cards'>
                    {
                        action.map((movie,index)=>{
                            return(
                            
                                <div className='trend_card' key={index}>
                                    <div className='card_image'>
                                        <img className='banner_img card_img' src={movie.posterURL} alt={movie.img}/>
                                    </div>
                                    <div className='card_details'>
                                        <div className='card_title'>
                                            <span className='movie_name'>{movie.name}</span>
                                            <div>
                                                <span className='movie_names me-3'>{movie.genre}</span>
                                                <span className='movie_names'>imdbRating : {movie.imdbRating}</span>
                                            </div>

                                            
                                        </div>
                                        <div className='card_values'>          
                                            <Link to={"/player/"+movie._id} className='btn btn-danger'><i className="fa-solid fa-play"></i></Link>   
  
                                        </div>

                                    </div>
                                </div>
                            
                            )
                        })
                    }
                    </div>
            </section>

           
            

            {/* jsx for Drama section */}
            <section className='TrendingMovies_section'>
                <div className='section_heading'>Drama Movies</div>
                <div className='trending_cards'>
                    {
                        drama.map((movie,index)=>{
                            return(
                            
                                <div className='trend_card' key={index}>
                                    <div className='card_image'>
                                        <img className='banner_img card_img' src={movie.posterURL} alt={movie.name}/>
                                    </div>
                                    <div className='card_details'>
                                        <div className='card_title'>
                                            <span className='movie_name'>{movie.name}</span>
                                            <div>
                                                <span className='movie_names me-2'>{movie.genre}</span>
                                                <span className='movie_names'> imdbRating : {movie.imdbRating}</span>
                                            </div>

                                            
                                        </div>
                                        <div className='card_values'>          
                                            <Link to={"/player/"+movie._id}  className='btn btn-danger'><i className="fa-solid fa-play"></i></Link>   
   
                                        </div>

                                    </div>
                                </div>
                            
                            )
                        })
                    }
                    </div>
            </section>

            {/* jsx for heroics section */}
            {/* <section className='TrendingMovies_section'>
                <div className='section_heading'>Heroic Movies</div>
                <div className='trending_cards'>
                    {
                        superhero.map((movie,index)=>{
                            return(
                            
                                <div className='trend_card' key={index}>
                                    <div className='card_image'>
                                        <img className='banner_img card_img' src={movie.posterURL} alt={movie.name}/>
                                    </div>
                                    <div className='card_details'>
                                        <div className='card_title'>
                                            <span className='movie_name'>{movie.name}</span>
                                            <div>
                                                <span className='movie_names me-2'>{movie.genre}</span>
                                                <span className='movie_names'> Rating : {movie.imdbRating}</span>
                                            </div>

                                            
                                        </div>
                                        <div className='card_values'>          
                                        <Link to={"/player/"+movie._id}  className='btn btn-danger'><i className="fa-solid fa-play"></i></Link>   
   
                                        </div>

                                    </div>
                                </div>
                            
                            )
                        })
                    }
                    </div>
            </section> */}

            <div className='section_divider'>

            </div>

            {/* footer component*/}
            
            <Footer/>
        </div>
    )
}

export default HomePage;
import React, { useEffect, useState } from 'react'
import "./Home.scss"
import axios from 'axios'
import { Link } from 'react-router-dom';
import {BiPlay} from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai";
const apiKey="94ebd9d882cf6c968da44ae92159858d";
const url="https://api.themoviedb.org/3/";
const imgurl="https://image.tmdb.org/t/p/original"
const upcoming="upcoming";
const nowPlaying="now_playing";
const popular="popular";
const topRated="top_rated";
const Card=({img})=>(
    <img className="card" src={img} alt="cover" />
)

const Row =({title,arr=[]})=>(
    <div className='row'>
        <h2>
            {title}
        </h2>
        <div>
            {
                arr.map((item,Index)=>(
                    <Card key={Index} img={`${imgurl}/${item.poster_path}`} />
                ))
            }
        </div>
        
    </div>
)

const Home = () => {
    const [upcomingmovies,setUpcomingmovies]=useState([]);
    const [nowplayingmovies,setNowplayingmovies]=useState([]);
    const [popularmovies,setPopularmovies]=useState([]);
    const [topratedmovies,setTopratedmovies]=useState([]);
    const [genre,setGenre]=useState([]);
    
    useEffect(()=>{
        const fetchData=async()=>{
            const {data:{results}}=await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
            setUpcomingmovies(results);
        };
        const fetchNowPlaying=async()=>{
            const {data:{results}}=await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
            setNowplayingmovies(results);
        };
        const fetchPopular=async()=>{
            const {data:{results}}=await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
            setPopularmovies(results);
        };
        const fetchTopRated=async()=>{
            const {data:{results}}=await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
            setTopratedmovies(results);
        };
        const getAllGenre=async()=>{
            const {
                data:{genres}
            }=await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
            setGenre(genres);
        };
        fetchData();
        fetchNowPlaying();
        fetchPopular();
        fetchTopRated();
        getAllGenre();
    },[])
  return (
    <section className="home">
        <div className="banner" style={{
            backgroundImage:popularmovies[0]?`url(${`${imgurl}/${popularmovies[0].poster_path}`})`:"none"
        }}>
            
            {
                popularmovies[0]&&
                (
                    <h1>{popularmovies[0].original_title}</h1>
                    
                )
            }
            {
                popularmovies[0]&&
                (
                    <p>{popularmovies[0].overview}</p>
                    
                )
            }
            <div>
            <button><BiPlay />Play</button>
            <button>My List<AiOutlinePlus/></button>
            </div>
            
        </div>
        <Row title={"Upcoming"} arr={upcomingmovies}/>
        <Row title={"Now Playing"} arr={nowplayingmovies}/>
        <Row title={"Popular"} arr={popularmovies}/>
        <Row title={"Top Rated"} arr={topratedmovies}/>
        <div className="genreBox">
            {
                genre.map((item)=>(
                    <Link key={item.id} to={`/genre/${item.id}`}>
                        {item.name}
                    </Link>
                ))
            }
        </div>
    </section>
  )
}

export default Home
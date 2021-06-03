import React , {Component, useContext, useState, useEffect, useRef} from 'react';
import './MyList.css';
import axios from 'axios';
import { AuthContext } from '../../context/GlobalContext';
import SeriesBox from '../SeriesBox';
import MovieBox from '../MovieBox';

const MyList =(props)=>{
    const auth=useContext(AuthContext);

    const [moviesOfUser,setMoviesOfUser]=useState([]);
    const [seriesOfUser,setSeriesOfUser]=useState([]);
    const [updatedMovieList,setUpdatedMovieList]=useState(0);
    const [updatedSeriesList,setUpdatedSeriesList]=useState(0);
    const [user,setUser]=useState(null);
    const isMounted=useRef(null);
    const [isLoading,setIsLoading]=useState(false);

    const uploadMovies=async()=>{
        await axios.get(`http://localhost:5000/movie/${user.id}`,{headers: {Authorization: localStorage.getItem('token')}}).then(resp=>{
            setMoviesOfUser(resp.data);
            setUpdatedMovieList(resp.data.length);
            setIsLoading(false);
            console.log(updatedMovieList);
        }).catch(err => console.log(err)).finally(() => {
           if (isMounted.current) {
             setIsLoading(false)
           }
        });  
    }

    const uploadSeries=async()=>{
        await axios.get(`http://localhost:5000/series/${user.id}`,{headers: {Authorization: localStorage.getItem('token')}}).then(resp=>{
            setSeriesOfUser(resp.data);
            setUpdatedSeriesList(resp.data.length);
            console.log(updatedSeriesList);
        })
    }

    useEffect(()=>{
        const getUser=async()=>{
            await axios.post('http://localhost:5000/users',{username:localStorage.getItem('username')}).then(resp=>{
                setUser(resp.data);
                setIsLoading(false)
            }).catch(err => console.log(err)).finally(() => {
                if (isMounted.current) {
                  setIsLoading(false)
                }
             }); 
        }
        getUser();
    },[])

    useEffect(()=>{
        if (user){
            console.log('My List - UploadMovies')
            uploadMovies();
        }
    },[user,updatedMovieList])

    useEffect(()=>{
        if(user){
            console.log('My List - UploadSeries')
            uploadSeries();
        }
    },[user,updatedSeriesList])

    

        return(
            <div className="myList-style-1">
                <div className="myList-style-2">My List</div>
                {(moviesOfUser.length>0 && seriesOfUser.length===0)?
                (<div>
                    <div className="myList-div-style-1">Movies</div>
                    <div className="myList-movies-series-style">
                    {moviesOfUser.map(movie=>{
                        var base64Buffer = new Buffer.from(movie.image, 'binary').toString('base64');
                        return(
                                <MovieBox key={movie.id} id={movie.id} description={movie.description} title={movie.name} duration={movie.duration} base64={base64Buffer} video={movie.video} newMovieList={(data)=>setUpdatedMovieList(data)} />
                        )
                    })}
                    </div>
                </div>): (moviesOfUser.length==0 && seriesOfUser.length>0 )?
                (<div>
                    <div className="myList-div-style-1">Series</div>
                    <div className="myList-movies-series-style">
                    {seriesOfUser.map(series=>{
                        var base64Buffer = new Buffer.from(series.image, 'binary').toString('base64');
                        return(
                                <SeriesBox key={series.id} id={series.id} description={series.description} title={series.title} numberOfSeasons={series.numberOfSeasons} base64={base64Buffer} video={series.video} newSeriesList={(data)=>setUpdatedSeriesList(data)} />
                        )
                    })}
                    </div>
                </div>):(moviesOfUser.length>0 && seriesOfUser.length>0) ?
                (<div>
                    <div>
                        <div className="myList-div-style-1">Movies</div>
                        <div className="myList-movies-series-style">
                        {moviesOfUser.map(movie=>{
                            var base64Buffer = new Buffer.from(movie.image, 'binary').toString('base64');
                            return(
                                <MovieBox key={movie.id} id={movie.id} description={movie.description} title={movie.name} duration={movie.duration} base64={base64Buffer} video={movie.video} newMovieList={(data)=>setUpdatedMovieList(data)}/>
                            )
                        })}
                        </div>
                    </div>
                    <div>
                        <div className="myList-div-style-1">Series</div>
                        <div className="myList-movies-series-style">
                        {seriesOfUser.map(series=>{
                            var base64Buffer = new Buffer.from(series.image, 'binary').toString('base64');
                            return(
                                <SeriesBox key={series.id} id={series.id} description={series.description} title={series.title} numberOfSeasons={series.numberOfSeasons} base64={base64Buffer} video={series.video} newSeriesList={(data)=>setUpdatedSeriesList(data)}/>
                            )
                        })}
                        </div>
                    </div>
                </div>):null}
            </div>
        )
    }

export default MyList;
import React ,{Component, useState, useEffect} from 'react';
import './Movies.css';
import axios from 'axios';
import MovieBox from '../MovieBox';


const  Movies =(props)=>{

    const [movies,setMovies]=useState([]);
    const [text,setText]=useState('');
    /*state={
        movies:[],
        text:''
    }*/


    useEffect(()=>{
        getAllMovies();
    },[])
    

    const getAllMovies=async()=>{
        await axios.get('http://localhost:5000/movie',{headers: {Authorization: localStorage.getItem('token')}}).then(resp=>{
            setMovies(resp.data);
            //console.log(this.state.movies);
        })
    }

    const onChangeSearch=(text)=>{
        setText(text,async()=>{
        if(text){
            await axios.get(`http://localhost:5000/movie/searchMovies/${text}`,{headers: {Authorization: localStorage.getItem('token')}}).then(resp=>{
            setMovies(resp.data)
            });
        }else{
            await axios.get('http://localhost:5000/movie',{headers: {Authorization: localStorage.getItem('token')}}).then(resp=>{
            new Promise(resolve => setTimeout(() => resolve(setMovies(resp.data)), 700)); 
            setMovies(resp.data)
        });
        }
    });
}
        return(
            <div className="movies-style1">
                    <div className="search">
                        <span className="fa fa-search"></span>
                         <input onChange={(text)=>onChangeSearch(text.currentTarget.value)} value={text} placeholder="Search.."/>
                    </div>
                    <div style={{ display: 'flex', flex: '1 1 auto', flexWrap: 'wrap' }}>
                    {movies.map(movie => {
                        var blob = new Blob([movie.image], { type: 'image/png' });
                        var base64Buffer = new Buffer.from(movie.image, 'binary').toString('base64');
                        return(<MovieBox key={movie.id} id={movie.id} description={movie.description} title={movie.name} duration={movie.duration} video={movie.video} base64={base64Buffer} newMovieList={()=>console.log()}/>)
                    })}
                    </div>
            </div>
        )
    }


export default Movies;
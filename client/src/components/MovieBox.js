import React,{Component, useState, useContext, useEffect, useCallback} from 'react';
import './MovieBox.css';
import axios from 'axios';
import { AuthContext } from '../context/GlobalContext';
import ReactPlayer from 'react-player';
import ReactStars from 'react-rating-stars-component';

const MovieBox =(props)=>{

    const [boxResize,setBoxResize]=useState(false);
    const [added2List,setAdded2List]=useState(localStorage.getItem(`${localStorage.getItem('userID')}${props.title}`))
    const [user,setUser]=useState(null);
    const [detailBoxState,setDetailBoxState]=useState(false);
    const [rateOfMovie,setRateOfMovie]=useState(Number(localStorage.getItem(`movieRate ${localStorage.getItem('userID')} ${props.id}`)));
    const [totalVotes,setTotalVotes]=useState(Number(localStorage.getItem(`numberOfVotes${props.id}`)));
    const [votesOfMovie,setVotesOfMovie]=useState(null);
    const [sumOfRatings,setSumOfRatings]=useState(0);
    const [percentageOfVotes,setPercentageOfVotes]=useState(0);
    const [movieArray,setMovieArray]=useState([]);
    const [useEffectState,setUseEffectState]=useState(true);
    
    const auth=useContext(AuthContext);

    const votesOfMovieData=async()=>{
        await axios.get(`http://localhost:5000/movie/getRatesOfMovie/${props.id}`).then(resp=>{
                setVotesOfMovie(resp.data);
        })
    }

    const findMoviesNewArray=async()=>{
        await axios.get(`http://localhost:5000/movie/${user.id}`,{headers: {Authorization: localStorage.getItem('token')}}).then(resp=>{
            //console.log('FindMoviesNewArray')
            setMovieArray([]);
            setMovieArray(resp.data);
            //console.log('movieArrayLength:'+ resp.data.length)
    })}


    const findPercentageOfVotes=async()=>{
        await axios.get(`http://localhost:5000/movie/getRatesOfMovie/${props.id}`).then(resp=>{
            setVotesOfMovie(resp.data);
        })
        if(votesOfMovie!==null){
            setSumOfRatings(0);
            var sum=0;
            votesOfMovie.movieHasRate.map(x=>sum=sum+x.rating);
            setSumOfRatings(sum);
            setPercentageOfVotes((sumOfRatings)/Number(localStorage.getItem(`numberOfVotes${props.id}`)))
        }
    }      

   useEffect(()=>{
    const findUser=async()=>{
        await axios.post('http://localhost:5000/users',{username:localStorage.getItem('username')}).then(resp=>{
            setUser(resp.data);
        });
    }
    findUser();
   },[]);

   useEffect(()=>{
      if(user){ 
            findMoviesNewArray()
      }
     
    },[user,added2List])


    useEffect(()=>{
        if(movieArray.length!==0 || movieArray.length===0 ){
            //console.log(movieArray.length)
            //console.log(movieArray)
           props.newMovieList(movieArray.length);
        }
    },[movieArray.length])


    useEffect (()=>{
        votesOfMovieData();

        const percentageOfVotesFunction=async()=>{
            if(votesOfMovie!==null){
                setSumOfRatings(0);
                votesOfMovie.movieHasRate.map(x=>setSumOfRatings(prevState=>prevState+x.rating));
                //console.log(`LAST: ${sumOfRatings}`);
                setPercentageOfVotes((sumOfRatings)/Number(localStorage.getItem(`numberOfVotes${props.id}`)))
                //console.log("percentageofVotes:"+percentageOfVotes);
        }
    }
        percentageOfVotesFunction();
    },[sumOfRatings,votesOfMovie!==null])


    const boxResizeByClicking=()=>{
        if(boxResize===false){
            setBoxResize(true);
        }   
    }

    const toggleUseEffect=()=>{
        if(useEffectState===true){
            setUseEffectState(false)
        }else{
            setUseEffectState(true)
        }
    }

    const add2List=async()=>{
        const userID=localStorage.getItem('userID');
        if(localStorage.getItem(`${localStorage.getItem('userID')}${props.title}`)==='yes'){
            await axios.delete(`http://localhost:5000/movie/delMovieFromUser/${userID}/${props.id}`,{headers: {Authorization: localStorage.getItem('token')}});
            setAdded2List('no');
            localStorage.setItem(`${localStorage.getItem('userID')}${props.title}`,'no');
            toggleUseEffect()
        }else{
            console.log(localStorage.getItem(`${localStorage.getItem('userID')}${props.title}`))
            await axios.post('http://localhost:5000/movie/add/addMoviesFromUser',{ userID:user.id, movieID:props.id}).then(resp=>{
                console.log(resp.data);
            })
            setAdded2List('yes');
            localStorage.setItem(`${localStorage.getItem('userID')}${props.title}`,'yes');
            toggleUseEffect();
        }
    }

    const detailBox=()=>{
        if(detailBoxState===true){
            setDetailBoxState(false);
        }else{
            setDetailBoxState(true);
        }
    }
   
    const setRate=async(setRate)=>{
        const rating=setRate*2;
        //localStorage.removeItem(`numberOfVotes${props.id}`)
        //localStorage.removeItem(`movieRate ${localStorage.getItem('userID')} ${props.id}`)
        if(!localStorage.getItem(`movieRate ${localStorage.getItem('userID')} ${props.id}`)){
            await axios.post('http://localhost:5000/movie/movieRate',{userID: user.id, movieID:props.id, rating:rating})
            const count=Number(localStorage.getItem(`numberOfVotes${props.id}`))+1;
            console.log(count);
            localStorage.setItem(`numberOfVotes${props.id}`, count);
            setTotalVotes(count);
            localStorage.setItem(`movieRate ${localStorage.getItem('userID')} ${props.id}`,setRate);
            setRateOfMovie(Number(localStorage.getItem(`movieRate ${localStorage.getItem('userID')} ${props.id}`)));
            findPercentageOfVotes();
        }else{
            await axios.post('http://localhost:5000/movie/updateRate',{userID: user.id, movieID:props.id, rating:rating})
            localStorage.setItem(`movieRate ${localStorage.getItem('userID')} ${props.id}`,setRate);
            setRateOfMovie(Number(localStorage.getItem(`movieRate ${localStorage.getItem('userID')} ${props.id}`)));
            findPercentageOfVotes();
        }
    }
        return(
            <div className="flex movieBox-outline">
                <div className="out-of-movieBox">
                {boxResize===true?
                 (<div onClick={()=>boxResizeByClicking()} onMouseLeave={()=>setBoxResize(false)}  className=" movieBox-reSized">
                        <img src={'data:image/jpeg;base64,' + props.base64} />  
                        <div className="title">{props.title}</div>
                        <div className="duration-plusButton-style">
                            <div className="duration" >Duration:{props.duration}min</div>
                            {added2List==='yes' ? (<div title="REMOVE FROM MY LIST" onClick={()=>add2List()} className="checkSymbol-style"><span style={{marginLeft:1}}>&#10003;</span></div> ):
                            (<div title="ADD TO MY LIST" onClick={()=>add2List()} className="plusButton"/>)}
                        </div>
                        <div onClick={()=>detailBox()} className="arrow"/>
        
                   </div>):(<div style={detailBoxState===true ? {border:"2px solid white"}: null } onClick={()=>boxResizeByClicking()} onMouseOut={()=>setBoxResize(false)}  className="movieBox-normal"><img src={'data:image/jpeg;base64,' + props.base64} /></div>)}
                   </div>
                   {detailBoxState===true ? (<div onMouseLeave={()=>setDetailBoxState(false)} className="detailBoxStyle-1">
                       <div className="detailBoxStyle-2">
                            <div className="detailBoxStyle-3">{props.title}</div>
                            <div className="detailBoxStyle-4"><span style={{fontSize:20}}>Description</span></div>
                            <div className="detailBoxStyle-5">{props.description}</div>
                            <div className="detailBoxStyle-6"><span style={{fontSize:20}}>Rating</span></div>
                            <div className="detailBoxStyle-7">Overall</div>
                            <div className="detailBoxStyle-8">{percentageOfVotes}/10</div>
                            <div style={{margin:10,display:"flex"}}>
                                <ReactStars
                                    key={props.id}
                                    classNames="reactStars-style"
                                    value={rateOfMovie}
                                    count={5}
                                    size={28}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                    onChange={(rate)=>setRate(rate)}
                                />
                                <span style={{marginTop:24,marginLeft:10}}>(Total: {totalVotes})</span>      
                            </div>
                        </div>
                      <ReactPlayer key={props.id}  width={1000} height={500} url={props.video} controls={true} /> 
                   </div>) : null}
                </div>
        )         
}        
export default MovieBox;





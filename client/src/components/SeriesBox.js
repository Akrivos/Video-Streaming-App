import React,{Component, Fragment, useState, useContext, useEffect} from 'react';
import './SeriesBox.css';
import axios from 'axios';
import { AuthContext } from '../context/GlobalContext';
import ReactPlayer from 'react-player';
import ReactStars from 'react-rating-stars-component';
import EpisodeBox from './EpisodeBox';

const SeriesBox=(props)=>{

    const auth=useContext(AuthContext);

    const [boxResize,setBoxResize]=useState(false);
    const [added2List,setAdded2List]=useState(localStorage.getItem(`${localStorage.getItem('userID')}${props.title}`))
    const [user,setUser]=useState(null);
    const [detailBoxState,setDetailBoxState]=useState(false);
    const [rateOfSeries,setRateOfSeries]=useState(Number(localStorage.getItem(`seriesRate ${localStorage.getItem('userID')} ${props.id}`)))
    const [totalVotes,setTotalVotes]=useState(Number(localStorage.getItem(`numberOfVotesForSeries${props.id}`)));
    const [votesOfSeries,setVotesOfSeries]=useState(null);
    const [sumOfRatings,setSumOfRatings]=useState(null);
    const [percentageOfVotes,setPercentageOfVotes]=useState(0);
    const [selectOverview,setSelectOverview]=useState(true);
    const [selectEpisodes,setSelectEpisodes]=useState(false);
    const [seasonNumber,setSeasonNumber]=useState(1);
    const [episodes,setEpisodes]=useState([]);
    const [selectSeason,setSelectSeason]=useState('Season 1');
    const [seriesArray,setSeriesArray]=useState([]);


    const findSeriesNewArray=async()=>{
        await axios.get(`http://localhost:5000/series/${user.id}`,{headers: {Authorization: localStorage.getItem('token')}}).then(resp=>{
            console.log('FindSeriesNewArray')
            setSeriesArray([]);
            setSeriesArray(resp.data);
            console.log('SeriesArrayLength:'+ resp.data.length)
        })
    }

    const votesOfSeriesData=async()=>{
        await axios.get(`http://localhost:5000/series/getRatesOfSeries/${props.id}`).then(resp=>{
                setVotesOfSeries(resp.data);
        })
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
              console.log(user);
                findSeriesNewArray()
          }
         
    },[user,added2List])
    
    
    useEffect(()=>{
            if(seriesArray.length!==0 || seriesArray.length===0 ){
                console.log('seriesBox:'+seriesArray.length)
                //console.log(movieArray)
               props.newSeriesList(seriesArray.length);
            }
    },[seriesArray.length])


    useEffect(()=>{
        votesOfSeriesData();

        const percentageOfVotesFunction=async()=>{
            if(votesOfSeries!==null){
                setSumOfRatings(0);
                votesOfSeries.seriesHaveRate.map(x=>setSumOfRatings(prevState=>prevState+x.rating));
                //console.log(`LAST: ${sumOfRatings}`);
                setPercentageOfVotes((sumOfRatings)/Number(localStorage.getItem(`numberOfVotesForSeries${props.id}`)))
                console.log("percentageofVotes:"+percentageOfVotes);
        }
    }
        percentageOfVotesFunction();
    },[sumOfRatings,votesOfSeries!==null])
    
    const getEpisodesOfSeries=async()=>{
        await axios.get(`http://localhost:5000/episodes/getSeasonOfSeries/${props.id}/${seasonNumber}`).then(resp=>{
            setEpisodes(resp.data);
        })
    }

    useEffect(()=>{
        getEpisodesOfSeries()
    },[selectSeason])

    const findPercentageOfVotes=async()=>{
        await axios.get(`http://localhost:5000/series/getRatesOfSeries/${props.id}`).then(resp=>{
                setVotesOfSeries(resp.data)
        })
                if(votesOfSeries!==null){
                    setSumOfRatings(0);
                    var sum=0;
                    votesOfSeries.seriesHaveRate.map(x=>sum=sum+x.rating);
                    setSumOfRatings(sum);
                    setPercentageOfVotes((sumOfRatings)/Number(localStorage.getItem(`numberOfVotesForSeries${props.id}`)))
                } 
    }

    const boxResizeByClicking=()=>{
        if(boxResize===false){
            setBoxResize(true)
        }   
    }

    const add2List=async()=>{
        const userID=localStorage.getItem('userID');
        if(localStorage.getItem(`${localStorage.getItem('userID')}${props.title}`)==='yes'){
            await axios.delete(`http://localhost:5000/series/delSeriesFromUser/${userID}/${props.id}`,{headers: {Authorization: localStorage.getItem('token')}});
            setAdded2List('no');
            localStorage.setItem(`${localStorage.getItem('userID')}${props.title}`,'no')
        }else{
            console.log(localStorage.getItem(`${localStorage.getItem('userID')}${props.title}`))
            await axios.post('http://localhost:5000/series/add/addSeriesFromUser',{ userID:user.id, seriesID:props.id}).then(resp=>{
                console.log(resp.data);
            })
            setAdded2List('yes');
            localStorage.setItem(`${localStorage.getItem('userID')}${props.title}`,'yes');
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
        if(!localStorage.getItem(`seriesRate ${localStorage.getItem('userID')} ${props.id}`)){
            await axios.post('http://localhost:5000/series/seriesRate',{userID: user.id, seriesID:props.id, rating:rating})
            const count=Number(localStorage.getItem(`numberOfVotesForSeries${props.id}`))+1;
            console.log(count);
            localStorage.setItem(`numberOfVotesForSeries${props.id}`, count);
            setTotalVotes(count);
            localStorage.setItem(`seriesRate ${localStorage.getItem('userID')} ${props.id}`,setRate);
            setRateOfSeries(Number(localStorage.getItem(`seriesRate ${localStorage.getItem('userID')} ${props.id}`)));
            findPercentageOfVotes();
        }else{
            await axios.post('http://localhost:5000/series/updateRate',{userID:user.id, seriesID:props.id, rating:rating})
            localStorage.setItem(`seriesRate ${localStorage.getItem('userID')} ${props.id}`,setRate);
            setRateOfSeries(Number(localStorage.getItem(`seriesRate ${localStorage.getItem('userID')} ${props.id}`)));
            findPercentageOfVotes();
        }
        
    }

    const selectedOverview=()=>{
        setSelectOverview(true);
        setSelectEpisodes(false);
    }

    const selectedEpisodes=()=>{
        setSelectOverview(false);
        setSelectEpisodes(true);
    }

    const onChangeSeason=(e)=>{
        for (var i=1; i<=props.numberOfSeasons; i++){
            if(e.target.value===`Season ${i}`){
                setSeasonNumber(i)
            }
        }
        setSelectSeason(e.target.value);
    } 


    const onMouseLeaveFunction=()=>{
        setBoxResize(false);
        setSelectEpisodes(false);
        setSelectOverview(true);
    }

        return(
            <div className="flex seriesBox-outline">
                <div className="out-of-seriesBox">
                {boxResize===true?
                 (<div onClick={()=>boxResizeByClicking()} onMouseLeave={()=>onMouseLeaveFunction()}  className=" seriesBox-reSized">
                        <img src={'data:image/jpeg;base64,' + props.base64} />  
                        <div className="series-title">{props.title}</div>
                        <div className="duration-plusButton-style">
                            {added2List==='yes' ? (<div title="REMOVE FROM MY LIST" onClick={()=>add2List()} className="checkSymbol-style"><span style={{marginLeft:1}}>&#10003;</span></div> ):
                            (<div title="ADD TO MY LIST" onClick={()=>add2List()} className="plusButton"/>)}
                        </div>
                        <div onClick={()=>detailBox()} className="arrow"/>
        
                   </div>):(<div style={detailBoxState===true ? {border:"2px solid white"}: null } onClick={()=>boxResizeByClicking()} onMouseOut={()=>setBoxResize(false)}  className="seriesBox-normal"><img src={'data:image/jpeg;base64,' + props.base64} /></div>)}
                   </div>
                   {detailBoxState===true ? 
                   (<div onMouseLeave={()=>setDetailBoxState(false)} className="detailBoxStyle-1">
                       <div className="detailBoxStyle-navBar">
                           <div onClick={()=>selectedOverview()} className={selectOverview ?  "detailBoxStyle-overview" : null} style={{marginLeft:20,marginRight:40}}>Overview</div>
                           <div onClick={()=>selectedEpisodes()} className={selectEpisodes? "detailBoxStyle-episodes" : null}>Episodes</div>
                        </div>
                        {selectOverview ?
                        (<div className="overview">
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
                                        value={rateOfSeries}
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
                            <ReactPlayer key={props.id} width={1000} height={500} url={props.video} controls={true}/>
                        </div>):(<div className="episodes">
                                    <div className="episodes-style-1">
                                        <select className="selectSeason-style" value={selectSeason} onChange={(e)=>onChangeSeason(e)}>
                                            {
                                                Array(props.numberOfSeasons).fill().map((_,i)=>{
                                                    return(
                                                        <option key={i+1} value={`Season ${i+1}`}>Season {i+1}</option>
                                                    )
                                                    
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="episodes-style-2">
                                        {episodes.map(episode=>{
                                        return(
                                            <EpisodeBox key={episode.id} id={episode.id} video={episode.video} title={episode.title} description={episode.description} season={episode.season} duration={episode.duration} /> 
                                        )
                                        })}
                                    </div>
                                </div>)}
                    </div>):null}
                   
                </div>
        )
    }

export default SeriesBox;
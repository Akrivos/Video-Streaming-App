import React ,{Component, useState, useEffect} from 'react';
import './Series.css';
import axios from 'axios';
import SeriesBox from '../SeriesBox';


const Series =(props)=>{

    const [series,setSeries]=useState([]);
    const [text,setText]=useState('');

    const getAllSeries=async()=>{
        await axios.get('http://localhost:5000/series',{headers: {Authorization: localStorage.getItem('token')}}).then(resp=>{
            setSeries(resp.data)
            //console.log(this.state.series);
        })
    }

    useEffect(()=>{
        getAllSeries()
    },[])

    const onChangeSearch=(text)=>{
        setText(text,async()=>{
        if(text){
            await axios.get(`http://localhost:5000/series/searchSeries/${text}`,{headers: {Authorization: localStorage.getItem('token')}}).then(resp=>{
            setSeries(resp.data);
            });
        }else{
            await axios.get('http://localhost:5000/series',{headers: {Authorization: localStorage.getItem('token')}}).then(resp=>{
            new Promise(resolve => setTimeout(() => resolve(setSeries(resp.data)), 700)); 
            setSeries(resp.data);
        });
        }
    });
}
    return(
            <div className="series-style1">
                    <div className="search">
                        <span className="fa fa-search"></span>
                         <input onChange={(text)=>onChangeSearch(text.currentTarget.value)} value={text} placeholder="Search.."/>
                    </div>
                    <div style={{ display: 'flex', flex: '1 1 auto', flexWrap: 'wrap' }}>
                    {series.map(series => {
                        var blob = new Blob([series.image], { type: 'image/png' });
                        var base64Buffer = new Buffer.from(series.image, 'binary').toString('base64');
                        return(<SeriesBox key={series.id} id={series.id} description={series.description} title={series.title} numberOfSeasons={series.numberOfSeasons} video={series.video} base64={base64Buffer} newSeriesList={()=>console.log()}/>)
                    })}
                    </div>
            </div>
        )
    }
export default Series;
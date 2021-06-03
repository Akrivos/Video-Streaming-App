import React from 'react';
import ReactPlayer from 'react-player';
import './EpisodeBox.css';

const EpisodeBox =(props)=>{
        return(
            <div className="episodeBox-style">
                    <ReactPlayer key={props.id} width={250} height={140} url={props.video} controls={true}/>
                    <div style={{display:"flex"}}>
                        <div className="episodeBox-div-style1" title={props.title}>{props.title}</div>
                        <div className="episodes-duration">{props.duration}m</div>
                    </div>
                    <div className="episodes-description">{props.description}</div>
            </div>
        )
    }
export default EpisodeBox;
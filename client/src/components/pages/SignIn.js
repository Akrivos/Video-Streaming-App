import React, { Component,useState,useContext }from 'react';
import './SignIn.css';
import { Link } from 'react-router-dom';
import GlobalContext, { AuthContext } from '../../context/GlobalContext';
import axios from 'axios';


const SignIn=(props)=>{
    const [password,setPassword]=useState('');
    const [username,setUsername]=useState('');
    const [msgUsername,setMsgUsername]=useState('');
    const [msgPassword,setMsgPassword]=useState('');   

    const auth = useContext(AuthContext);

    const onSubmitButton=()=>{
            if(username.length>=4 && password.length>=4){
                auth.isLoggedIn(username,password,res=>{
                if (res===true){
                    props.history.push('/home');
                }})
            }else{
                setMsgUsername('Username must have at least 4 characters.');
                setMsgPassword('Password must have at least 4 characters.');
            }    
        }

    const onKeyPress=(event)=>{
        if(event.key==='Enter'){
            onSubmitButton()
        }
    }

        return (
            <div className="style1">
                <div className="titleStyle">
                    <p>NETFLIX</p>
                </div> 
                <div className="style2">   
                <div className="style3">
                    <h1>Sign In</h1>
                    <input type="text" onChange={(text)=>setUsername(text.target.value)} onKeyDown={(event)=>onKeyPress(event)} className="input" placeholder="Username" id="usernameID" autoFocus />
                    {username.length<4 ? (<div className="msg">{msgUsername}</div>) : (<div></div>)}
                    <br />
                    <input type="password" onChange={(text)=>setPassword(text.target.value)} onKeyDown={(event)=>onKeyPress(event)} className="input" placeholder="Password" id="passwordID" />
                    {password.length<4 ? (<div className="msg">{msgPassword}</div>) : (<div></div>)}
                    <br />
                    <button type="submit" className="button" onClick={()=>onSubmitButton()} onKeyPress={(event)=>onKeyPress(event)}>Log In</button>
                    <br />
                    <br />
                    <div className="signUp">
                        New to Netflix? <Link to="/signup" className="signUp-Link" >Sign up now</Link>
                    </div>
                </div>
                </div>
            </div>
        );
    
}

export default SignIn;
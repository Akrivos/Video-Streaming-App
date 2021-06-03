import React, { Component,useState,useContext } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/GlobalContext';


const SignUp=(props)=>{
    const auth=useContext(AuthContext);

    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [confirm,setConfirm]=useState('');
    const [type,setType]=useState('user');
    const [usernameMsg,setUsernameMsg]=useState('');
    const [passwordMsg,setPasswordMsg]=useState('');

    const cancelButton = () => {
            props.history.push('/');
    }

    const onSubmitButton=async ()=>{
        if(username.length>=4 && password.length>=4){
            const searchUser = await axios.post('http://localhost:5000/users',{username:username});       
            if(!searchUser.data){
                if (password===confirm){
                   const resp=await axios.post('http://localhost:5000/users/signUp',{username:username, password:password, type:type});
                   alert('Account successfully created!')
                   props.history.push('/');
                  return resp.data;
                }
                else{
                   alert('Your password and confirmation password do not match.');
                }
            }else{
                //console.log(searchUser.data);
            alert('The username already exists.');
            }
        }else{
            setUsernameMsg('Username must have at least 4 characters.');
            setPasswordMsg('Password must have at least 4 characters.');
        }
    }

    const onChangeType=(event)=>{
        setType(event.target.value);
    }

        return (
            <div className="style-1">
                <div className="style-2">
                    <h1>Sign Up to start your membership</h1>
                    <br />
                    <br />
                    Create your account
                    <br />
                    <input type="text" onChange={(text)=>setUsername(text.target.value)} placeholder="Username" className="text" id="signInUP-1" autoFocus/>
                    {username.length<4 ? (<div className="msg">{usernameMsg}</div>) : (<div></div>)}
                    <br />
                    <input type="password" onChange={(text)=>setPassword(text.target.value)} placeholder="Password" className="text" id="signInUP-2" />
                    {password.length<4 ? (<div className="msg">{passwordMsg}</div>) : (<div></div>)}
                    <br />
                    <input type="Password" onChange={(text)=>setConfirm(text.target.value)} placeholder="Confirm" className="text" id="signInUP-3" />
                    <br />
                    <div className="selectStyle">
                    <p>Type:</p> &nbsp; 
                    <select className="selectType" value={type} onChange={(event)=>onChangeType(event)}>
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>
                    </div>
                    <br/>
                    <br/>
                    <div className="main-div-align">
                        <div className="align-items-left">
                            <button className="sub-cl-button" onClick={()=>onSubmitButton()}>Submit</button>
                        </div>
                        <button className="sub-cl-button" onClick={()=>cancelButton()}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }

export default SignUp;
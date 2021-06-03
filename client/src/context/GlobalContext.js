import React,{Component,useContext,useState, useEffect} from 'react';
import axios from 'axios';


export const AuthContext = React.createContext();

const GlobalState=(props)=>{

    const [id,setId]=useState(null);
    const [status,setStatus]=useState(false);
    const [token,setToken]=useState(null);
    const [msg,setMsg]=useState('');
    const [callback,setCallback]=useState(null);

    const refreshData=()=>{
        if(localStorage.getItem('token')){
            setStatus(true);
        }
    }

    useEffect(()=>{
        refreshData()
    },[])

    const isLoggedIn=async (username,password,callback)=>{
        if(localStorage.getItem('token')===null){
        await axios.post('http://localhost:5000/users/signIn',{username:username,password:password}).then(
        res=>{
            if(res.data.msg==='Success'){
                localStorage.setItem('token',res.data.accessToken);
                localStorage.setItem('username',res.data.username);
                localStorage.setItem('userID',res.data.id);
                console.log(res.data);
                console.log(localStorage.getItem('userID'))
                setStatus(true);
                setMsg(res.data.msg);
                setCallback(()=>callback(true));
                console.log(res.data);
            }else{
                localStorage.removeItem('token');
                setToken(res.data.accessToken);
                setStatus(false);
                setMsg(res.data.msg);
                console.log(res.data);
                alert('Invalid Credentials!');
            } 
        })
}}

    const isLoggedOut=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userID');
        //setToken(null);
        setStatus(false);
        setMsg('');
    }

    const statusFunction=(stats)=>{
        setStatus(stats);
    }

        return(
            <AuthContext.Provider value={
                {   
                    token:token,
                    msg:msg,
                    status:status,
                    statusFunction:statusFunction,
                    isLoggedIn:isLoggedIn,
                    isLoggedOut:isLoggedOut
                }
            }>
                {props.children}
            </AuthContext.Provider>
        )
    }


export default GlobalState;

import React ,{Component, useContext, useState, useEffect} from 'react';
import './Modal.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../context/GlobalContext';

const  Modal=(props)=>{
    const auth=useContext(AuthContext);
    const [users,setUsers]=useState([]);

    const showFirst=async()=>{
        await axios.get('http://localhost:5000/users',{headers: {Authorization: localStorage.getItem('token')}}).then(resp=>{
            setUsers(resp.data);
            })
        }
        useEffect(()=>{
            showFirst();
        },[])

    const onDeleteButton=async ()=>{
        if(props.user.type==='admin'){
            if(props.id===props.user.id){
               // console.log('whatup');
                //console.log(props.id===props.user.id)
                await axios.delete(`http://localhost:5000/users/${props.id}`,{headers: {Authorization: localStorage.getItem('token')}});
                props.showBox('off');
                //auth.statusFunction(false);
                auth.isLoggedOut();
                props.history.push('/');
            }else{
                //console.log('hi');
                //await axios.get('http://localhost:5000/users',{headers: {Authorization: .getItem('token')}}).then(resp=>{
                //setUsers(resp.data);
                //})
                await axios.delete(`http://localhost:5000/users/${props.id}`,{headers: {Authorization: localStorage.getItem('token')}});
                //console.log(users);
                const newUsersArray=users.filter(user=>user.id!==props.id);
                //console.log(newUsersArray);
                props.returnedUsers(newUsersArray);
                props.showBox('off');
                if(newUsersArray.length===0 || newUsersArray===undefined){
                    console.log('hello');
                    //auth.statusFunction(false);
                    auth.isLoggedOut();
                    props.history.push('/');
                }
            }
        }else{
            await axios.delete(`http://localhost:5000/users/${props.user.id}`,{headers: {Authorization: localStorage.getItem('token')}});
           // console.log('wtf');
            //auth.statusFunction(false);
            auth.isLoggedOut();
            props.history.push('/');
    }


    }

    const onCancelButton=()=>{
        props.showBox('off');
    }

        return(
            <div className="modal1">
                    <div className="modal2">
                         <div className="modal3"><span className="p-style1">Are you sure?</span><span onClick={()=>onCancelButton()} className="fa fa-close"></span></div>
                         <div className="modal4">You want to delete the account with username {props.username}?</div>
                         <div className="modal5">
                                <button className="button-style1" onClick={()=>onDeleteButton()}>OK, delete my account</button>
                                <button className="button-style2" onClick={()=>onCancelButton()}>Nope,i'll give it another try</button>
                        </div>
                    </div>
            </div>
            
           
        )
    }
export default  withRouter(Modal);
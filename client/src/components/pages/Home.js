import React, {Component, useContext, useState, useEffect} from 'react';
import { AuthContext } from '../../context/GlobalContext';
import axios from 'axios';
import './Home.css';
import Modal from '../Modal';

const Home=(props)=>{
   const auth=useContext(AuthContext);

    const [user,setUser]=useState({});
    const [users,setUsers]=useState([]);
    const [userID,setUserID]=useState(null);
    const [username,setUsername]=useState('');
    const [show,setShow]=useState('off');
    const [showBox,setShowBox]=useState('off');

    const showFirst=async()=>{
        await axios.get('http://localhost:5000/users',{headers: {Authorization: localStorage.getItem('token')}}).then(resp=>{
            setUsers(resp.data);
            })

            await axios.post('http://localhost:5000/users',{username:localStorage.getItem('username')},{headers: {Authorization: localStorage.getItem('token')}}).then(resp=>{
            setUser(resp.data);
            }) 
    }

    useEffect(()=>{
        showFirst();
    },[])

    

    const switchOnOff=()=>{
        if (show === 'on'){
            setShow('off');
        }else{
            setShow('on');
        }
    }

    const deleteUser1= ()=>{
        setShowBox('on');
    }
    
    const deleteUser2=(userId,username)=>{
        setUsername(username);
        setUserID(userId);
        setShowBox('on');
    }

    const showWindow=(type)=>{
        setShowBox(type);
    }

    const returnedUsers=(users)=>{
        setUsers(users);
    }

        return(
            <div className="home-style1"> 
               <p className="home-p"> Welcome {localStorage.getItem('username')}!</p>
                    <button onClick={()=>switchOnOff()}>Click to see your account</button>  
                    {user.type==='user' ? 
                        show === 'on'?
                        (<div className="home-style2"> 
                        <table>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{user.username}</td>   
                                    <td>{user.type}</td>
                                    <td className="home-tdDelButton"><span onClick={()=>deleteUser2(user.id,user.username)} className="customStyle fa fa-trash"></span></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>) : null
                        : show === 'on'? 
                        (<div className="home-style2">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Type</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                            {users.map(user=>
                                <tbody key={user.id}>
                                    <tr>
                                        <td>{user.username}</td>
                                        <td>{user.type}</td>
                                        <td className="home-tdDelButton"><span onClick={()=>deleteUser2(user.id,user.username)} className="customStyle fa fa-trash"></span></td>
                                    </tr>
                                </tbody> 
                            )}
                            </table>
                      </div>):null
                    }
                    {showBox==='on' ? (<Modal showBox={(type)=>showWindow(type)} id={userID} returnedUsers={(users)=>returnedUsers(users)} username={username}  user={user}/>) : null }
        </div>
    )
}

export default Home;
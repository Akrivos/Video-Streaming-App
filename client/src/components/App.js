import React, { Component,useContext, useEffect } from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NavBar from './NavBar';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import GlobalContext, { AuthContext } from '../context/GlobalContext';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MyList from './pages/MyList';
import Series from './pages/Series';


const App=()=>{
    const auth=useContext(AuthContext);
        return (
            <Router>
                {auth.status ?
                  (<main>
                        <NavBar></NavBar>
                        <Switch>
                            <Route path="/home" exact component={Home}/>
                            <Route path="/movies" exact component={Movies}/>
                            <Route path="/series" exact component={Series}/>
                            <Route path="/my-list" exact component={MyList}/>
                        </Switch>
                        <Redirect to="/home"/>
                    </main>):
                    (<main>
                        <Switch> 
                            <Route path="/" exact component={SignIn} />
                            <Route path="/signup" exact component={SignUp} />
                        </Switch>
                    </main>)}
            </Router>
        );
    }

export default App;
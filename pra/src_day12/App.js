import React from 'react';
// import {Component, useState} from 'react';
import './App.css';
import Header from './components/Header/Header'
import List from './components/List/List'
import Login from './components/Login/Login'

const App =()=>{
    return(
    <div className='wholePage'>

        <div className="appOut">
            <div className="appIn">

                <div className="header">
                    <Header/>
                </div>

                <div className="list">
                    <List/>
                </div>
                
                <div className="login">
                    <Login/>
                </div>                               

            </div>
        </div>

    </div>)
}

export default App;

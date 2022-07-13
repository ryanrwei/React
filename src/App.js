import React, { useState } from 'react';
// import {Component, useState} from 'react';
import './App.css';
import Header from './components/Header/Header'
import List from './components/List/List'
import Login from './components/Login/Login'

const App =()=>{

    let [listData, setListData] = useState({
        listName:'ryan',
        listEmail:'xxx@com',
        listPassword:'123',
    })

    let [isVisible, setvisibility] = useState('hidden')


	const updateListName = (newData)=>{
        setListData((preState) => {
            return {
                ...preState,
                listName:newData
            }
        })
	}
	const updateListEmail = (newData)=>{
        setListData((preState) => {
            return {
                ...preState,
                listEmail:newData
            }
        })	
    }
    const updateListPassword = (newData)=>{
        setListData((preState) => {
            return {
                ...preState,
                listPassword:newData
            }
        })	
	}    

    const changeVisibility = (newData) =>{
        setvisibility({isVisible:newData})
        console.log(isVisible)
    }

    return(
    <div className='wholePage'>
        <div className="app">

            <div className="header">
                <Header/>
            </div>

            <div className='passwordWrong' style={{visibility:{isVisible}}}>Details do not match!</div>

            <div className="list">
                <List listData={listData} 
                updateListName={updateListName}
                updateListEmail={updateListEmail}
                updateListPassword={updateListPassword}
                />
            </div>
            
            <div className="login">
                <Login listData={listData} changeVisibility={changeVisibility}/>
            </div>                               

        </div>

    </div>)
}

export default App;

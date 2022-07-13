import React, { useState } from 'react';

const List =(props)=>{
    const {listName, listEmail, listPassword} = props.listData
    const updateListName = props.updateListName
    const updateListEmail = props.updateListEmail
    const updateListPassword = props.updateListPassword
    
    const handleChangeName = (event) =>{
        updateListName(event.target.value)
    }
    const handleChangeEmail = (event) =>{
        updateListEmail(event.target.value)
    }
    const handleChangePassword = (event) =>{
        updateListPassword(event.target.value)
    }

    return(
        <div>
            <div>Name:</div>
            <input type="text" value={listName} onChange={handleChangeName}/>
            <div>Email:</div>   
            <input type="text" value={listEmail} onChange={handleChangeEmail}/>
            <div>Password:</div>
            <input type="text" value={listPassword} onChange={handleChangePassword}/>
        </div>
        
    )
}
export default List
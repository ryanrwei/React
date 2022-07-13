const Login =(props)=>{
    const {listName, listEmail, listPassword} = props.listData
    const changeVisibility = props.changeVisibility
    const checkData = () =>{
        if(
            listName === '123' &&
            listEmail === '123' &&
            listPassword === '123'
        ){
            changeVisibility('visible')
            console.log('true')
        }
    
    }

    return(
        <div>
            <button onClick={checkData}>Login</button>
        </div>
        
    )
}
export default Login
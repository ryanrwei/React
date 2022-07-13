const Slider =(props)=>{
    console.log("props>",props)
    return(
        <>
            <div>{props.a}</div>
            <div>{props.b}</div>
            <button onClick={props.func}></button>
        </>
        
    )
}
export default Slider
import {useState} from 'react';
import './App.css';
import Slider from './Slider'
const App =()=>{
    const [number, setNumber] = useState(0)
    // const [number2, setNumber2] = useState(0)
    const addNum=()=>{
        setNumber(number-1)
    }
    


    return(<div>
        <Slider a={new Date().toLocaleDateString()} b="fuckme"/>
        <div id="background">
            <div id="container">
                <div id="counter">counter</div>
                <div id="number">{number}</div>
                <div id="operator">
                    <input type="button" id="Decrease" value="Decrease" onClick={addNum} />
                    <input type="button" id="Reset" value="Reset" onClick={()=>{setNumber(0)}} />
                    <input type="button" id="Increase" value="Increase" onClick={()=>{setNumber(number+1)}} />
                </div>
            </div>
        </div>
    </div>)
}
export default App;

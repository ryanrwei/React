import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
const {useState} = React; // 透過物件的解構賦值把 useState 方法取出

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


const Counter = () => {

    // 透過 useState 建立 `count` 這個變數，預設值設為 256
    // 並取得修改變數的 `setCount` 方法
    const [count, setCount] = useState(5)

    // const handleIncrement = () => {
    //     setCount(count + 1)
    // }

    // const handleDecrement = () => {
    //     setCount(count - 1)
    // }

    const handleClick = (type) => {
        return function () {
            setCount(type === 'increment' ? count+1 : count-1) 
            // if (type === 'increment'){
            //     setCount(count + 1)
            // }
            // if (type === 'decrement'){
            //     setCount(count - 1)
            // }
        }
    }

    return(
    <div className="container">
        {console.log('render', count)}
        <div className="chevron chevron-up" 
            style={{visibility: count >=10 && 'hidden',}}
            onClick = { handleClick('increment') }
            />
        <div className="number">{count}</div>
        <div className="chevron chevron-down" 
            style={{visibility: count <=0 && 'hidden',}}
            onClick = { handleClick('decrement') }
            />
    </div>
    )
}

// const counters = Array.from({length:14}, (_, index) => index );
const counters = Array.from({length:14});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <dir style={{
        display: 'flex',
        flexWrap: 'wrap',
    }}>
        {counters.map( (item) => (
            <Counter/>
        ))}
    </dir>
)
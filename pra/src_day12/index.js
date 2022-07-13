import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
const {useState} = React; // 透過物件的解構賦值把 useState 方法取出


const UnitControl = () => {
return(
    <div className="unit-control">
        <div className="unit">Mbps</div>
        <span className="exchange-icon fa-fw fa-stack">
            <i className="far fa-circle fa-stack-2x" />
            <i className="fas fa-exchange-alt fa-stack-1x" />
        </span>
        <div className="unit">MB/s</div>
    </div>
)}

const CardFooter = (props) => {
    console.log(props)
    let {inputValue} = props
    let criteria 
    if (!inputValue) {
    criteria = {
        title: '---',
        backgroundColor: '#d3d8e2',
    };
    } else if (inputValue < 15) {
    criteria = {
        title: 'SLOW',
        backgroundColor: '#ee362d',
    };
    } else if (inputValue < 40) {
    criteria = {
        title: 'GOOD',
        backgroundColor: '#1b82f1',
    };
    } else if (inputValue >= 40) {
    criteria = {
        title: 'FAST',
        backgroundColor: '#13d569',
    };
    }
return(
    <div 
        className="card-footer"
        style={{
        backgroundColor: criteria.backgroundColor,
    }}>
    {criteria.title}</div>
    )
}


const SpeedConverter = () => {
  // STEP 2: 定義 state，取得預設值為 0 的 inputValue 和修改該狀態的 setInputValue 方法

let [inputValue, setInputValue] = useState(0)

const handleInputChange = (e) => {
    const {value} = e.target
    setInputValue(value)
}

return (
<div className="container">
    <div className="card-header">Network Speed Converter</div>

    <div className="card-body">
        <UnitControl/>
        <div className="converter">
            <div className="flex-1">
                <div className="converter-title">Set</div>
                {/* STEP 4: 把事件處理器綁定進去，並且把 value 帶入 */}
                <input
                    type="number"
                    onChange={handleInputChange}
                    value={inputValue}
                    className="input-number"
                    min="0"
                />
            </div>
            <span
                className="angle-icon fa-2x"
                style={{marginTop: 30}}
                >
                <i className="fas fa-angle-right" />
            </span>
            <div className="text-right flex-1">
                <div className="converter-title">Show</div>
                {/* STEP 5: 把使用者輸入的值顯示於畫面上 */}
                <input
                    className="input-number text-right"
                    type="text"
                    value={inputValue/8}
                    disabled
                />
            </div>
        </div>
        <CardFooter inputValue={inputValue}/>        
    </div>

</div>
);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SpeedConverter />);
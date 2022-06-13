import React from 'react';
import './App.css';

class App extends React.Component {

    state = {
        counter:'Counter',
        number:0
    }

    render(){
        let {counter,number} = this.state
            
        return (
        <div>
            <div id="background">
                <div id="container">
                    <div id="counter">{counter}</div>
                    <div id="number">{number}</div>
                    <div id="operator">
                        <input type="button" id="Decrease" value="Decrease" onClick={this.Decrease} />
                        <input type="button" id="Reset" value="Reset" onClick={this.Reset} />
                        <input type="button" id="Increase" value="Increase" onClick={this.Increase} />
                    </div>
                </div>
            </div>
        </div>
        )
    };

    Decrease = () => {
        let newNumber = this.state.number;
        newNumber = newNumber - 1;
        this.setState({number:newNumber})
    }

    Reset = () => {
        this.setState({number:0})
    }
    
    Increase = () => {
        let newNumber = this.state.number;
        newNumber = newNumber + 1;
        this.setState({number:newNumber})
    }
}

export default App;

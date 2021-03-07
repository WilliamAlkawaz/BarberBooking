import React, { Component } from 'react'; 

class Counter extends Component {
    state={
        count: 0, 
        selected: false
    }; 

    handleIncrement = () => {
        this.setState({ count: this.state.count + 1 });
        this.props.onStyleChanged(true,this.state.count+1); 
    }

    handleDecrement = () => {
        if(this.state.count <= 0) {
            this.setState({ count: 0 });
            this.props.onStyleChanged(false,0); 
        }
        else {
            this.setState({ count: this.state.count - 1 });
            if((this.state.count-1)<=0)    
                this.props.onStyleChanged(false,0); 
            else
                this.props.onStyleChanged(true,this.state.count-1); 
        }
        
    }

    render() {        
        return (
            <div>
                <button onClick={this.handleDecrement} className="btn btn-danger btn-sm m-2">-</button>
                <span className={this.getBadgeClasses()}>{this.state.count}</span>
                <button 
                    onClick={this.handleIncrement} 
                    className='btn btn-secondary btn-sm'>
                        +
                </button>
            </div>
        );
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-"; 
        classes += this.state.count === 0 ? 'warning' : 'primary'; 
        return classes; 
    }
}

export default Counter; 
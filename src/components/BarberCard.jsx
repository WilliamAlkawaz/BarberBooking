import React, { Component } from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import Counter from './CounterComponent';
import Sel from './sel.jpg';

const styles = {
    Container: {
        border: '1px solid red',
        borderRadius: '10px',
        width: '20%',
        boxShadow: '4px 3px 5px #FE6B8B',
        margin: 10,
        padding: 10
    },
    SelContainer: {
        border: '4px solid black',
        borderRadius: '10px',
        width: '20%',
        boxShadow: '4px 3px 5px #FE6B8B',
        margin: 10,
        padding: 10
      },
    Image: {
        top: 0,
        left: 0,
        width: '100%', 
        height: '50%'
    }, 
    Title: {
        fontSize: '20px',         
        color: '#003C3A',
        fontFamily: 'arial'
    }, 
    Description: {
        fontSize: '14px', 
        color: '#003EAA', 
        fontFamily: 'arial'
    }, 
    Sel: {
        position: 'absolute', 
        width: 40, 
        top: 0,
        left: 0, 
        marginRight: 'auto', 
        marginLeft: 'auto'
    },
    Up: {
        position: 'relative'
    },
    Down: {
        top: 200
    }
};

class BarberCard extends Component {
    
    handleStyleChanged = (selected,count) => {
        this.props.onStyleChanged(this.props.Name, selected, count);
    }; 

    render() {   
        if(this.props.Selected)   
        {  
            return (         
                <div id='cont' style={styles.SelContainer}>
                    <div>
                        <div style={styles.Up}>
                            <img style={styles.Image} src={this.props.ImSource} alt='No image' />
                            <img style={styles.Sel} src={Sel} />                        
                        </div>
                    </div>
                    
                    <div style={styles.Down}>
                        <div style={styles.Title}>{this.props.Name}</div>
                        <div style={styles.Description}>{this.props.Description}</div>
                        <Counter onStyleChanged={this.handleStyleChanged}></Counter>
                    </div>                
                </div>
            );    
        }
        else        
            return (   
                <div id='cont' style={styles.Container}>
                    <div>
                        <div style={styles.Up}>
                            <img style={styles.Image} src={this.props.ImSource} alt='No image' />
                        </div>
                    </div>
                    
                    <div style={styles.Down}>
                        <div style={styles.Title}>{this.props.Name}</div>
                        <div style={styles.Description}>{this.props.Description}</div>
                        <Counter onStyleChanged={this.handleStyleChanged}></Counter>
                    </div>    
                </div>
            );      
    }   
}

export default BarberCard;
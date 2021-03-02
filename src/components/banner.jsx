import React, { Component } from 'react'; 
import Photo from './banner.jpg';

const styles = {
    ImContainer: {
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }
};

class Banner extends Component {
    render() { 
        return (
            <div style={styles.ImContainer}>
                <img src={Photo} alt='logo' />
            </div>
        );
    }
}
 
export default Banner;
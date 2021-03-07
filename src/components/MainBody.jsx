import React, { Component } from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import Counter from './CounterComponent';
import Banner from './banner'; 
import BarberCard from './BarberCard'; 
import CardContainer from './CardContainer';
import DeanImg from './dean.jpg';
import JoeImg from './em12846.jpg';
import WilliamImg from './em12846.jpg';
import IbrahimImg from './ibrahim.jpg';
import HadiImg from './hadi.jpg';

class MainBody extends Component {
    /*
    constructor()
    {
        super(); 
        this.componentDidMount(); 
        //this.photo(); 
    }*/
    componentDidMount() {
        //const apiUrl = 'http://localhost:5000/api/barbers';
        let bbrrs = [];
        fetch("http://localhost:5000/api/barbers/")
        .then(res => res.json())
        .then(
          (result) => {
            console.log('Hello from method ' + result);
            bbrrs = result; 
            console.log('the length of ' + bbrrs.length);
            let photoFile = [];
            result.map((b, i) => {
                
                    fetch("http://localhost:5000/api/GetPhoto/" + b.BarberID).
                    then(response => {
                        response.blob().then(blobResponse => {
                            photoFile[i] = URL.createObjectURL(blobResponse);
                            this.setState({Photo: photoFile}); 
                            console.log('Hello from photo' + blobResponse);
                        })
                    });
            });
            this.setState({
                RealBarbers: result,
            });
          }
        );
        
    }
    
    state = { 
        BarberCards1: [], 
        RealBarbers: [], 
        RealBarbers1: [], 
        Photo: []
    }

    handleID = (Name, Bool, count) => {
        console.log('Style Changed!', Bool, count);
        /*
        this.state.BarberCards.forEach(barbercard => {
            if(barbercard.Name == Name) {
                const rec = {Name: barbercard.Name, ImSource: barbercard.ImSource, Description: barbercard.Description, Selected: Bool, Count: barbercard.count};
                this.state.BarberCards1 = [...this.state.BarberCards1, rec];
            }
            else {
                this.state.BarberCards1 = [...this.state.BarberCards1, barbercard];
            }
        });
        */
        this.state.RealBarbers.forEach(barbercard => {
            if(barbercard.Name == Name) {
                const rec = {BarberID: barbercard.BarberID, Name: barbercard.Name, ImSource: this.state.Photo[1], Description: barbercard.About, Selected: Bool, Count: barbercard.count};
                this.state.RealBarbers1 = [...this.state.RealBarbers1, rec];
            }
            else {
                this.state.RealBarbers1 = [...this.state.RealBarbers1, barbercard];
            }
        });
        this.setState({ RealBarbers: this.state.RealBarbers1 });
        this.setState({ RealBarbers1: [] });
    }

    handleSubmission = () => {
        console.log('submission handled!');
    }

    render() {  
        // this.fetchPhotos();           
        return (
            //this.componentDidMount(),
            //this.photo(),  
            <div>
                <Banner />
                <CardContainer>
                    { this.state.RealBarbers.map((barbercard, i) => 
                        
                        <BarberCard key={barbercard.Name} Name={barbercard.Name} ImSource={this.state.Photo[i]} 
                            Description='' Selected={barbercard.Selected} 
                            onStyleChanged={this.handleID} />)}
                </CardContainer>
                
                <div style={{margin:10, display: 'flex', alignItems: 'center', justifyContent: 'center', width:'100%'}}>
                    <button style={{width:'20%'}} className='btn btn-secondary btn-sm' onClick={this.handleSubmission}>Book now</button>
                </div>

                <div>
                    {this.state.RealBarbers.map(b => <p>{b.Name}</p>)}
                    
                </div>
            </div>
        );
    }
}

export default MainBody; 
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
import Moment from 'moment';

class MainBody extends Component {
    /*
    constructor()
    {
        super(); 
        this.componentDidMount(); 
        //this.photo(); 
    }*/
    componentDidMount() {
        //const apiUrl = 'https://localhost:44335/api/Barbers';

        let bbrrs = [];
        fetch("https://localhost:44335/api/Barbers")
        .then(res => res.json())
        .then(
          (result) => {
            console.log('Hello from method ' + result);
            bbrrs = result; 
            console.log('the length of ' + bbrrs.length);
            let photoFile = [];
            let rec = [];
            result.map((b, i) => {   
                console.log('fetching: ' + b.barberID + ' ' + b.name + b.imageMimeType);     
                photoFile[i] = "https://localhost:44335/api/Barbers/GetImage/" + b.barberID;
                
                const re = {BarberID: b.barberID, Name: b.name, ImSource: photoFile[i], ImageMimeType: b.imageMimoType, Description: b.about, Selected: false, Count: 0};
                rec = [...rec, re];
            });
            this.setState({Photo: photoFile});
            this.setState({
                RealBarbers: rec,
            });
          }
        );
        
    }
    
    state = { 
        BarberCards1: [], 
        RealBarbers: [], 
        RealBarbers1: [], 
        Photo: [], 
        date: '',
        time: '', 
        phone: '', 
        description: ''
    }

    handleID = (Name, Bool, count) => {
        console.log('Style Changed!', Bool, count);
        this.state.RealBarbers.forEach((barbercard,i) => {
            if(barbercard.Name == Name) {
                const rec = {BarberID: barbercard.BarberID, Name: barbercard.Name, ImSource: this.state.Photo[i], ImageMimeType: barbercard.imageMimoType, Description: barbercard.About, Selected: Bool, Count: count};
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
        /*
        if(this.state.date=='')
            alert('Enter date'); 
        else if(this.state.time=='')
            alert('Enter time'); 
        else if(this.state.phone=='')
            alert('Enter phone');
        else 
        { */
            console.log('submission handled!' + this.state.date);
            console.log('submission handled!' + this.state.time);
            console.log('submission handled!' + this.state.phone);
            let cc = 0; 
            let c1 = 0; 
            this.state.RealBarbers.forEach(b => {
                if(b.Count !== 0) {
                    console.log(b.Name + " has " + b.Count); 
                    cc = cc + b.Count; 
                    c1 = c1 + 1;                     
                }
            }); 
            console.log("The time is: " + this.state.date + ' ' + this.state.time);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    CustomerPhone: this.state.phone, 
                    Description: this.state.description,
                    No_of_Barbers: c1,
                    No_of_Haricuts: cc, 
                    BookingDate: this.state.date + ' ' + this.state.time,
                    Confirmed: false
                })
            };
            fetch('http://localhost:5000/api/PostBooking/Bookings/PostBooking', requestOptions)
                .then(response => response.json()); 
            
        //}
    }

    handleTime = (event) => {
        this.setState({time: this.tConvert(event.target.value)}); 
    }

    handleDate = (event) => {
        this.setState({date: Moment(event.target.value).format('DD/MM/YYYY')}); 
    }

    handlePhone = (event) => {
        this.setState({phone: event.target.value}); 
    }

    handleTextarea = (event) => {
        this.setState({description: event.target.value}); 
    }

    tConvert(time) {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
      }

    render() {        
        return (
            <div>
                <Banner />
                    <CardContainer>
                        { this.state.RealBarbers.map((barbercard, i) => 
                            
                            <BarberCard key={barbercard.Name} Name={barbercard.Name} ImSource={this.state.Photo[i]} 
                                Description='' Selected={barbercard.Selected} 
                                onStyleChanged={this.handleID} />)}
                    </CardContainer>

                    <div style={{margin:10, display: 'flex', alignItems: 'center', justifyContent: 'center', width:'100%'}}>
                        <div style={{margin:10}}>Select date<input type='date' onChange={this.handleDate}/></div>
                        <div style={{margin:10}}>Select time<input type='time' onChange={this.handleTime} /></div>
                        <div style={{margin:10}}>Enter your phone number<input type='text' onChange={this.handlePhone} /></div>
                        <div style={{margin:10}}>Enter description<input type='textarea' onChange={this.handleTextarea} /></div>
                    </div>
                    
                    <div style={{margin:10, display: 'flex', alignItems: 'center', justifyContent: 'center', width:'100%'}}>
                        <button style={{width:'20%'}} className='btn btn-secondary btn-sm' onClick={this.handleSubmission}>Book now</button>
                    </div>

            </div>
        );
    }
}

export default MainBody; 
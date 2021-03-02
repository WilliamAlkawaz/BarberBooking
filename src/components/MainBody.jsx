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
    state = { 
        BarberCards: [
            {Name: 'Dean', ImSource: DeanImg, Description: 'The best barber in town', Selected: false }, 
            {Name: 'Jeo', ImSource: JoeImg, Description: 'The best barber in town', Selected: false }, 
            {Name: 'William', ImSource: WilliamImg, Description: 'The best barber in town', Selected: false }, 
            {Name: 'Ibrahim', ImSource: IbrahimImg, Description: 'The best barber in town', Selected: false }, 
            {Name: 'Hadi', ImSource: HadiImg, Description: 'The best barber in town', Selected: false }, 
        ], 
        BarberCards1: []
    }

    handleID = (Name, Bool) => {
        console.log('Style Changed!', Bool);
        this.state.BarberCards.forEach(barbercard => {
            if(barbercard.Name == Name) {
                const rec = {Name: barbercard.Name, ImSource: barbercard.ImSource, Description: barbercard.Description, Selected: Bool};
                this.state.BarberCards1 = [...this.state.BarberCards1, rec];
            }
            else {
                this.state.BarberCards1 = [...this.state.BarberCards1, barbercard];
            }
        });
        this.setState({ BarberCards: this.state.BarberCards1 });
        this.setState({ BarberCards1: [] });
    }

    render() {        
        return (
            <div>
                <Banner />
                <CardContainer>
                    { this.state.BarberCards.map(barbercard => 
                        <BarberCard key={barbercard.Name} Name={barbercard.Name} ImSource={barbercard.ImSource} 
                            Description={barbercard.Description} Selected={barbercard.Selected} onStyleChanged={this.handleID} />)}
                </CardContainer>
            </div>
        );
    }
}

export default MainBody; 
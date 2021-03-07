import React, { Component } from 'react'; 
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    Container: {
        width: '75%', 
        marginRight: 'auto', 
        marginLeft: 'auto',
        minWidth: 20,
        border: '2px solid red',
        borderRadius: '10px',
        background: 'linear-gradient(45deg, #00CCAA 60%, #0FF053 80%)',
        padding: 10
    },
    CardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    }
});

export default function CardContainer(props) {
    const classes = useStyles();
    return (
        <div className={classes.Container}>
            Select your barber
            <div className={classes.CardContainer}>
                {props.children}
            </div>
        </div>
        
    );
}
import React from 'react';
import Countdown from 'react-countdown';
import { Box, Center } from '@chakra-ui/react'

function EDSBS({date}) {

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render the Completed State
            return (
                <div align='center'>
                    <Box bg='#ececec' w='100%' shadow={'0 0 15px #000000'} borderRadius='15px' overflow='hidden'>
                        <span style={
                            {color: 'white', fontSize: '1rem', fontWeight: 'bold'}
                        }>
                            SATURDAY</span>
                    </Box>
                </div>
          );
        } else {
            // Render the Countdown
            return (
                <div align='center'>
                    <Center bg='#ececec' w='115%' shadow={'0 0 15px #000000'} borderRadius='15px' overflow='hidden'>
                        <span style={
                            {color: '#000000', fontSize: '1rem', fontWeight: 'bold', 'font-style': 'italic'}
                        }>
                            {days}:{hours}:{minutes}:{seconds}<br></br>Until Saturday</span>
                    </Center>   
                </div>
            );
        }
      }
   


    return (
        <Countdown 
        renderer={renderer}
        date={date} 
        zeroPadTime={2}
        />
    );
};

export default EDSBS
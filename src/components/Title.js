import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Title() {
    return(
        <Box
            sx={{ 
                p: 1.5,
                m: 'auto',
                boxShadow: 1,
                fontWeight: 'bold',
                my: 0,
                // borderRadius: '15px',
                // zIndex: 2,
            }}
        >
            <Typography variant="h4" component="h1">
                Calulate optimum meeting location
            </Typography>
        </Box>
    );
}
  
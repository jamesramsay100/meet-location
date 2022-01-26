import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

export default function Title() {
    return(
        <Box sx={{ my: 4, mx: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Calulate optimum meeting location
            </Typography>
        </Box>
    );
}
  
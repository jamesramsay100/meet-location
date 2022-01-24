import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Copyright from './components/Copyright';
import Engine from './components/Engine';


export default function App() {
  return (
    <div
      // this just fills the full page width
      id='maindiv'
      style={{
        width: '100%',
        height: '100vh',
        textAlign: "center"
      }}
    > 
      <Grid 
        // grid container just fills width and aligns content to center
        id="container"
        container
        direction="column"
        alignItems="center"
      > 
        <Box sx={{ my: 4, mx: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Calulate optimum meeting location
          </Typography>
        </Box>
        <Engine />
        <Copyright />
      </Grid>
    </div>
    
  );
}

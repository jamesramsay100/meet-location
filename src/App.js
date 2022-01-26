import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Copyright from './components/Copyright';
import Engine from './components/Engine';
import Title from './components/Title';


export default function App() {
  return (
    <div
      // this just fills the full page width
      id='maindiv'
      style={{
        width: '100%',
        height: '100vh',
        textAlign: "center",
        backgroundColor: '#F2F3F4',
        // alignItems: 'center'
      }}
    > 
      <Title />
      <Engine />
      <Copyright />
    </div>
    
  );
}


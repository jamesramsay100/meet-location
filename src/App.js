import * as React from 'react';
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
      <Engine />
      <Copyright />
    </div>
    
  );
}


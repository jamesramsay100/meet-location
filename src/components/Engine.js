import * as React from 'react';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import { TextField, Button } from '@mui/material';

const n_person = 3;
const initialValues = {};
const persons = ["person1", "person2", "person3", "person4", "person5"];

persons.forEach(person => { 
    initialValues[person] = ""; 
});


export default function Engine() {

    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        console.log(values);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    };

    return(
        <Container maxWidth="sm" spacing={24}>
            <Box sx={{ my: 4, p:4}}>
                <form>
                    {persons.map((person, i) => {
                        return <TextField
                        key={i}
                        id={person}
                        name={person}
                        label={person}
                        value={values[person]}
                        onChange={handleInputChange}
                        margin="normal"
                        fullWidth
                        />
                    })}
                    <Button 
                        type="submit"
                        onClick={handleSubmit}
                    >Submit</Button>
                </form>
            </Box>
        </Container>
    );
    <Box sx={{ my: 4 }}>

    </Box>

};


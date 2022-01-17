import * as React from 'react';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import { TextField, Button } from '@mui/material';
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from '@mui/icons-material/Clear';

const n_person = 3;
const initialValues = {};
const persons = ["person1", "person2", "person3", "person4", "person5"];

persons.forEach(person => { 
    initialValues[person] = ""; 
});


export default function Engine() {

    const [inputList, setInputList] = useState([{ name: "", address: "" }]);
 
    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
 
    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { name: "", address: "" }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    };

    return(
        <Container maxWidth="md" spacing={24}>
            <Box sx={{ my: 4, p:4}}>

                {inputList.map((x, i) => {
                    return (
                        <div className="box">
                            <TextField
                                name="name"
                                placeholder="Enter Name"
                                value={x.name}
                                onChange={e => handleInputChange(e, i)}
                            />
                            <TextField
                                className="ml10"
                                name="address"
                                placeholder="Enter address"
                                value={x.address}
                                onChange={e => handleInputChange(e, i)}
                            />
                            <IconButton>
                                <ClearIcon onClick={() => handleRemoveClick(i)} />
                            </IconButton>
                        </div>
                    );
                })}
                <Button fullWidth variant='contained' onClick={handleAddClick}>Add person</Button>
                <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
            </Box>
        </Container>
    );

};


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


export default function AddressForm({ setAddresses }) {

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

    // pass up state when we submit address
    const handleSubmit = (e) => {
        e.preventDefault();
        setAddresses(inputList);
    };

    return(
        <Container maxWidth="md" spacing={24}>
            <Box sx={{ my: 4 }}>
                {inputList.map((x, i) => {
                    return (
                        <div className="box" key={i}>
                            <TextField
                                name="name"
                                placeholder="Enter Name"
                                value={x.name}
                                onChange={e => handleInputChange(e, i)}
                            />
                            <TextField
                                // className="ml10"
                                name="address"
                                placeholder="Enter address"
                                value={x.address}
                                onChange={e => handleInputChange(e, i)}
                            />
                            <IconButton onClick={() => handleRemoveClick(i)} >
                                <ClearIcon/>
                            </IconButton>
                        </div>
                    );
                })}
                <Button fullWidth variant='contained' onClick={handleAddClick} key="Add person">Add person</Button>
                <Button fullWidth variant='contained' onClick={handleSubmit}>Submit addresses</Button>
            </Box>
        </Container>
    );

};


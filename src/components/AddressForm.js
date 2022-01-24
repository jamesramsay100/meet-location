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


/**
 * 
 * Simple that takes name and address and passes up to 'address' state in Engine component
 * 
 */
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
        <Box 
        sx={{ 
                p: 1,
                m: 'auto',
                boxShadow: 1,
                fontWeight: 'bold',
             }}
        >
            {inputList.map((x, i) => {
                return (
                    <Box 
                        key={i}                  
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: 'center',
                            justifyContent: 'center',
                            '& > :not(style)': { m: 0.5, p:0.5},
                            boxShadow: 1,
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            name="name"
                            placeholder="Enter Name"
                            value={x.name}
                            onChange={e => handleInputChange(e, i)}
                            // sx={{
                            //     width: '25ch'
                            // }}
                        />
                        <TextField
                            name="address"
                            placeholder="Enter address"
                            value={x.address}
                            onChange={e => handleInputChange(e, i)}
                            // sx={{
                            //     width: '25ch'
                            // }}
                        />
                        <IconButton onClick={() => handleRemoveClick(i)} sx={{width:'24px'}} >
                            <ClearIcon/>
                        </IconButton>
                    </Box>
                );
            })}
            
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& > :not(style)': { m: 0.5 },
                    boxShadow: 1,
                }}
            >
                <Button variant='contained' onClick={handleAddClick} key="Add person" sx={{width: '25ch' }}>Add person</Button>
                <Button variant='contained' onClick={handleSubmit} sx={{width: '25ch' }}>Submit addresses</Button>
                <IconButton 
                    // TODO: reaplce this with unreponsive box
                    onClick={() => handleRemoveClick(i)} 
                    sx={{
                        width:'24px',
                    }}
                >
                    <ClearIcon 
                        sx={{
                            color: 'background.paper',
                        }}
                    />
                </IconButton>
            </Box>
        </Box>
    );
};


import React, { useState, useEffect } from 'react';
import {
FormControl,
FormLabel,
FormHelperText,
Input,
InputLabel,
TextField,
RadioGroup,
FormControlLabel,
Radio,
Button,
CircularProgress,
Snackbar
} from '@material-ui/core';


import axios from 'axios';

export default function NewTransaction() {
  const [transactionType, setTransactionType] = React.useState('1');
  const [quantity, setQuantity] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [quantityValidation, setQuantityValidation] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const onChangeTransactionType = (event) => {
    setTransactionType(event.target.value);
  };

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
    setQuantityValidation(quantity ? true : false);
  };

  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const submitForm = (event) => {
    setQuantityValidation(quantity ? true : false);
    if (quantityValidation == true) {
      setLoading(true);
      let obj = {
        'transactionTypeID': transactionType,
        'description': description ? description : '',
        'quantity': quantity,
      }
      console.log(obj);
      axios.post('http://localhost:8000/api/transaction/new', obj)
        .then(res => {
          console.log(res);
          console.log(res.data);
          setLoading(false);
          setSaved(true);
        })
    }
    
  };

  return (
    <FormControl>
      <TextField 
        onChange={onChangeDescription}
        label="Nombre de la transacción" 
        type="text"
        />
      <FormHelperText>Opcional</FormHelperText>
      <TextField 
          error={!quantityValidation}
          required
          onChange={onChangeQuantity}
          label="Cantidad"
          type="number"
        />
      <RadioGroup aria-label="gender" name="gender1" value={transactionType} onChange={onChangeTransactionType}>
        <FormControlLabel value="1" control={<Radio />} label="Ingreso" />
        <FormControlLabel value="2" control={<Radio />} label="Egreso" />
      </RadioGroup>
      <Button 
        variant="contained"
        onClick={submitForm}
        >Guardar</Button>
        {loading ? <CircularProgress /> : ''}
        {saved ? <h4>¡Guardado!</h4> : ''}
    
    </FormControl>
  );
}
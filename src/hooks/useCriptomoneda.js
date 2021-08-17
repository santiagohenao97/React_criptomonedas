import React, {useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useCriptomoneda = (label, stateInicial, cripto) => {
    //State del custom Hook
    const [state, setState] = useState('')
    
    const SelectCriptomoneda = () =>(
        <> 
            <Label>{label}</Label>
            <Select onChange={ e=> setState(e.target.value)} value={state}>
                <option value ="">Seleccione</option>
                {cripto.map(cripto => (
                    <option key={cripto.CoinInfo.Id} value ={cripto.CoinInfo.Name}>{cripto.CoinInfo.FullName}</option>
                ))}
            </Select>
        </>
    )

   // retornar state, interfaz y fn que modifica al state
   return [state, SelectCriptomoneda]
}

export default useCriptomoneda;
import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border:none;
  width: 100%;
  border-radius: 10px;
  color: #FFF;

  &:hover{
      background-color: #326AC0;
      cursor: pointer;
  }
`;

const Formulario = ({setMoneda, setCripto}) => {

    const [listaCripto, setListaCripto] = useState([])
    const [error, setError] = useState(false)

    const MONEDAS =[
        {codigo: 'USD', nombre: 'Dolar Americano'},
        {codigo: 'MXN', nombre: 'Peso mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra esterlina'},
        {codigo: 'COP', nombre: 'Peso colombiano'},
    ]

    //utilizar useMoneda
    const [moneda,  SelectMoneda] = useMoneda('Elige tu moneda', '', MONEDAS)
    //utilizar useMoneda
    const [criptomoneda,  SelectCriptomoneda] = useCriptomoneda('Elige tu criptomoneda', '', listaCripto)
    //Ejecutar llamada a la API
    useEffect(()=>{
        const consultarAPI = async() => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado  = await axios.get(url)
            setListaCripto(resultado.data.Data)
            console.log(resultado)
        }
        consultarAPI()
    }, [])

    const cotizarMoneda = e =>{
        e.preventDefault()

        if(moneda === '' || criptomoneda === ''){
            setError(true)
            return;
        }

        setError(false)
        //pasar los datos al componente principal
        setMoneda(moneda)
        setCripto(criptomoneda)
    }

    return ( 

        <form onSubmit={cotizarMoneda}>
            {error? <Error mensaje='Todos los campos son obligatorios'/> : null}
            <SelectMoneda/>
            <SelectCriptomoneda/>
            <Boton type="submit" value="Calcular"/>
        </form>

     );
}
 
export default Formulario;
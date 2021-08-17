import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png'
import Formulario from './componentes/Formulario';
import Cotizacion from './componentes/Cotizacion';
import axios from 'axios';
import Spinner from './componentes/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }

`;

function App() {

  const [moneda, setMoneda] = useState('')
  const [cripto, setCripto] = useState('')
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {

    const cotizarCripto = async() =>{
      //evitamos la primera ejecución
      if(moneda === '' || cripto==='') return;
      //consultar la api para la cotización: 
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`
      const resultado = await axios.get(url)

      //mostrar el spinner
      setCargando(true)
      
      setTimeout(()=>{
        setCargando(false)
        setResultado(resultado.data.DISPLAY[cripto][moneda])
      }, 1000)
    }

    cotizarCripto()
  
  }, [moneda, cripto])

  //Mostrar spinner o cotización
  const componente = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado}/>

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen cryptomonedas"/>
      </div>
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Formulario setMoneda={setMoneda} setCripto={setCripto}/>
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;

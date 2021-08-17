import React from 'react';
import styled from '@emotion/styled';

const MensajeError = styled.p`
    background-color: #b7332c;
    padding: 1rem;
    color: #FFF;
    font-size: 20px;
    text-transform: uppercase;
   
    text-align: center;
    font-family: 'Bebas Neue', cursive;
`;

const Error = ({mensaje}) => {
    return ( 
        <MensajeError>{mensaje}</MensajeError>
     );
}
 
export default Error;
import { useState,useEffect } from "react";
import { Row } from "react-bootstrap";


import axios from 'axios';
import CardContrato from "./CardContrato";
import CardPozos from "./CardPozos";
import CardInfoSorteo from "./CardInfoSorteo";

function InformacionContrato() {
    const [contrato, setoContrato] = useState([]); 
    const [pozos, setoPozos] = useState([]); 
    const [sorteo, setSorteo] = useState([]); 

    useEffect(()=>{
        requestInformation();
    },[]) 

    const requestInformation =()=>{
        const baseURL = 'http://127.0.0.1:3000/estadoContrato';
        axios.get(baseURL,{
            headers: {
                'Content-Type': 'application/json', 
            },
        }).then((response) => {
            const data=response.data;
            // console.log(`data: ${JSON.stringify(data, null, 2)}`);
            const contrato = data.contrato;
            // console.log(`contrato: ${contrato} `);
            setoContrato(contrato);
            const pozos = data.pozo;
            setoPozos(pozos);
            const sorteo = data.sorteo;
            setSorteo(sorteo);
            
        })
        .catch(
            function (error) {
                console.log(error);
                alert('fallo la solicitud de datos. '+ error);
            }
        );
    }
    
    return (
        <>
            {sorteo && <CardInfoSorteo sorteo={sorteo}/>}
            {contrato && <CardContrato contrato={contrato}/>}
            {pozos &&<CardPozos pozos={pozos}/> }
        </>
  );
}

export default InformacionContrato;

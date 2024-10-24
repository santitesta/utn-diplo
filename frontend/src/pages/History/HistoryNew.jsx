import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import DataTable from "../../components/DataTable/DataTable";
import { useAccount } from 'wagmi';
import axios from 'axios';

function HistoryNew() {
  const { isConnected,address } = useAccount();
  const [data, setData] = useState([]);
  useEffect(()=>{
    if(isConnected){
      console.log('address: ',address);

      axios.get(`${window.URL_BACKEND}/historial/${address}`)
      .then(response => {
        // Convertir la fecha en cada elemento del historial
        const formattedHistorial = response.data.historial.map(item => {
          const fechaOriginal = new Date(item.fecha);
          const formattedFecha = fechaOriginal.toISOString().replace('T', ' ').slice(0, 19);
          
          // Definir un estilo condicionalmente según el estado
          let formattedEstado = '';
          let estadoStyle = {}; // Objeto de estilos en línea
          if (item.estado === 'confirmada') {
            formattedEstado = 'Confirmada';
            estadoStyle = { color: 'green', fontWeight: 'bold' }; // Verde para confirmada
          } else if (item.estado === 'fallida') {
            formattedEstado = 'Fallida';
            estadoStyle = { color: 'red', fontWeight: 'bold' }; // Rojo para fallida
          }else if (item.estado === 'pendiente') {
            formattedEstado = 'Pendiente';
          }

          const estado_link  =  <a style={estadoStyle} href={`${window.TX_SCAN}/${item.tx_hash}`} target="_blank">{formattedEstado}</a> 
          // Retornar un nuevo objeto con la fecha formateada
          return {
            ...item,
            fecha: formattedFecha,
            estado:estado_link// Texto con estilo embebido
          };
        });

        console.log('Historial del usuario:', formattedHistorial);
        setData(formattedHistorial);
      })
        .catch(error => {
          // Manejar errores
          console.error('Error al obtener el historial:', error);
        });
    }
  },[isConnected,address]);
  const columns = [
    { header: 'Fecha de Compra', accessor: 'fecha' },
    { header: '# Sorteo', accessor: 'sorteo_id' },
    { header: '# Ticket', accessor: 'ticketID' },
    { header: 'Numeros', accessor: 'numeros_elegidos' },
    { header: 'Estado de tx', accessor: 'estado' },
  ];

  return (
    <div>
      <Container fluid className="resume-section">
        <h1>Mi Historial de compras</h1>
        <DataTable columns={columns} data={data} itemsPerPage ={10}/>
      </Container>
    </div>
  );
}

export default HistoryNew;

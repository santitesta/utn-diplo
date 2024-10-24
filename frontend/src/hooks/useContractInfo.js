import { useState, useEffect } from 'react';
import axios from 'axios';

const useContractInfo = () => {
  const [estadoContrato, setEstadoContrato] = useState(null);
  const [owner, setOwner] = useState(null);
  const [pozo, setPozo] = useState(null);
  const [currentDraw, setcurrentDraw] = useState(0);

  useEffect(() => {
    const requestInformation = () => {
      const baseURL = `${window.URL_BACKEND}/estadoContrato`;
      axios.get(baseURL)
        .then((response) => {
          const data = response.data;
           // Solo actualiza estadoContrato si ha cambiado
           if (JSON.stringify(data) !== JSON.stringify(estadoContrato)) {
            setEstadoContrato(data);
          }

          // Solo actualiza owner si ha cambiado
          if (data.contrato.owner !== owner) {
            setOwner(data.contrato.owner);
          }

          // Solo actualiza currentDraw si ha cambiado
          if (data.sorteo.numero !== currentDraw) {
            setcurrentDraw(data.sorteo.numero);
          }

          // Solo actualiza pozo si ha cambiado
          if (data.pozo.primario !== pozo) {
            setPozo(data.pozo.primario);
          }
        })
        .catch((error) => console.error(error));
    };

    requestInformation();
    const intervalId = setInterval(requestInformation, 10000); //Refresco cada 1 segundos
    return () => clearInterval(intervalId);
  }, [pozo]);

  return { estadoContrato, owner, pozo, currentDraw };
};

export default useContractInfo;
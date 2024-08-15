import React from "react";
import CardContrato from "./CardContrato";
import CardPozos from "./CardPozos";
import CardInfoSorteo from "./CardInfoSorteo";

function InformacionContrato({ estadoContrato }) {
    const { contrato, sorteo, pozo } = estadoContrato;
    return (
        <>
            {sorteo && <CardInfoSorteo sorteo={sorteo} isDrawActive = {contrato?.isDrawActive?contrato.isDrawActive:false}/>}
            <hr />
            {contrato && <CardContrato contrato={contrato} />}
            <hr />
            {pozo && <CardPozos pozos={pozo} />} {/* Cambié 'pozos' a 'pozo' */}
        </>
    );
}

export default InformacionContrato;

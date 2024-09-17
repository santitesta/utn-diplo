// contractService.js
import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseAbi, parseEther } from 'viem';
import { config } from '../config/wagmi';
import { watchContractEvent } from '@wagmi/core';
//levanto el abi del
import myAbiJson from './abi_contracts/QuiniBlockContract.sol/QuiniBlockContract.json';
const abi = myAbiJson.abi;

// console.log(abi);



// export function useInicializarSorteo() {
//     const wcInicializarSorteo= useWriteContract({ chainId: 8002});
//     const wfInicializarSorteo = useWaitForTransactionReceipt({ hash: wcInicializarSorteo.data });

//     const inicializarSorteo = async (address,setSorteoID) => {
//         registrarEventosSorteo(setSorteoID,wcInicializarSorteo);
//         wcInicializarSorteo.writeContract({
//             address: address,
//             abi: abi,
//             functionName: 'startDraw',
//         });
//     };

//     return { inicializarSorteo, wcInicializarSorteo, wfInicializarSorteo };
// }


// export async function registrarEventosSorteo(setSorteoID,wcInicializarSorteo) {
//     try {
//         const transactionHash = wcInicializarSorteo.data ? wcInicializarSorteo.data.toString() : null;

//         await watchContractEvent(config, {
//             address: `${window.CONTRACT_ADDRESS}`,
//             abi: abi,
//             eventName: 'DrawStarted',
//             onLogs(logs) {
//                 if (logs[0].args.transactionHash === transactionHash) {
//                     const drawId = logs[0].args.drawId;
//                     // Verificar si drawId es un BigNumber y convertirlo a un número o string
//                     if (drawId) {
//                         setSorteoID(drawId.toNumber ? drawId.toNumber() : drawId); // Conversión de BigNumber a entero
//                     } else {
//                         setSorteoID(null); // Si no hay drawId, se maneja como null
//                     }
//                 }
//             },
//         });
//     } catch (error) {
//         console.error('Error fetching transaction:', error);
//     }
// }

export function useSetearPozos() {
    const wcSetearPozos = useWriteContract({ chainId: 8002});
    const wfSetearPozos = useWaitForTransactionReceipt({ hash: wcSetearPozos.data });

    const setearPozos = (address, pozoPrimario, pozoSecundario, reservePot) => {
        let primaryInWei = BigInt(pozoPrimario * 1e18);
        let secondaryInWei = BigInt(pozoSecundario * 1e18);
        let reserveInWei = BigInt(reservePot * 1e18);
        wcSetearPozos.writeContract({
            address: address,
            abi: abi,
            functionName: 'setPotValues',
            args: [primaryInWei, secondaryInWei, reserveInWei],
        });
    };

    return { setearPozos, wcSetearPozos, wfSetearPozos };
}

// export function useFinalizarSorteo() {
//     const wcFinalizarSorteo = useWriteContract({ chainId: 8002});
//     const wfFinalizarSorteo = useWaitForTransactionReceipt({ hash: wcFinalizarSorteo.data });

//     const finalizarSorteo = (address, numerosGanadores) => {
//         let numerosOrdenados = [...numerosGanadores].sort((a, b) => a - b);
//         wcFinalizarSorteo.writeContract({
//             address: address,
//             abi: abi,
//             functionName: 'emitDraw',
//             args: [numerosOrdenados],
//         });
//     };

//     return { finalizarSorteo, wcFinalizarSorteo, wfFinalizarSorteo };
// }

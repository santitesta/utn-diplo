// contractService.js
import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseAbi, parseEther } from 'viem';
import { config } from '../config/wagmi';
import { watchContractEvent } from '@wagmi/core';

const abi = parseAbi([
    'event TicketPurchased(uint32 ticketId, uint32 drawId, address buyer)',
    'event DrawStarted(uint32 drawId,uint256 _primaryPot);)',
    'function startDraw()',    
    'function setPotValues(uint256 _primaryPot, uint256 _secondaryPot, uint256 _reservePot) payable',
    'function purchaseTicket(uint32[6] _chosenNumbers) payable',
    'function emitDraw(uint32[6] memory _winningNumbers)'
]);

export function useComprarTicket() {
    const wcComprarTicket = useWriteContract({ chainId: 5777 });
    const wfComprarTicket = useWaitForTransactionReceipt({ hash: wcComprarTicket.data });

    const comprarTicket = async (address, numerosOrdenados, setTicketID) => {
        registrarEventos(setTicketID,wcComprarTicket);
        wcComprarTicket.writeContract({
            address: address,
            abi: abi,
            functionName: 'purchaseTicket',
            args: [numerosOrdenados],
            value: parseEther('1')
        });
    };

    return { comprarTicket, wcComprarTicket, wfComprarTicket };
}


export async function registrarEventos(setTicketID,  wcComprarTicket) {
    try {
        await watchContractEvent(config, {
            address: `${window.CONTRACT_ADDRESS}`,
            abi: abi,
            eventName: 'TicketPurchased',
            onLogs(logs) {
                if (logs[0].args.transactionHash === wcComprarTicket.data) {
                    setTicketID(logs[0].args.ticketId);
                }
            },
        });
    } catch (error) {
        console.error('Error fetching transaction:', error);
    }
}

export function useInicializarSorteo() {
    const wcInicializarSorteo= useWriteContract({ chainId: 5777 });
    const wfInicializarSorteo = useWaitForTransactionReceipt({ hash: wcInicializarSorteo.data });

    const inicializarSorteo = async (address,setSorteoID) => {
        registrarEventosSorteo(setSorteoID,wcInicializarSorteo);
        wcInicializarSorteo.writeContract({
            address: address,
            abi: abi,
            functionName: 'startDraw',
        });
    };

    return { inicializarSorteo, wcInicializarSorteo, wfInicializarSorteo };
}


export async function registrarEventosSorteo(setSorteoID,wcInicializarSorteo) {
    try {
        await watchContractEvent(config, {
            address: `${window.CONTRACT_ADDRESS}`,
            abi: abi,
            eventName: 'DrawStarted',
            onLogs(logs) {
                if (logs[0].args.transactionHash === wcInicializarSorteo.data) {
                    setSorteoID(logs[0].args.drawId);
                }
            },
        });
    } catch (error) {
        console.error('Error fetching transaction:', error);
    }
}

// export function useInicializarSorteo() {
//     const wcInicializarSorteo = useWriteContract({ chainId: 5777 });
//     const wfInicializarSorteo = useWaitForTransactionReceipt({ hash: wcInicializarSorteo.data });

//     const inicializarSorteo = (address) => {
//         wcInicializarSorteo.writeContract({
//             address: address,
//             abi: abi,
//             functionName: 'startDraw',
//         });
//     };

//     return { inicializarSorteo, wcInicializarSorteo, wfInicializarSorteo };
// }



export function useSetearPozos() {
    const wcSetearPozos = useWriteContract({ chainId: 5777 });
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

export function useFinalizarSorteo() {
    const wcFinalizarSorteo = useWriteContract({ chainId: 5777 });
    const wfFinalizarSorteo = useWaitForTransactionReceipt({ hash: wcFinalizarSorteo.data });

    const finalizarSorteo = (address, numerosGanadores) => {
        let numerosOrdenados = [...numerosGanadores].sort((a, b) => a - b);
        wcFinalizarSorteo.writeContract({
            address: address,
            abi: abi,
            functionName: 'emitDraw',
            args: [numerosOrdenados],
        });
    };

    return { finalizarSorteo, wcFinalizarSorteo, wfFinalizarSorteo };
}

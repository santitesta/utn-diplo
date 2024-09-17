// finalizarSorteoService.js
import { useState, useEffect } from 'react';
import { 
    useWaitForTransactionReceipt, 
    useWriteContract 
  } from 'wagmi'

import { config } from '../config/wagmi';
import { watchContractEvent } from '@wagmi/core';
import myAbiJson from './abi_contracts/QuiniBlockContract.sol/QuiniBlockContract.json';
const abi = myAbiJson.abi;

export function useFinalizarSorteo() {
    const [winners, setWinners] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const { data: hash, writeContract, error ,isError,isPending:wcPending ,isSuccess} = useWriteContract(config);
    const {isSuccess:wftSuccess, isPending:wftPending}= useWaitForTransactionReceipt({ hash, config });
    const wft= useWaitForTransactionReceipt({ hash, config });

    const [returnedWinners, setReturnedWinners] = useState([]);
    const [transactionHash, setTransactionHash] = useState(null);
    const [errorMessage  , setErrorMessage ] = useState(null);

    // useEffect(() => {
    //     if(wft.data){
    //         console.log('wft finalizar',wft);
    //     }
    // },[wft]);
    //logica de pendiente
    useEffect(() => {
        //inicia cuando mando a firmar la tx
        if(wcPending && !isPending)
        {   
            setIsPending(true);
        }
        // luego se mantiene hasta que finaliza la confirmacion o falla
        if(isPending && !wftPending || isError)
        {
            setIsPending(false);
        }
        
    }, [wcPending,wftPending]);

    const unwatchEventFinalizar = watchContractEvent(config, {
      address: `${window.CONTRACT_ADDRESS}`,
      abi: abi,      
      eventName: '*** DrawDone (uint32 drawId, uint256 drawDate, uint32[6] winningNumbers, address[] winners)',
      strict: true, 
      onLogs(logs) {
        if(logs[0].eventName == "DrawDone"){
            setTransactionHash(logs[0].transactionHash)
            setWinners(logs[0].args.winners.toString()); 
        }
      },
    })

    useEffect(() => {
        if(transactionHash&&winners&&hash)
        {
            if(hash.toUpperCase() == transactionHash.toUpperCase())
            {
                setReturnedWinners(winners);
            }
        }
    }, [hash,winners,transactionHash]);
   
    useEffect(() => {
        if(isError){
            setReturnedWinners([0x00]);
            setErrorMessage(error);
        }
    }, [error,isError]);
    

    const finalizarSorteo = async (address, numerosGanadores)=> {
        let numerosOrdenados = [...numerosGanadores].sort((a, b) => a - b);
        try {
            await writeContract({
                address: address,
                abi: abi,
                functionName: 'emitDraw',
                args: [numerosOrdenados],
            });
            unwatchEventFinalizar();
        } catch (error) {
            console.error('Error en finalizarSorteo:', error);
        }
        
    };

    return { finalizarSorteo, returnedWinners, isSuccess, isPending, hash,isError, errorMessage };
}
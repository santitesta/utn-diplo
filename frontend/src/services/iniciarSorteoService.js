// iniciarSorteoService.js
import { useState, useEffect } from 'react';
import { 
    useWaitForTransactionReceipt, 
    useWriteContract 
  } from 'wagmi'

import { config } from '../config/wagmi';
import { watchContractEvent } from '@wagmi/core';
import myAbiJson from './abi_contracts/QuiniBlockContract.sol/QuiniBlockContract.json';
const abi = myAbiJson.abi;

export function useInicializarSorteo() {
    const [sorteoID, setSorteoID] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { data: hash, writeContract, error ,isError,isPending:wcPending ,isSuccess} = useWriteContract(config);
    const {isSuccess:wftSuccess, isPending:wftPending}= useWaitForTransactionReceipt({ hash, config });

    const [returnedSorteoID, setReturnedSorteoID] = useState(null);
    const [transactionHash, setTransactionHash] = useState(null);
    const [errorMessage  , setErrorMessage ] = useState(null);


    const unwatchEvent = watchContractEvent(config, {
      address: `${window.CONTRACT_ADDRESS}`,
      abi: abi,      
      eventName: '*** DrawStarted (uint32 drawId, uint256 _primaryPot)',
      strict: true, 
      onLogs(logs) {
        setTransactionHash(logs[0].transactionHash)
        setSorteoID(logs[0].args.drawId.toString()); 
      },
    })
    // useEffect(() => {
    //     if(wft.data){
    //         console.log('wft ini',wft);
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

    useEffect(() => {
        if(transactionHash&&sorteoID&&hash)
        {
            if(hash.toUpperCase() == transactionHash.toUpperCase())
            {
                setReturnedSorteoID(sorteoID);
            }
        }
    }, [hash,sorteoID,transactionHash]);
   
    useEffect(() => {
        if(isError){
            setReturnedSorteoID(-1);
            setErrorMessage(error);
        }
    }, [error,isError]);
    

    const inicializarSorteo = async (address) => {
        try {
            await writeContract({
                address: address,
                abi: abi,
                functionName: 'startDraw',
            });
            unwatchEvent();
        } catch (error) {
            console.error('Error en inciarSorteo:', error);
        }
        
    };

    return { inicializarSorteo, returnedSorteoID, isSuccess, isPending, hash,isError, errorMessage };
}

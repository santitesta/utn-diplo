// comprarTicketService.js
import { useState, useEffect } from 'react';
import { 
    BaseError,
    useWaitForTransactionReceipt, 
    useWriteContract 
  } from 'wagmi'
import { parseEther,parseGwei } from 'viem';

import { config } from '../config/wagmi';
import { watchContractEvent } from '@wagmi/core';
import myAbiJson from './abi_contracts/QuiniBlockContract.sol/QuiniBlockContract.json';
const abi = myAbiJson.abi;

export function useComprarTicket() {
    // const [enConfirmacion, setEnConfirmacion] = useState(false);
    const [ticketID, setTicketID] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { data: hash, writeContract, error ,isError,isPending:wcPending ,isSuccess:wcSuccess} = useWriteContract(config);
    const {isSuccess, isPending:wftPending}= useWaitForTransactionReceipt({ hash, config }); //el success es mejor si usa el de la configrmacion de tx
    const [returnedTicketID, setReturnedTicketID] = useState(null);
    const [transactionHash, setTransactionHash] = useState(null);
    const [errorMessage  , setErrorMessage ] = useState(null);


    const unwatchEvent = watchContractEvent(config, {
      address: `${window.CONTRACT_ADDRESS}`,
      abi: abi,      eventName: '*** TicketPurchased (uint32 ticketId, uint32 drawId, address buyer)',
      strict: true, 
      onLogs(logs) {
        //console.log('New *** TicketPurchased', logs)
        setTransactionHash(logs[0].transactionHash)
        setTicketID(logs[0].args.ticketId.toString()); 
      },
    })

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
        if(transactionHash&&ticketID&&hash)
        {
            if(hash.toUpperCase() == transactionHash.toUpperCase())
            {
                setReturnedTicketID(ticketID);
            }
        }
    }, [hash,ticketID,transactionHash]);
   
    useEffect(() => {
        if(isError){
            //console.log(error);
            setReturnedTicketID(-1);
            setErrorMessage(error);
        }
        //console.log(isError )
    }, [error,isError]);
    // Función para comprar el ticket
    const comprarTicket = async (address, numerosOrdenados, ticketPrice) => {
        const priceInEther = parseEther(ticketPrice);
        try {
            
            await writeContract({
                address: address,
                abi: abi,
                functionName: 'purchaseTicket',
                args: [numerosOrdenados],
                value: priceInEther,  
            });
            unwatchEvent();
        } catch (error) {
            console.error('Error en comprarTicket:', error);
        }
        
    };

    return { comprarTicket, returnedTicketID, isSuccess, isPending, hash,isError, errorMessage };
}
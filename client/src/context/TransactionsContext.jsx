import React, {useEffect, useState} from 'react';
import { ethers } from 'ethers';

import { contractAbi, contractAddress } from '../utils/constants';

export const TransactionsContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.GetSigner();
    const transactionContract =   new ethers.Contract(contractAddress,contractAbi,signer);


    console.log({
        provider,
        signer,
        transactionContract
    })
}

export const TransactionProvider = ({children})=>{
    const [connectedAccount, setConnectedAccount] = useState('')
    
    const checkIfWalletIsConnected = async () =>{
        if(!ethereum) return alert('Wallet is not connected, please install MetaMask');
        
        const accounts = await ethereum.request({method:'eth_accounts'})
        
        console.log(accounts)
    }
    
    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Wallet is not connected, please install MetaMask");
            
            const accounts = await ethereum.request({ method:'eth_requestAccounts',});
            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log(error)

            throw new Error('no ethereum object')
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    },[])

    return(
        <TransactionsContext.Provider value ={{connectWallet}}>
            {children}
        </TransactionsContext.Provider>
    )
}
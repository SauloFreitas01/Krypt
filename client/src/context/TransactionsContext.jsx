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
    const [currentAccount, setCurrentAccount] = useState('')
    
    const checkIfWalletIsConnected = async () =>{
       try {
           
          if(!ethereum) return alert('Wallet is not connected, please install MetaMask');
        
          const accounts = await ethereum.request({method:'eth_accounts'})
        
          if(accounts.lenght){
            setCurrentAccount(accounts[0]);
            // getAllTransations();
          }else{
            console.log('no accounts found')
        }
          console.log(accounts)
       } 
       catch (error) {
        console.log(error)

        throw new Error('no ethereum object')
       }
       
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
        <TransactionsContext.Provider value ={{connectWallet, currentAccount}}>
            {children}
        </TransactionsContext.Provider>
    )
}
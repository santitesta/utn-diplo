import { http, createConfig } from 'wagmi';
import { localhost as originalLocalhost } from 'wagmi/chains'; //
import { injected, walletConnect } from 'wagmi/connectors';
import { createWeb3Modal } from '@web3modal/wagmi/react'
// import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
const projectId = 'ecdd81a82c458b86628c0d3e48e6171c';

//configuro para usar localhost Ganache
 const localhost = {
     ...originalLocalhost,
     rpcUrls: {
       default: { http: ['http://127.0.0.1:7545'] }, // Cambiado a 7545
     },
  }
const metadata = {
    name: 'QuiniBlock',
    description: 'QuiniBlock de The FiveBlocks!',
    url: 'https://QuiniBlock.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}
  
const chains = [localhost] 

export const config = createConfig({
  chains: [localhost],
  connectors: [injected(), walletConnect({ projectId })],
  transports: {
    [localhost.id]: http(),
  },
});

// 3. Create modal
createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
    themeVariables: {
      '--w3m-accent': '#c770f0', //Color usado en el boton de conectar
    }
  })
  
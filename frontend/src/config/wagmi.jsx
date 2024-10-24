import { http, createConfig } from 'wagmi';
import { localhost as originalLocalhost, polygonAmoy} from 'wagmi/chains'; //

import { injected } from 'wagmi/connectors'; //, walletConnect
import { createWeb3Modal } from '@web3modal/wagmi/react'
// import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Your WalletConnect Cloud project ID

const projectId = 'ecdd81a82c458b86628c0d3e48e6171c';
//https://polygon-amoy.g.alchemy.com/v2/hNPbkU-NvBYB1-lLHafI3SbTduYNPKbz
//https://rpc-amoy.polygon.technology
// //configuro para usar localhost Ganache
const myPolygonAmoy = {
    ...polygonAmoy,
    nativeCurrency: { name: 'POL', symbol: 'POL', decimals: 18 }, //Corrigiendo a POL
    rpcUrls: {
      default: { http: ['https://rpc-amoy.polygon.technology'] }, // Cambiado a 7545
    },
 }
const metadata = {
    name: 'QuiniBlock',
    description: 'QuiniBlock de The FiveBlocks!',
    url: 'https://QuiniBlock.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}
  
// const chains = [localhost] 

export const config = createConfig({
  chains: [myPolygonAmoy],
  connectors: [injected()], //, walletConnect({ projectId })
  transports: {
    [polygonAmoy.id]: http(),
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
  
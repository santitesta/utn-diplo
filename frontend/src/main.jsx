import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { structuralSharing } from '@wagmi/core/query';

import { config } from './config/wagmi';

//const queryClient = new QueryClient();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      structuralSharing,
    },
  },
});

window.CONTRACT_ADDRESS= '0x8c65ee76addbef9b2342e9bc2f759e6a7f894d63'; //contrato proxy 
window.URL_BACKEND= 'http://127.0.0.1:5000';
window.CHAIN_ID = 80002;
window.TX_SCAN = 'https://amoy.polygonscan.com/tx';
window.SYMBOL =config.chains[0].nativeCurrency.symbol;
window.TEST =false;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
)

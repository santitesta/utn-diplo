import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { config } from './config/wagmi';

const queryClient = new QueryClient();

window.CONTRACT_ADDRESS= '0x8F13cFA55dF60874CE2Ba3e56F6239a40C7Ae1Bd';
window.URL_BACKEND= 'http://127.0.0.1:3000';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
)

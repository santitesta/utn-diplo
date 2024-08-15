import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import './index.css'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { config } from './wagmi';

const queryClient = new QueryClient();

window.CONTRACT_ADDRESS= '0x3f7b6D6E76dAe57e740b4458AC8057575F479c74';
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

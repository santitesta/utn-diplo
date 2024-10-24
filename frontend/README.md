# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Theme 
My personal portfolio <a href="https://soumyajit.vercel.app/" target="_blank">soumyajit.tech</a> 

# Como ejecutar el codigo? 
## hay alguna libreria typescript que esta discontinuada(deprecated) por eso uso el legacy-peer-deps
    npm install --legacy-peer-deps

## Configuracion previa en el src/main.jsx con datos correspondiente

window.CONTRACT_ADDRESS= '0x481636196bb539bBc81A05F8a23c52F107f6b8d7';
window.URL_BACKEND= 'http://127.0.0.1:3000';

## correr de consola
    npm run dev

# ProjectID 
## usando wallectconnect para lo cual genere un id, no se si tengo que darle permisos compartidos pero supongo que como esta configurado deberian loguearse

1. Get projectId from https://cloud.walletconnect.com
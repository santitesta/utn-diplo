import React from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes
import { useChainId, useConnect } from 'wagmi';

// Componente principal que muestra los botones de conexión
export function Connect() {
  const chainId = useChainId();
  const { connectors, connect } = useConnect();

  return (
    <div className="container-conection">
      <h3>Conectarse</h3>
      <div className="set">
        {connectors.map((connector) => (
          <ConnectorButton
            key={connector.uid}
            connector={connector}
            onClick={() => connect({ connector, chainId })}
          />
        ))}
      </div>
    </div>
  );
}

// Componente para cada botón de conexión
function ConnectorButton({ connector, onClick }) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button disabled={!ready} onClick={onClick} type="button">
      {connector.name}
    </button>
  );
}

// Definir PropTypes para la validación de los props en ConnectorButton
ConnectorButton.propTypes = {
  connector: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    getProvider: PropTypes.func.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

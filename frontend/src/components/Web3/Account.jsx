import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import myImg from "../../assets/images/avatar.svg";
import myUnknow from "../../assets/images/user-unknow.svg";

import useContractInfo from "../../hooks/useContractInfo";


function formatAddress(address,owner) {
  if (!address) return null;
  if (address === owner) {
    return 'THE FIVEBLOCKS! (OWNER)';
  }
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export default function Account() {
  const { owner} = useContractInfo();
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const isOwner = (address==owner)
  const formattedAddress = formatAddress(address,owner);

  return (
    <div className="container-conection" >
      <div className="row">
        <div>
          {(isOwner)?
            (<img alt="TheFiveBlocks!" className="avatar" src={myImg} />):          
          ensAvatar ? (
            <img alt="ENS Avatar" className="avatar" src={ensAvatar} />
          ) : (
            <img alt="Sin Registrar" className="avatar" src={myUnknow} />
          )}
          <div className="stack">
            {address && (
              <div className="text">
                {ensName
                  ? `${ensName} (${formattedAddress})`
                  : formattedAddress}
              </div>
            )}
            <div className="subtext">
              Conectado a travez de {connector?.name}
            </div>
          </div>
        </div>
        <button className="button" onClick={() => disconnect()} type="button">
          Desconectar
        </button>
      </div>
    </div>
  );
}

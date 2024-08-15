import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import myImg from "../assets/avatar.svg";


function formatAddress(address,owner) {
  if (!address) return null;
  if (address.toLowerCase() === owner.toLowerCase()) {
    return 'THE FIVEBLOCKS! (OWNER)';
  }
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}


export default function Account({owner}) {
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });

  const formattedAddress = formatAddress(address,owner);

  return (
    <div className="container-conection" >
      <div className="row">
        <div>

          {(address.toLowerCase() === owner.toLowerCase())?(<img alt="TheFiveBlocks!" className="avatar" src={myImg} />):          
          ensAvatar ? (
            <img alt="ENS Avatar" className="avatar" src={ensAvatar} />
          ) : (
            <div className="avatar" />
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
              Connected to {connector?.name} Connector
            </div>
          </div>
        </div>
        <button className="button" onClick={() => disconnect()} type="button">
          Disconnect
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { connectToPhantom, connectToWallet } from '../utils/walletProvider';

function ConnectBtn() {
  const [phmAddress, setPhmAddress] = useState(false);
  const [mmAddress, setMMAddress] = useState(false);
  const [usrAddr, setUserAddress] = useState('');
  useEffect(() => {
    if (sessionStorage.getItem('usrAddr')?.length! > 0) {
      setUserAddress(sessionStorage.getItem('usrAddr')!);
      if (sessionStorage.getItem('usrAddr')?.slice(0, 2) !== '0x') {
        setPhmAddress(true);
      } else {
        setMMAddress(true);
      }
    }
    // if (sessionStorage.getItem('phtmAddr')?.length! > 0) {
    //   setPhmAddress(sessionStorage.getItem('phtmAddr')!);
    // }
  });
  async function handleClickForMM() {
    if (sessionStorage.getItem('usrAddr')?.length! > 0) {
      sessionStorage.removeItem('usrAddr');
      // setPhmAddress('');
      setUserAddress('');
    }
    const usrAccount = await connectToWallet();
    setMMAddress(true);
    setPhmAddress(false);
    setUserAddress(usrAccount.acc);
    window.location.reload();
    sessionStorage.setItem('usrAddr', usrAccount.acc);
  }
  async function handleClickForPHM() {
    if (sessionStorage.getItem('usrAddr')?.length! > 0) {
      sessionStorage.removeItem('usrAddr');
      // setMMAddress('');
      setUserAddress('');
    }
    const phtmUsrAddrs = await connectToPhantom();
    if (phtmUsrAddrs.flag) {
      setPhmAddress(true);
      setMMAddress(false);
      setUserAddress(phtmUsrAddrs.msg);
      window.location.reload();
      sessionStorage.setItem('usrAddr', phtmUsrAddrs.msg);
    }
  }
  return (
    <>
      <button
        onClick={handleClickForMM}
        className="inline-flex justify-center rounded-full border-2 border-slate-400 m-2 p-1"
      >
        {mmAddress ? usrAddr.slice(0, 12) : <p>Connect To MetaMask</p>}
      </button>
      <button
        onClick={handleClickForPHM}
        className="inline-flex justify-center rounded-full border-2 border-slate-400 m-2 p-1"
      >
        {phmAddress ? usrAddr.slice(0, 12) : <p>Connect To Phantom</p>}
      </button>
    </>
  );
}

export default ConnectBtn;

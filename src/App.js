import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Explore from './components/Explore'
import Create from './components/Create'
import MyNfts from './components/MyNfts'
import MyPurchases from './components/MyPurchases'
import MarketplaceAbi from './contractsData/Marketplace.json'
import MarketplaceAddress from './contractsData/Marketplace-address.json'
import NFTAbi from './contractsData/Nft.json'
import NFTAddress from './contractsData/Nft-address.json'
import React, { useState, useEffect } from 'react'
import { ethers } from "ethers"

import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);

  const [connectButtonText, setConnectButtonText] = useState("Connect Wallet");
  const [logoutText, setLogoutText] = useState(null);

  const [nft, setNFT] = useState(null);
  const [marketplace, setMarketplace] = useState(null);

  // MetaMask Login/Connect
  const login = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const { chainId } = await provider.getNetwork();
    if (chainId == 4) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0])
      const signer = provider.getSigner()
      loadContracts(signer);
      localStorage.setItem('loggedIn', true);
      setConnectButtonText("Connected");
      setLogoutText('Logout');
    } else {
      alert('Please connect to Rinkeby network');
    }
  }

  /************************************* On Page Load *******************************************/

  useEffect(() => {
    const onPageLoad = async () => {
        if (localStorage?.getItem('loggedIn')) {
            await login();
        }
     }
     onPageLoad();
   }, []);

/************************************* On Account Change *******************************************/

  window.ethereum.on('accountsChanged', async () => {
    document.location.reload()
  })

  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft);
    setLoading(false);
  }

  const logout = () => {  
    setMarketplace(null);
    setNFT(null);
    setAccount(null);
    localStorage.setItem('loggedIn', false);
    setConnectButtonText('Connect Wallet');
    setLogoutText(null);
  }

  return (
    <BrowserRouter>
      <div className="App background">

        <Navbar 
          login={login} 
          logout = {logout} 
          account={account} 
          logoutText={logoutText}
          connectButtonText={connectButtonText}
        />

        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                <Create marketplace={marketplace} nft={nft} />
              } />
              <Route path="/explore" element={
                <Explore marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/my-nfts" element={
                <MyNfts marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/my-purchases" element={
                <MyPurchases marketplace={marketplace} nft={nft} account={account} />
              } />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
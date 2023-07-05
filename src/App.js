import './App.css';

import { abi, CONTRACT_ADDRESS } from "./constants/index";
import { useEffect, useRef, useState } from 'react';
import { ethers, Contract, providers, utils } from "ethers";
import Card from './components/Card';
import Navigation from './components/Navbar';
import SeatChart from './components/SeatChart';
import Sort from './components/Sort';

function App() {


  const [account, setAccount] = useState(null);
  const [shows, setShows] = useState([]);
  const [show, setShow] = useState({});
  const [toggle, setToggle] = useState(false);
  const [ticketAr, setTicketAr] = useState(null);
  const [provider, setProvider] = useState(null);
  



  const loadBlockchainData = async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const ticketAr = new Contract(
      CONTRACT_ADDRESS,
      abi,
      provider
    );
    setTicketAr(ticketAr);
    console.log(ticketAr)
    const totalShows = await ticketAr.totalShows();
    const totalSupply = await ticketAr.totalSupply();
    const shows = [];
    console.log(totalSupply.toString())
    for(let i = 1; i<= totalShows; i++){
      const show = await ticketAr.getShow(i);
      shows.push(show);
      
    }
    setShows(shows);
    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account)
    })

  }


  useEffect(()=>{
    loadBlockchainData();
  },[])



  return (
    <div className="App">
      <header>
        <Navigation shows={shows} account={account} setAccount={setAccount} toggle={toggle} setToggle={setToggle}  ticketAr={ticketAr} provider={provider}/>
      </header>
      <h2 className='header__title'>Event Tickets</h2>
      <Sort className='sort'/>
      <div className='cards'>
          {shows.map((show, index)=>{
            return (
            <div key={index}>
              <Card 
              show={show}
              setShow={setShow}
              id={index + 1}
              setToggle={setToggle}
              />
            </div>)
          })}
      </div>
      {toggle && (
        <SeatChart
          show={show}
          ticketAr={ticketAr}
          provider={provider}
          setToggle={setToggle}
          />
      )}
    </div>
  );
}

export default App;

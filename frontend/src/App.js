
import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contract from './Greeter.sol/Greeter.json';


function App() {
  const { ethereum } = window;
  const [address, setAddress] = useState('Connect Wallet');
  const [balance, setBalance] = useState('')
  const [greeting, setGreeting] = useState('')

  //delpoyed Address
  const contractAddress = "0xC1e4613461DD34Aa5Dc1c45bC1562a93b0A40094";
  // this Infura Api help get data 
  const infuraProvider = new ethers.providers.JsonRpcProvider(
    'https://goerli.infura.io/v3/d01eae2eece9458b96beabad3d7514ac'
  )
  // wallet get window
  const walletProvider = new ethers.providers.Web3Provider(
    ethereum
  )
  const getContractData = new ethers.Contract(
    contractAddress,
    contract.abi,
    infuraProvider
  )
  const sendContractData = new ethers.Contract(
    contractAddress,
    contract.abi,
    (walletProvider.getSigner())
  )


  // call the events
  useEffect(() => {
    ethereum.on('accountsChanged', (accounts) => { 
      setAddress(accounts[0])
      const getBal = async () =>  {
        const balance = await ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest']
        });
        setBalance(ethers.utils.formatEther(balance));
      }
      getBal();
    })
    ethereum.on("chainChanged", (chain) =>{
      console.log(chain)
    })
  })

  const switchChanged = async() => {
    await ethereum.request({method: "wallet_switchEthereumChain",
    params: [{
      chainId: `0xaa36a7`
    }]
})
}



const chainChanged = async() => {
  await ethereum.request({method: "wallet_addEthereumChain",
  params: [{
    chainId: `0x13881`,
    chainName: "Polygon Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    repUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
  }]
})
} 

const sendTx  = async () => {
  await ethereum.request({method: 'eth_sendTransaction',
 params: [{
  to: '0xE10bF9d48FB98f562ba50db77fF75cc41fDD4e4f',
  from: address,
  //value: '0xDE0B6B3A7640000', // value in Hexadecimal dacimal input 0.5 ether10*18 to wei 100000000 =SB9AC00
  value: `0x${(parseInt(ethers.utils.parseEther('0.1'))).toString(16)}`,
  chainId: '0xaa36a7'
}]
})
}

const getGreeting = async () => {
  const data = await getContractData.greet();
  setGreeting(data)
} 
const setData = async () => {
  const senddata = await sendContractData.setGreeting("Welcome world biggest Soical Media BlockChain");
  setGreeting(senddata)
} 



  // make a function in onclick function in request account
  //"Connecting" or "logging in" to MetaMask effectively means "to access the user's Ethereum account(s)".
  const requestAccount = async () => {
    // const accounts = await ethereum.request({
    //   method: 'eth_requestAccounts',
    //   params: [{
    //     eth_accounts: {}
    //   }]
    // });
    const accounts = await ethereum.request({method: "eth_requestAccounts"})
    setAddress(accounts[0]);

    const balance = await ethereum.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest']
    });
    setBalance(ethers.utils.formatEther(balance));
  }
  return (
    <div className="App">
      <header className="App-header">
        <a className="App-link"
          onClick={requestAccount} >
          {address}
        </a>
        <button className="App-link"
          onClick={chainChanged} >
         add Chain
        </button>
        <button className="App-link"
          onClick={switchChanged} >
        Switch Chain
        </button>
        <button className="App-link"
          onClick={sendTx} >
        Send Transaction
        </button>
        <button className="App-link"
          onClick={getGreeting} >
        Get Greeting
        </button>
        <button className="App-link"
          onClick={setData}>
        Set Greeting
        </button>
        <p className="App-link">
          {greeting}
        </p>

        <p className="App-link">
          {balance}
        </p>

      </header>
    </div>
  );
}

export default App;

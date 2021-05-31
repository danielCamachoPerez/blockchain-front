import { useEffect, useState } from "react"
import {myKey, bitcoinWallet,ethereumWallet} from '../services/keygenerator'
import {Link} from 'react-router-dom'

const Home = () => {
    const crypto =[
        {
            id:1,
            name:'Bitcoin',
            value:'bitcoin',
        },
        {
            id:2,
            name:'Ethereum',
            value:'ethereum',
        },
        {
            id:3,
            name:'Pejecoin',
            value:'pejecoin',
        }
    ]

    const [publicKey,setpublicKey]=useState('')
    const [privateKey,setPrivateKey]=useState('')
    const [wallet,setWallet]=useState([])
    const [myWallet,setMyWallet]=useState({
        name:'',
        public_key:'',
        private_key:'',
        user:sessionStorage.getItem('idUser'),
    })

    useEffect(()=>{
        getWallets()
    },[])

    const getKey =()=>{
        if(myWallet.name===''){
            return alert('select wallet!')
            //return console.log('select wallet!')
        }
        const bitCoin =()=>{
            console.log('bitcoin')
            const {bitcoinAddress,bitcoinSign}=bitcoinWallet()
            setpublicKey(bitcoinAddress.toString())
            setPrivateKey(bitcoinSign.toString())
            myWallet.public_key=bitcoinAddress
            myWallet.private_key=bitcoinSign
        }
        const eThereum =()=>{
            console.log('ethereum')
            const {ethereumAddres,ethereumSign}=ethereumWallet()
            setpublicKey(ethereumAddres.toString())
            setPrivateKey(ethereumSign.toString())
            myWallet.public_key=ethereumAddres
            myWallet.private_key=ethereumSign
        }
        const homeCoin =()=>{
            console.log('homecoin')
            const {publicKey,privateKey}=myKey()
            setpublicKey(publicKey.toString())
            setPrivateKey(privateKey.toString())
            myWallet.public_key=publicKey
            myWallet.private_key=privateKey
        }
        switch (myWallet.name) {
            case 'Bitcoin':bitCoin()
                break;
            case 'Ethereum':eThereum()
                break;

            case 'Pejecoin':homeCoin()
                break;
            
            default:console.log('select a wallet!')
                break;
        }
    }

    const handleChange=(e)=>{
        setMyWallet({
            ...myWallet,
            [e.target.name]:e.target.value,
        })
    }

    const createWallet = async()=>{
        const token = sessionStorage.getItem('token')
        const url = 'http://localhost:4000/wallets/create'
        const myHeaders ={
            method: 'POST',
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                mode:'cors',
                autorization:token
               },
            body: JSON.stringify(myWallet),
          }
        if(myWallet.name===''||myWallet.name==='error'||myWallet.public_key===''||myWallet.private_key===''||myWallet.user===''){
            return console.log('error')
        }
        const request = await fetch(url,myHeaders)
        const response =await request.json()
        console.log(response.message)
        window.location.href='/home'
    }

    const submitCrypto=(e)=>{
        e.preventDefault()
        createWallet()
    }

    const getWallets = async()=>{
        const token = sessionStorage.getItem('token')
        const idUser = sessionStorage.getItem('idUser')
        const url = 'http://localhost:4000/wallets/walletslist/'+idUser
        const myHeaders ={
            method: 'GET',
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              mode:'cors',
              autorization:token
             },
        }
        const request=await fetch(url,myHeaders)
        const response = await request.json()
        setWallet(response)
    }
    return (
        <div className='container'>
            <h1>Welcome home, {sessionStorage.getItem('name')}</h1>
            <h3>Your Wallets: </h3>
            <ul>
                {wallet.map(wallet=>(
                    <li key={wallet._id}>
                        {wallet.name} 
                        <span style={{marginLeft:'15px'}}>
                            <Link to={`/transaction/${wallet._id}`}>new transaction</Link>
                        </span>
                        <span style={{marginLeft:'15px'}}>
                            <Link to={`/details/${wallet._id}`}>show details</Link>
                        </span>
                    </li>
                ))}
            </ul>

            <h2>Add new Wallet:</h2>
            <form onSubmit={submitCrypto}>
                <div>
                    <select name='name' onChange={handleChange}>
                        <option value="error">--Select crypto--</option>
                        {crypto.map(crypto=>(<option key={crypto.id} value={crypto.name}>{crypto.name}</option>))}
                    </select>
                </div>
                <div className='mr-t-1'>
                    <label>public key</label>
                    <input style={{width:'940px'}} name='public_key' type="text" defaultValue={publicKey} disabled required />
                </div>
                <div className='mr-t-1'>
                    <label>private key</label>
                    <input style={{width:'500px'}} name='private_key' type="text" defaultValue={privateKey} disabled required />
                </div>
                <div className="mr-t-1">
                    <button type='button' onClick={getKey}>generate keys</button>
                </div>
                <div className='mr-t-1'>
                    <input type="submit" value="create wallet" />
                </div>
            </form>
            <div>
                <Link to='/import'><h3>Import Wallet</h3></Link>
            </div>
        </div>
    );
}

export default Home;
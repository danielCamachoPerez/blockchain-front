import { useEffect, useState } from "react"
import {myKey, bitcoinWallet,ethereumWallet} from '../services/keygenerator'
import {Link} from 'react-router-dom'
import { Container, Content, Formulary, Img } from './Styles'
import { crypto } from '../services/AllWallets'
import {BiWallet} from 'react-icons/bi'
import {VscKey} from 'react-icons/vsc'
import {GiBank} from 'react-icons/gi'
import Swal from "sweetalert2"
//import SideBar from './SideBar'

const Home = () => {
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
        if(myWallet.name==='' || wallet.name==='error'){
            return Swal.fire(
                'Select a Wallet!',
                '',
                'error'
              )
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

            case 'Homecoin':homeCoin()
                break;
            
            default:Swal.fire(
                'Select a Wallet!',
                '',
                'error'
              )
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
            return Swal.fire(
                'Select a Wallet!',
                '',
                'error'
              )
        }
        const request = await fetch(url,myHeaders)
        const response =await request.json()
        const messageresponse = response.message
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: messageresponse,
            showConfirmButton: false,
            timer: 2500
          })
        console.log(response.message)
        setTimeout(()=>{
            window.location.href='/home'
        },2500)
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
        <Container direction='column'>
            <figure>
                <Img src="walletsing.png" alt="wallet" />
            </figure>
            <article>
                <h1 style={{color:'#fff'}}>Welcome <span>{sessionStorage.getItem('name')}</span></h1>
            </article>
            <Content top='40px' direction='column'>
                <h3 style={{color:'#fff'}}>My Wallets</h3>
                {wallet.map(wallet=>(
                    <aside className='wallet' key={wallet._id}>
                        {wallet.name} 
                        <span style={{marginLeft:'15px'}}>
                            <Link to={`/transaction/${wallet._id}`}>new transaction</Link>
                        </span>
                        <span style={{marginLeft:'15px'}}>
                            <Link to={`/details/${wallet._id}`}>show details</Link>
                        </span>
                    </aside>
                ))}
            </Content>
            <h2 style={{color:'#fff'}}>Add new Wallet:</h2>
            <Formulary 
                onSubmit={submitCrypto}
                direction='column'
                border='solid 0.5px #000'
                // eslint-disable-next-line
                style={{minWidth:'750px'},{maxWidth:'1080px'}}
            >
                <h3>Select name wallet</h3>
                <div className='m-b m-t-1'>
                    <GiBank color='#000' size={20} style={{marginRight:'8px'}}/>
                    <select name='name' onChange={handleChange}>
                        <option value="error">--Select crypto--</option>
                        {crypto.map(crypto=>(<option key={crypto.id} value={crypto.name}>{crypto.name}</option>))}
                    </select>
                </div>
                <label><VscKey/> public key</label>
                <input
                    className='m-b m-t-1 input-1'  
                    name='public_key' 
                    type="text" 
                    defaultValue={publicKey} 
                    disabled required 
                />
                <label><VscKey/> private key</label>
                <input
                    className='m-b m-t-1 input-1' 
                    name='private_key' 
                    type="text" 
                    defaultValue={privateKey} 
                    disabled required 
                />
                <button 
                    type='button' 
                    onClick={getKey}
                    className='m-b m-t-1 input-1 btn btn-secondary'
                >
                    generate keys
                </button>
                <input 
                    type="submit" 
                    value="create wallet" 
                    className='m-b m-t-1 input-1 btn btn-secondary'
                />
            </Formulary>
            <div>
                <Link style={{textDecoration:'none'}} to='/import'><h3 style={{color:'#fff'}}>
                    <BiWallet/> Import Wallet</h3>
                </Link>
            </div>
        </Container>
    );
}

export default Home;
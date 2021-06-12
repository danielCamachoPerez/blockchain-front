import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Container, Content, Img } from './Styles'
import {BiBitcoin} from 'react-icons/bi'
import {GiPiggyBank} from 'react-icons/gi'
import {RiCoinsFill} from 'react-icons/ri'
import {IoMdWallet} from 'react-icons/io'
import {VscKey} from 'react-icons/vsc'
import coin from '../assets/coinwallet.png'

const Details = () => {
    const {id}= useParams()
    const [details,setDetails]=useState({})
    const [balance,setBalance]=useState('')
    const [block,setBlock]=useState([])
    const [filter,setFilter]=useState('')

    useEffect(()=>{
        getWallets(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[filter])

    const handleChange=(e)=>{
        if(e.target.value==='error'){
            console.log('select filter')
        }
        setFilter(e.target.value)
        
    }

    const userName= sessionStorage.getItem('name')

    const getWallets = async(id)=>{
        console.log(id)
        const token = sessionStorage.getItem('token')
        //
        const url = 'http://localhost:4000/wallets/transaction/'+id
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
        //console.log(response)
        setDetails(response)
        getBalance(response.private_key)
        getBlocks(response.public_key)
    }

    const getBalance= async (key)=>{
        const url='http://localhost:3500/balance/'+ key
        const myHeaders ={
            method: 'GET',
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              mode:'cors',
             },
        }
        const request = await fetch(url,myHeaders)
        const response= await request.json()
        console.log(response)
        setBalance(response.balance)
    }

    const getBlocks = async(key)=>{
        const url = 'http://localhost:3500/'
        const myHeaders ={
            method: 'GET',
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              mode:'cors',
             },
        }
        const request = await fetch(url,myHeaders)
        const response = await request.json()
        if(filter==='' || filter==='error'){
            const filterKey = response.map(res=>res)
            console.log(filterKey)
            console.log('all')
            setBlock(filterKey)
        }
        if(filter==='send'){
            const filterKey = response.filter(res=>res.transactions[0].fromAddress===key)
            console.log(filterKey)
            console.log('send')
            setBlock(filterKey)
        }
        if(filter==='recived'){
            const filterKey = response.filter(res=>res.transactions[0].toAddress===key)
            console.log(filterKey)
            console.log('recived')
            setBlock(filterKey)
        }
    }

    return (
        <Container style={{color:'#fff'}} direction='column'>
            <figure>
                <Img style={{height:'150px'}} src={coin} alt='coin'/>
            </figure>
            <Content direction='column' top='0px'>
                <h1 className='is-centered m-b'><span style={{marginRight:'8px'}}><GiPiggyBank/></span>wallet from: <span>{userName}</span></h1>
                <h3><IoMdWallet style={{marginRight:'8px'}} size={20}/>your wallet: {details.name} data</h3>
                <div>
                    <h4><VscKey style={{marginRight:'8px'}} size={20}/>public key: <span>{details.public_key}</span></h4>
                </div>
                <div>
                    <h4><RiCoinsFill style={{marginRight:'8px'}} size={20}/>balance: <span><BiBitcoin size={15}/>: {balance}</span></h4>
                </div>
                <div className='info'>
                    <h3 className='is-centered'>you want to know price in your country?</h3>
                    <h2 className='is-centered'>Go<a style={{marginLeft:'5px'}} target="_blank" rel='noopener noreferrer' href="https://react-crypto-wallet-api.netlify.app/">Here</a></h2>
                </div>
                <hr style={{width:'100%'}} />
                <div>
                    <h2 className='is-centered'>transation blocks:</h2>
                </div>
            </Content>
            <Content direction='column' top='20px'>
                <select style={{width:'20%'}} onChange={handleChange}>
                    <option value="error">--filter--</option>
                    <option value="send">sent transactions</option>
                    <option value="recived">recived transaction</option>
                </select>
                {block.map((block,i)=>(
                    <div className='card' key={i}>
                        <div>
                            <h3>timestamp:<span style={{marginLeft:'8px'}}>{block.timestamp}</span></h3>
                        </div>
                        <div>
                            <h3>transactions:</h3>
                            <p>from: 
                                {Array.isArray(block.transactions) ? 
                                <span style={{marginLeft:'8px'}}>{block.transactions[0].fromAddress}</span> :
                                block.transactions}
                            </p>
                            <p>to: 
                                {Array.isArray(block.transactions) ? 
                                <span style={{marginLeft:'8px'}}>{block.transactions[0].toAddress}</span> : 
                                block.transactions}
                            </p>
                            <p>amount: 
                                {Array.isArray(block.transactions) ? 
                                <span style={{marginLeft:'8px'}}>{block.transactions[0].amount}</span> : 
                                block.transactions}
                            </p>
                            <p>previousHash:<span style={{marginLeft:'8px'}}>{block.previousHash}</span></p>
                            <p>hash:<span style={{marginLeft:'8px'}}>{block.hash}</span></p>
                        </div>
                    </div>
                ))}
            </Content>
        </Container>
    );
}

export default Details;
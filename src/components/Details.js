import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

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
        if(filter===''){
            const filterKey = response.map(res=>res)
            console.log(filterKey)
            console.log('send')
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
        <div className='container'>
            <h1>waller from: <span>{userName}</span></h1>
            <h3>your wallet: {details.name} data</h3>
            <div>
                <h4>public key: <span>{details.public_key}</span></h4>
            </div>
            <div>
                <h4>balance: <span>₿: {balance}</span></h4>
            </div>
            <hr />
            <div>
                <h2>transation blocks:</h2>
            </div>
            <select onChange={handleChange}>
                <option value="error">--filter--</option>
                <option value="send">sent transactions</option>
                <option value="recived">recived transaction</option>
            </select>
            {block.map((block,i)=>(
                <div key={i}>
                    <div>
                        <h3>timestamp: <span>{block.timestamp}</span></h3>
                    </div>
                    <div>
                        <h3>transactions: </h3>
                        <p>from: <span>{block.transactions[0].fromAddress}</span></p>
                        <p>to: <span>{block.transactions[0].toAddress}</span></p>
                        <p>amount: <span>{block.transactions[0].amount}</span></p>
                        <p>previousHash: <span>{block.previousHash}</span></p>
                        <p>hash: <span>{block.hash}</span></p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Details;
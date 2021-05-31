import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Transaction = () => {
    const {id} = useParams()
    //console.log(id)
    const [userWallet, setUserWallet]=useState('')
    const [newTransaction, setNewTransaction]=useState({
        key:'',
        to:'',
        amount:'',
    })
    
    useEffect(()=>{
        getWallets(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleChange= e=>{
        setNewTransaction({
            ...newTransaction,
            [e.target.name]:e.target.value,
            
        })
    }

    const submitTransaction = e=>{
        e.preventDefault()
        transaction()
        console.log(newTransaction)
        window.location.href='/home'
    }

    const cancelTransaction=()=>{
        window.location.href='/home'
    }

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
        setUserWallet(response)
        console.log(response)
    }

    const transaction = async ()=>{
        //const url= 'https://blockchain-delta.vercel.app/api/block/transaction'
        //const url='http://localhost:5000/api/block/transaction'
        const url='http://localhost:3500/transaction'
        const myHeaders ={
            method: 'POST',
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              mode:'cors',
             },
            body:JSON.stringify(newTransaction)
        }
        const request = await fetch(url,myHeaders)
        const response = await request.json()
        console.log(response.message)
        console.log(response.data)
    }

    return (
        <div className='container'>
            <form onSubmit={submitTransaction}>
                <div>
                    <div>
                        <label>your address wallet</label>
                        <input type="text" style={{width:'940px'}} defaultValue={userWallet.public_key} disabled required/>
                    </div>
                    <div>
                        <label>your sign address wallet</label>
                        <input type="text" style={{width:'500px'}} name='key' onChange={handleChange} required />
                    </div>
                    <div>
                        <label>to address</label>
                        <input type="text" style={{width:'940px'}} name='to' onChange={handleChange} required />
                    </div>
                    <div>
                        <label>amount</label>
                        <input type="number" name="amount" onChange={handleChange} required />
                    </div>
                </div>
                <div>
                    <input type="submit" value="send transaction" />
                </div>
                <div>
                    <button type='button' onClick={cancelTransaction}>cancel</button>
                </div>
            </form>
        </div>
    );
}

export default Transaction;
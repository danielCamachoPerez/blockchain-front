import { useEffect, useState } from "react";

const Blocks = () => {
    const [importWallet,setimportWallet]=useState({
        name:'',
        public_key:'',
        private_key:'',
        user:sessionStorage.getItem('idUser'),
    })
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
            name:'Homecoin',
            value:'homecoin',
        }
    ]

    const handleChange=(e)=>{
        setimportWallet({
            ...importWallet,
            [e.target.name]:e.target.value,
        })
    }

    const addWallet = async()=>{
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
            body: JSON.stringify(importWallet),
          }
        if(importWallet.name===''||importWallet.name==='error'||importWallet.public_key===''||importWallet.private_key===''||importWallet.user===''){
            return console.log('error')
        }
        const request = await fetch(url,myHeaders)
        const response =await request.json()
        console.log(response.message)
        window.location.href='/home'
    }

    const submitCrypto=(e)=>{
        e.preventDefault()
        addWallet()
        console.log(importWallet)
    }

    const handleCancel=()=>{
        window.location.href='/home'
    }

    return (
        <div className='container'>
            <h2>Add new Wallet:</h2>
            <form onSubmit={submitCrypto}>
                <div>
                    <select name='name' onChange={handleChange}>
                        <option value="error">--Select crypto--</option>
                        {crypto.map(crypto=>(<option key={crypto.id} value={crypto.name}>{crypto.name}</option>))}
                    </select>
                </div>
                <div className="mr-t-1">
                    <label>public key</label>
                    <input style={{width:'940px'}} name='public_key' type="text" onChange={handleChange} required />
                </div>
                <div className="mr-t-1">
                    <label>private key</label>
                    <input style={{width:'500px'}} name='private_key' type="text" onChange={handleChange} required />
                </div>
                <div className="mr-t-1">
                    <input type="submit" value="import wallet" />
                </div>
            </form>
            <div className="mr-t-1">
                <button style={{cursor:'pointer'}} type='button' onClick={()=>handleCancel()}>cancel</button>
            </div>
        </div>
    );
}

export default Blocks;
import { useState } from "react";
import Swal from "sweetalert2";
import {Container, Formulary} from './Styles'
import {crypto} from '../services/AllWallets'

const Blocks = () => {
    const [importWallet,setimportWallet]=useState({
        name:'',
        public_key:'',
        private_key:'',
        user:sessionStorage.getItem('idUser'),
    })

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
        addWallet()
        console.log(importWallet)
    }

    const handleCancel=()=>{
        window.location.href='/home'
    }

    return (
        <Container direction='column'>
            <h2 style={{color:'#fff'}}>Add new Wallet:</h2>
            <Formulary  
                onSubmit={submitCrypto}
                direction='column' 
                border='solid 0.5px #000'
                // eslint-disable-next-line
                style={{minWidth:'750px'},{maxWidth:'1080px'}}
            >
                <select style={{width:'20%'}} name='name' onChange={handleChange}>
                    <option value="error">--Select crypto--</option>
                    {crypto.map(crypto=>(<option key={crypto.id} value={crypto.name}>{crypto.name}</option>))}
                </select>
                <label>public key</label>
                <input 
                    name='public_key' 
                    type="text" 
                    onChange={handleChange} required
                    className='m-b m-t-1 input-1' 
                />
                <label>public key</label>
                <input 
                    name='private_key' 
                    type="text" 
                    onChange={handleChange} required
                    className='m-b m-t-1 input-1'  
                />
                <input
                    className='btn btn-secondary' 
                    type="submit" 
                    value="import wallet" 
                />
                <button 
                    style={{cursor:'pointer'}} 
                    type='button' 
                    className='btn btn-secondary m-t-1'
                    onClick={()=>handleCancel()}
                >
                    cancel
                </button>
                
            </Formulary>
        </Container>
    );
}

export default Blocks;
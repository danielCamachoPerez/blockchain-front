import { useState } from "react"
import { Link } from "react-router-dom"
import { Container, Formulary } from './Styles'

const FormRegister =()=>{
    const [user,setUser]=useState({
        name:'',
        mail:'',
        password:'',
    })

    const handleChange=e=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value,
        })
    }

    const createUser=async()=>{
        const url = 'http://localhost:4000/users/register'
        const myHeaders ={
            method: 'POST',
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                mode:'cors',
               },
            body: JSON.stringify(user),
          }
        if(user.name===''|| user.mail===''|| user.password===''){
            return console.log('error')
        }
        const request = await fetch(url,myHeaders)
        const response = await request.json()
        if(response.message==='this mail exist!'){
            return alert(response.message)
        }
        const token = response.token
        const username=response.name
        const userid=response.id
        sessionStorage.setItem('token',token)
        sessionStorage.setItem('name',username)
        sessionStorage.setItem('idUser',userid)
        window.location.href='/home'
    }

    const submitNewUser=(e)=>{
        e.preventDefault()
        createUser()
    }

    return (
        <Container direction='column'>
            <div><h1 style={{ color: "#fff" }}>SingUp</h1></div>
            <Formulary 
                border='solid 1px #EBEDEF' 
                width='25%' 
                direction='column'
                onSubmit={submitNewUser}
            >
                <label className="label">Name</label>
                <input 
                    className='m-b m-t-1 input-1 input-text'
                    type="text" 
                    name="name" 
                    placeholder="name" 
                    onChange={handleChange} 
                    required 
                />
                <label>your email</label>
                <input 
                    className='m-b m-t-1 input-1 input-text'
                    type="email" 
                    name="mail" 
                    placeholder="email" 
                    onChange={handleChange} 
                    required 
                />
                <label>your password</label>
                <input 
                    className='m-b m-t-1 input-1 input-text'
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    className='btn btn-primary'
                    type="submit" 
                    value="register" 
                />
            </Formulary>
                
            <h4 style={{ color: "#fff" }}>
                You have account?
                <span style={{marginLeft:'8px'}}>
                    <Link style={{ color: "#61dafb" }} to="/login">
                        login
                    </Link>
                </span>
            </h4>
        </Container>
    )
}

export default FormRegister
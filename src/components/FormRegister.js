import { useState } from "react"

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
        <div className='container-2 flex flex-direction-col'>
            <div className="m-t-1">
                <h1>SingUp</h1>
            </div>
            <form onSubmit={submitNewUser}>
                <div className="mr-t-1">
                    <label>your name</label><br />
                    <input type="text" name="name" placeholder="name" onChange={handleChange} required />
                </div>
                <div className="mr-t-1">
                    <label>your email</label><br />
                    <input type="email" name="mail" placeholder="email" onChange={handleChange} required />
                </div>
                <div className="mr-t-1">
                    <label>your password</label><br />
                    <input type="password" name="password" placeholder="password" onChange={handleChange} required />
                </div>
                <div className="mr-t-1">
                    <input type="submit" value="register" />
                </div>
            </form>
        </div>
    )
}

export default FormRegister
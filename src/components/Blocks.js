import { useEffect, useState } from "react";

const Blocks = () => {
    const [blocks,setBlocks]=useState([])

    useEffect(()=>{
        const getblocks = async()=>{
            //const url ='https://blockchain-delta.vercel.app/api/block'
            //const url ='http://localhost:5000/api/block'
            const url ='http://localhost:3500'
            const myHeaders ={
            method: 'GET',
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
             },
        }
        const request = await fetch(url,myHeaders)
        const response = await request.json()
        setBlocks(response)
        }

        getblocks()
    },[])

    return (
        <div>
            <div>
                <h1>Blockchain blocks</h1>
            </div>
            {blocks.map(block=>(console.log(block)))}
        </div>
    );
}

export default Blocks;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Formulary } from "./Styles";

const Transaction = () => {
  const { id } = useParams();
  //console.log(id)
  const [userWallet, setUserWallet] = useState("");
  const [newTransaction, setNewTransaction] = useState({
    key: "",
    to: "",
    amount: "",
  });

  useEffect(() => {
    getWallets(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const submitTransaction = (e) => {
    e.preventDefault();
    transaction();
    console.log(newTransaction);
    window.location.href = "/home";
  };

  const cancelTransaction = () => {
    window.location.href = "/home";
  };

  const getWallets = async (id) => {
    console.log(id);
    const token = sessionStorage.getItem("token");
    //
    const url = "http://localhost:4000/wallets/transaction/" + id;
    const myHeaders = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        mode: "cors",
        autorization: token,
      },
    };
    const request = await fetch(url, myHeaders);
    const response = await request.json();
    setUserWallet(response);
    console.log(response);
  };

  const transaction = async () => {
    //const url= 'https://blockchain-delta.vercel.app/api/block/transaction'
    //const url='http://localhost:5000/api/block/transaction'
    const url = "http://localhost:3500/transaction";
    const myHeaders = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        mode: "cors",
      },
      body: JSON.stringify(newTransaction),
    };
    const request = await fetch(url, myHeaders);
    const response = await request.json();
    console.log(response.message);
    console.log(response.data);
  };

  return (
    <Container direction="column" top='50px'>
        <article>
            <h1 style={{color:'#fff'}}>New Transaction</h1>
        </article>
      <Formulary 
        direction="column" 
        onSubmit={submitTransaction}
        // eslint-disable-next-line
        style={{minWidth:'750px'},{maxWidth:'1080px'}}
    >
        <label>your address wallet</label>
        <input
            className='m-b m-t-1 input-1'
            type="text"
            defaultValue={userWallet.public_key}
            disabled
            required
        />
        <label>your sign address wallet</label>
        <input
            className='m-b m-t-1 input-1'
            type="text"
            name="key"
            onChange={handleChange}
            required
        />
        <label>to address</label>
        <input
            className='m-b m-t-1 input-1'
            type="text"
            name="to"
            onChange={handleChange}
            required
        />
        <label>amount</label>
        <input
            className='m-b m-t-1 input-1'
            type="number"
            name="amount"
            onChange={handleChange}
            required
        />
        <input
            className='m-b m-t-1 input-1 btn btn-secondary' 
            type="submit" 
            value="send transaction" 
        />
        <button
            className='m-b m-t-1 input-1 btn btn-secondary' 
            type="button" 
            onClick={cancelTransaction}
        >
            cancel
        </button>
      </Formulary>
    </Container>
  );
};

export default Transaction;

import { Container, Img } from "../components/Styles";
import { Link } from "react-router-dom";

const Index = () => {
    return (
        <Container direction='column'>
            <article>
                <figure>
                    <Img src="bw.png" alt="wallet" />
                </figure>
            </article>
            <article>
                <h1 style={{ color: "#fff" }}>Create a CryptoWallet!</h1>
            </article>
            <h4 style={{ color: "#fff" }}>
                you have an acount? <Link to='/login'>SingUp</Link>
                <span style={{marginLeft:'5px'}}>or <Link to='/register'>Create one</Link></span>
            </h4>
            <div style={{color:'#fff'}}>
                <h3 className='is-centered'>you want to know price in your country?</h3>
                <h2 className='is-centered'>Go<a style={{marginLeft:'5px'}} target="_blank" rel='noopener noreferrer' href="https://react-crypto-wallet-api.netlify.app/">Here</a></h2>
            </div>
        </Container>
    );
}

export default Index;
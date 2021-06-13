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
                you have an acount?
                <span style={{marginLeft:'8px'}}>
                    <Link style={{color: "#61dafb"}} to='/login'>SingUp</Link>
                </span>
                <span style={{marginLeft:'8px'}}>
                    or 
                    <span style={{marginLeft:'8px'}}>
                        <Link style={{color: "#61dafb"}} to='/register'>Create one</Link>
                    </span>
                </span>
            </h4>
            <div style={{color:'#fff'}}>
                <h3 className='is-centered'>you want to know price in your country?</h3>
                <h2 className='is-centered'>
                    Go
                    <span style={{marginLeft:'8px'}} >
                        <a 
                            style={{ color: "#61dafb" }} 
                            target="_blank" rel='noopener noreferrer' 
                            href="https://react-crypto-wallet-api.netlify.app/">
                            Here
                        </a>
                    </span>
                </h2>
            </div>
        </Container>
    );
}

export default Index;
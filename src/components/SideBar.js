import styled from "styled-components";

const Side = styled.aside`
    padding-top: 40px;
    background-color: #5B6484;
    max-width: 20%;
    color: #F5F7FD;
`

const SideBar = () => {
    return (
        <>
        <Side>
            <div className="ml mt-4">
                <h2 cla>Welcome</h2>
                <h3>{sessionStorage.getItem('name')}</h3>
            </div>
            <div className='ml mt-4'>
                <h3>Your Wallets:</h3>
            </div>
        </Side>
        <span><h2>dafa</h2></span>
        </>
    );
}

export default SideBar;
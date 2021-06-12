import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Error = styled.div`
    margin-top: 50px;
`

const Loged = () => {
    const {pathname} = useLocation()
    return (
        <Error className="error-404">
    	    <div className="message-Error">
            	<h1>Error 404</h1>
                <p>No match for <code>{pathname}</code></p>
    	    </div>
        </Error>
    );
}

export default Loged;
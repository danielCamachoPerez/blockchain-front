import { useLocation } from "react-router-dom";

const Loged = () => {
    const {pathname} = useLocation()
    return (
        <div>
            <h3>No match for <code>{pathname}</code></h3>
        </div>
    );
}

export default Loged;
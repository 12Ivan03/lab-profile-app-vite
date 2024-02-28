import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

const API_BAKND = "http://localhost:5005"

function LoginPage() {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState(undefined);

    const { storeToken, authenticateUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value); 
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const reqBody = { username, password }

        try{
            const response = await axios.post(`${API_BAKND}/auth/login`, reqBody )
            storeToken(response.data.token);
            authenticateUser();
            navigate('/');
        } catch(err){
            console.log(err)
            const errDescription = err.response.data.message
            setErrorMessage(errDescription)
        }

    }

    return(
        <div>
            <h2>log in</h2>

            <form onSubmit={handleSubmit}>
                <label>Username:
                    <input type="text" value={username} onChange={handleUsername}/>
                </label>
                <label>Password:
                    <input type="password" value={password} onChange={handlePassword} />
                </label>
                {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                <button type="submit" >Submit</button>
            </form>
        </div>
    )
}

export default LoginPage;
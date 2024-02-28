import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BAKND = "http://localhost:5005" 


function SignupPage() {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ campus, setCampus ] = useState('');
    const [ course, setCourse ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState(undefined)

    const navigate = useNavigate();

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleCampus = (e) => setCampus(e.target.value);
    const handleCourse = (e) => setCourse(e.target.value);


    const handleSubmit = (e) => {
        e.preventDefault();

        const reqBody = { username, password, campus, course };

        try{
            const singupRequest = axios.post(`${API_BAKND}/auth/signup`, reqBody);
            navigate('/login');
        } catch(err){
            console.log('thi si the err from SignupPage =>',err)
            const errorDescription = err.response.data.message;
            setErrorMessage(errorDescription)
        }

    }

    return(
        <div>
            <h2>Sign up</h2>

            <form onSubmit={handleSubmit}>
                <label> Username:
                    <input type="text" value={username} onChange={handleUsername} />
                </label>
                <label>Password:
                    <input type="password" value={password} onChange={handlePassword} />
                </label>
                <label>Campus:
                    <select name="Campus" id="Campus" value={campus} onChange={handleCampus}>
                        <option value=""></option>
                        <option value="Remote">Remote</option>
                        <option value="Madrid">Madrid</option>
                        <option value="Barcelona">Barcelona</option>
                        <option value="Miami">Miami</option>
                        <option value="Paris">Paris</option>
                        <option value="Berlin">Berlin</option>
                        <option value="Amsterdam">Amsterdam</option>
                        <option value="México">México</option>
                        <option value="Sao Paulo">Sao Paulo</option>
                        <option value="Lisbon">Lisbon</option>
                    </select>
                </label>
                <label>Course:
                    <select name="Course" id="Course" value={course} onChange={handleCourse}>
                        <option value=""></option>
                        <option value="Web Dev">Web Dev</option>
                        <option value="UX/UI">UX/UI</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="Cyber Security">Cyber Security</option>
                    </select>
                </label>

                <button type="submit">Submit</button>
            </form>

            {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
        </div>
    )
}

export default SignupPage
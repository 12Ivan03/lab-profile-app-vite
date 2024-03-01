import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


const API_BAKND = "http://localhost:5005"

function EditProfile() {

    const [ name, setName ] = useState('')
    const [ course, setCourse ] = useState('');
    const [ campus, setCampus ] = useState('');
    const [ img, setImg ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true);

    const handleCourse = (e) => setCourse(e.target.value);
    const handleCampus = (e) => setCampus(e.target.value);
    const handleImg = (e) => setImg(e.target.value);
    
    const navigate = useNavigate();

    const storeToken = localStorage.getItem('token')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reqBody = {
            course,
            campus,
            image: img,
        }

        try{
            await axios.put(`${API_BAKND}/api/user`, reqBody, {headers: {AuthTokenCarier: `Bearer ${storeToken}`}} )
            navigate('/profile')
        }catch(err){
            console.log(err)
        }
        navigate('/profile')
    }

    const verifyUser = async () => {

        try{
            const findUser = await axios.get(`${API_BAKND}/api/user`, {headers: { AuthTokenCarier: `Bearer ${storeToken}`}})
            setName(findUser.data.username);
            setCourse(findUser.data.course);
            setCampus(findUser.data.campus);
            setImg(findUser.data.image);
            setIsLoading(false);
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        verifyUser()
            // .catch(err => {
            //     console.log(err)
            //     setIsLoading(false)
            // })
    }, [])

    if(isLoading){
        return(
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return(
        <div>
        <Navbar />
            <h2>eidt {name}&apos;s profile</h2>

            <form onSubmit={handleSubmit}>
                <img src={img} alt="" style={{height: "150px"}} />
                <br />
                <label>Image URL:
                    <input type="text" value={img} onChange={handleImg} />
                </label>
                <br />
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
                <br />
                <label>Course:
                    <select name="Course" id="Course" value={course} onChange={handleCourse}>
                        <option value=""></option>
                        <option value="Web Dev">Web Dev</option>
                        <option value="UX/UI">UX/UI</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="Cyber Security">Cyber Security</option>
                    </select>
                </label>
                <br />
                <br />
                <button>submit</button>
            </form>
            <br />
            <Link to={'/profile'} ><button>Back</button></Link>
        </div>
    )
}

export default EditProfile;
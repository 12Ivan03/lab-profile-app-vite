import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


const API_BAKND = "http://localhost:5005"

function ProfilePage() {

    const [ user, setUser ] = useState(null);
    const [ isloading, setIsLoading ] = useState(true);

    const { logOutUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const storeToken = localStorage.getItem("token");

    const findUser = async () => {
        try{
            const searchUser = await axios.get( `${API_BAKND}/api/user`, { headers: {AuthTokenCarier: `Bearer ${storeToken}`} } )
            setUser(searchUser.data);
            setIsLoading(false)
            console.log('from the frond end user ==>', searchUser)
        }catch(err){
            console.log(err)
        }
    }

    const handleLogOut = () => {
        logOutUser();
        navigate('/');
    }

    useEffect(() => {
        findUser()
    }, [])

    if(isloading){
        return(
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return(
        <div>
        <Navbar />
            <h2>Profiel page</h2>
            <img src={user.image} alt="Image not load..." style={{height: "150px"}} />
            <p><i style={{color: "gray"}}>Name:</i> <span><b>{user.username}</b></span></p>
            <p><i style={{color: "gray"}}>Campus:</i> <span><b>{user.campus}</b></span></p>
            <p><i style={{color: "gray"}}>Course:</i> <span><b>{user.course}</b></span></p>

            <br />
            <Link to={"/edit-profile"}><button style={{color: "gray"}}>Edit Profile</button></Link>

            <button onClick={handleLogOut} style={{color: "gray"}}>log out</button>
        </div>
    )
}

export default ProfilePage;
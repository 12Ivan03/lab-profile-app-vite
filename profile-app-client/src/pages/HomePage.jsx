import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function HomePage() {

    const { isLoggedIn, user } = useContext(AuthContext)

    return(
        <div>
            {isLoggedIn && 
            <div>
                <p>Hello {user.username}</p>    
                <Link to={'/profile'}><button>Your profile</button></Link>
            </div>
            }
            
            <Link to={'/signup'}><button>Sign up</button></Link>
            <Link to={'/login'}><button>Log in</button></Link>
        </div>
    )
}

export default HomePage
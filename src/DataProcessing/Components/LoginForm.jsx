import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from '../../UserAuth/firebase';


export default function LoginForm() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(() => {
        // Initialize state from local storage, default to false if not found
        return localStorage.getItem('isUserLoggedIn') === 'true';
    });

    //eslint-disable-next-line
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [loginDetails, setLoginDetails] = useState({
        email: "", password: ""
    })
    const handleLoginDetails = (e) => {
        const { id, value } = e.target;
        setLoginDetails({ ...loginDetails, [id]: value });
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.password);
            alert('Logged in successfully!');
            localStorage.setItem('isUserLoggedIn', 'true');
            setIsUserLoggedIn(true);
        } catch (error) {
            alert('Error logging in:', error);
        }
    }

    return (
        {
            showPassword, handleClickShowPassword, handleMouseDownPassword, handleLogin, isUserLoggedIn, setIsUserLoggedIn, handleLoginDetails, loginDetails
        }
    )
}

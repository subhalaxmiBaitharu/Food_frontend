import React, { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLoginPhoto, login } from "../../routes"
import { useNavigate } from "react-router-dom"
import Logo1 from '../../images/LOGO 1.png'
import Logo2 from '../../images/Welcome.png'
import style from './login.module.css'
import { Skeleton } from "@mui/material"

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)
    const [formErrors, setFormErrors] = useState({
        email: null,
        password: null,
    })
    const [loginPhoto, setLoginPhoto] = useState(null);


    useEffect(() => {
        const loadLoginPhoto = async () => {
            try {
                const photo = await getLoginPhoto();
                setLoginPhoto(photo.photo);
            } catch (err) {
                console.log('Failed to load login photo.');
            }
        };

        loadLoginPhoto();
    }, []);



    const handleLogin = async (e) => {
        e.preventDefault()
        let errors = false;
        setFormErrors((formErrors) => { return { ...formErrors, email: null, name: null, phone: null, password: null } })
        if (!formData.email || formData.email.length < 1 || !formData.email.includes("@") || !formData.email.includes(".")) {
            setFormErrors((formErrors) => { return { ...formErrors, email: "Email is invalid" } })
            errors = true
        }
        if (!formData.password) {
            setFormErrors((formErrors) => { return { ...formErrors, password: "Password is required" } })
            errors = true
        }
        if (errors) {
            return
        }
        try {
            setLoading(() => true)
            const response = await login(formData)
            if (response.token) {
                localStorage.setItem("token", response.token)
                localStorage.setItem("userId", response.id)
                navigate("/home")
            }
            else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(() => false)
        }
    }
    return (
        <>
            <ToastContainer />
            <div className={style.loginContainer}>

                <div className={style.loginLeft}>

                    <header>
                        <img className={style.order} src={Logo1} alt="Order" />
                        <img className={style.welcome} src={Logo2} alt="Welcome Back" />
                        <p>Today is a new day. It's your day. You shape it.
                            Sign in to start ordering.</p>
                    </header>
                    <form className="" onSubmit={handleLogin}>
                        <label>Email</label>
                        <input value={formData.email} type="text" placeholder="Example@gmail.com" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        {formErrors.email && <p className={style.error}>{formErrors.email}</p>}
                        <label>Password</label>
                        <input value={formData.password} type="password" placeholder="At least 8 characters" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        {formErrors.password && <p className={style.error}>{formErrors.password}</p>}
                        <button disabled={loading} type="submit">{loading ? "Loading..." : "Sign In"}</button>
                    </form>
                    <div className={style.loginBottom}>
                        <p>Don't you have an account? <span onClick={() => navigate('/register')}>Sign up</span></p>
                    </div>
                </div>
                <div className={style.loginRight}>
                    {loginPhoto ? (
                        <img src={loginPhoto} alt="Food" />
                    ) : (
                        <Skeleton variant="rectangular" width={615} height="91vh" sx={{ mt: 4, borderRadius: "20px" }} />
                    )}
                </div>
            </div>
        </>
    )
}
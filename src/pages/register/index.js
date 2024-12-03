import { useEffect, useState } from "react"
import { getLoginPhoto, register } from "../../routes"
import Logo1 from '../../images/LOGO 1.png'
import Logo2 from '../../images/Welcome 1.png'
import style from './register.module.css'
import { useNavigate } from "react-router-dom"
import { Skeleton } from "@mui/material"
import { toast, ToastContainer } from "react-toastify"

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)
    const [formErrors, setFormErrors] = useState({
        email: null,
        name: null,
        phone: null,
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

    const handleRegister = async (e) => {
        e.preventDefault()
        let errors = false;
        setFormErrors((formErrors) => { return { ...formErrors, email: null, name: null, phone: null, password: null } })
        if (!formData.email || formData.email.length < 1 || !formData.email.includes("@") || !formData.email.includes(".")) {
            setFormErrors((formErrors) => { return { ...formErrors, email: "Email is invalid" } })
            errors = true
        }
        if (!formData.name || formData.name.length === 0) {
            setFormErrors((formErrors) => { return { ...formErrors, name: "Name is required" } })
            errors = true
        }
        if (!formData.phone || formData.phone.length < 10) {
            setFormErrors((formErrors) => { return { ...formErrors, phone: "Phone number is invalid" } })
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
            const response = await register(formData)
            toast.success(response.message)
            if (response.message === "User created successfully") {
                setFormData({
                    email: "",
                    name: "",
                    phone: "",
                    password: "",
                })
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(() => false)
        }
    }
    return (
        <div className={style.loginContainer}>
            <ToastContainer />
            <div className={style.loginLeft}>

                <header>
                    <img className={style.order} src={Logo1} alt="Order" />
                    <img className={style.welcome} src={Logo2} alt="Welcome Back" />
                    <p>Today is a new day. It's your day. You shape it.
                        Sign in to start ordering.</p>
                </header>
                <form className={style.form} onSubmit={handleRegister}>
                    <label>Name</label>
                    <input value={formData.name} type="text" placeholder="eg. John A" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    {formErrors.name && <p className={style.error}>{formErrors.name}</p>}
                    <label>Phone Number</label>
                    <input value={formData.phone} type="text" placeholder="Enter your 10 digit mobile number" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    {formErrors.phone && <p className={style.error}>{formErrors.phone}</p>}
                    <label>Email</label>
                    <input value={formData.email} type="text" placeholder="Example@gmail.com" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    {formErrors.email && <p className={style.error}>{formErrors.email}</p>}
                    <label>Password</label>
                    <input value={formData.password} type="password" placeholder="At least 8 characters" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    {formErrors.password && <p className={style.error}>{formErrors.password}</p>}
                    <button disabled={loading} type="submit">{loading ? "Loading..." : "Continue"}</button>
                </form>
                <div className={style.loginBottom}>
                    <p>Already have an account? <span onClick={() => navigate('/login')}>Sign in</span></p>
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
    )
}
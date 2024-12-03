import style from './footer.module.css'
import Logo from '../images/LOGO 2.png'
import Facebook from '../images/Facebook.png'
import Insta from '../images/Instagram.png'
import Tiktok from '../images/TikTok.png'
import SnapChat from '../images/Snapchat.png'
import AppStore from '../images/appStore.png'


export default function Footer() {

    return (
        <div>
            <div className={style.footer}>
                <div className={style.footerLeft}>
                    <img className={style.order} src={Logo} alt='Logo' />
                    <img className={style.appStore} src={AppStore} alt='Appstore' />
                    <p>Company # 490039-445, Registered with House of companies.</p>
                </div>
                <div className={style.footerMiddle}>
                    <h3>Get Exclusive Deals in your Inbox</h3>
                    <div className={style.inputData}>
                        <p className={style.all}><input type='email' placeholder='youremail@gmail.com' />
                            <button>Subscribe</button></p>
                    </div>
                    <p>we wont spam, read our<u> email policy</u></p>
                    <div className={style.logoContainer}>
                        <img src={Facebook} alt='Facebook' />
                        <img src={Insta} alt='Insta' />
                        <img src={Tiktok} alt='Tiktok' />
                        <img src={SnapChat} alt='SnapChat' />
                    </div>
                </div>
                <div className={style.footerRight}>

                    <div className={style.footerRightContent}>
                        <h4>Legal Pages</h4>
                        <a>Terms and conditions</a>
                        <a>Privacy</a>
                        <a>Cookies</a>
                        <a>Modern Slavery Statement</a>
                    </div>
                    <div className={style.footerRightContent}>
                        <h4>Important Links</h4>
                        <a>Get help</a>
                        <a>Add your restaurant</a>
                        <a>Sign up to deliver</a>
                        <a>Create a business account</a>
                    </div>
                </div>
            </div>
            <div className={style.footerBottom}>
                <p>Order.uk Copyright 2024, All Rights Reserved.</p>
                <div className={style.footerBottomContent}>
                    <p>Privacy Policy</p>
                    <p>Terms</p>
                    <p>Pricing</p>
                    <p>Do not sell or share my personal information</p>
                </div>
            </div>
        </div>
    )
}
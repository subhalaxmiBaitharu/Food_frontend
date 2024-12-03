import React, { useState } from "react";
import styles from "./payment.module.css";
import Arrow from "../../images/arrow (2).png";
import Wallet from "../../images/wallet.png";
import Navbar from "../../components/Navbar";
import Success from "../../images/Content.png";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

export default function PaymentPage({ cart, setCart, deliveryAddress }) {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(""); // State to manage selected payment method
    const [showModal, setShowModal] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loader state

    const [itemList, setItemList] = useState(cart);
    const paymentMethods = [
        { id: "maestro", title: "MaestroCard" },
        { id: "paypal", title: "Paypal" },
        { id: "stripe", title: "Stripe" },
    ];

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        if (option === "debitCard") {
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleProceedPayment = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setOrderSuccess(true);
            setCart([]);
        }, 2000);
    };

    return (
        <div className={styles.page}>
            <Navbar currentAddress={deliveryAddress} />
            {!orderSuccess ? (
                <div className={styles.container}>
                    {isLoading ? (
                        <div className={styles.loader}>Processing Payment...</div>
                    ) : (
                        <div className={styles.mainContainer}>
                            <div className={styles.content}>
                                <div className={styles.contentLeft}>
                                    <div className={styles.header}>
                                        <span className={styles.back} onClick={() => navigate(-1)}>🡠</span> Choose and Pay
                                    </div>
                                    <div className={styles.walletDiv}>
                                        <div className={styles.delivery}>
                                            <div className={styles.wallet}>
                                                <img src={Wallet} alt="Wallet Icon" />
                                                <div>
                                                    <p>
                                                        <span>Wallet</span>
                                                    </p>
                                                    <p className={styles.available}>Available balance: ₹ 300</p>
                                                </div>
                                            </div>
                                            <img src={Arrow} alt="Forward Arrow" />
                                        </div>
                                    </div>
                                    {paymentMethods.map((method) => (
                                        <div
                                            key={method.id}
                                            className={`${styles.paymentOption} ${selectedOption === method.id ? styles.selected : ""}`}
                                            onClick={() => handleOptionChange(method.id)}
                                        >
                                            <div className={styles.optionDetails}>
                                                <div className={styles.optionIcon}>
                                                    {method.title[0]}
                                                </div>
                                                <div>
                                                    <div className={styles.optionTitle}>{method.title}</div>
                                                </div>
                                            </div>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                checked={selectedOption === method.id}
                                                readOnly
                                            />
                                        </div>
                                    ))}
                                    <div
                                        className={styles.addDebit}
                                    >
                                        <div className={styles.optionDetails}>
                                            <div className={styles.optionPlus}>+</div>
                                            <div className={styles.optionTitle}>Add Debit Card</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.contentRight}>
                                    <div className={styles.summary}>
                                        <div className={styles.amountText}>Amount to be paid</div>
                                        <div className={styles.amount}>₹240</div>
                                    </div>
                                    <button
                                        className={styles.proceedButton}
                                        onClick={handleProceedPayment}
                                        disabled={!selectedOption}
                                        style={{ opacity: selectedOption ? 1 : 0.5 }}
                                    >
                                        Proceed Payment
                                    </button>
                                </div>
                            </div>
                            {window.innerWidth > 480 && <Footer />}
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.orderSuccess}>
                    <div className={styles.orderTop}>
                        <img src={Success} alt="Order Success" />
                    </div>
                    <div className={styles.orderBottom}>
                        {itemList.map((item, idx) =>
                            <p key={idx}>{item.name}</p>)}
                        <button className={styles.backButton} onClick={() => navigate('/home')}>Back to Home</button>
                    </div>
                </div>
            )}

        </div>
    );
};


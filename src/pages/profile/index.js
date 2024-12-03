import React, { useEffect, useState } from "react";
import style from './profile.module.css'
import Navbar from "../../components/Navbar";
import Photo from '../../images/Ellipse 11.png'
import Card from '../../images/credit-card.png'
import Edit from '../../images/edit-3.png'
import Plus from '../../images/plus.png'
import { useNavigate } from "react-router-dom";
import { getUserDetailsById } from "../../routes";
import Footer from "../../components/Footer";

export default function Profile() {

    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [cardSelected, setCardSelected] = useState(null);
    const [profile, setProfile] = useState({
        fullName: '',
        email: '',
        gender: "Male",
        country: "India",
    });

    useEffect(() => {
        const userId = localStorage.getItem("userId")
        if (userId) {
            getUserDetailsById(userId)
                .then((data) => {
                    setProfile({
                        fullName: data.user.name,
                        email: data.user.email,
                        gender: 'Male',
                        country: 'India',
                    });
                })
                .catch((error) => console.error("Error fetching user details:", error));
        }
    }, []);

    const closeModal = () => {
        setShowModal(false);
    };

    const [cards, setCards] = useState(() => {
        const savedCards = localStorage.getItem("cards");
        return savedCards
            ? JSON.parse(savedCards)
            : [
                { id: 1, number: "xxxx xxxx xxxx 1234", Expiration: "12/24", CVC: "123", NameonCard: "Mastercard" },
                { id: 2, number: "xxxx xxxx xxxx 6789", Expiration: "10/25", CVC: "456", NameonCard: "Rupay" },
                { id: 3, number: "xxxx xxxx xxxx 3468", Expiration: "09/26", CVC: "789", NameonCard: "Alice Brown" },
            ];
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardSelected({ ...cardSelected, [name]: value });
    };

    const saveCardChanges = () => {
        const updatedCards = cards.map((card) =>
            card.id === cardSelected.id ? cardSelected : card
        );
        setCards(updatedCards);
        localStorage.setItem("cards", JSON.stringify(updatedCards));
        closeModal();
    };
    const removeCard = () => {
        if (cardSelected) {
            const updatedCards = cards.filter((card) => card.id !== cardSelected.id);
            setCards(updatedCards);
            localStorage.setItem("cards", JSON.stringify(updatedCards));
        }
        closeModal();
    };


    const handleModal = (card) => {
        setCardSelected(card)
        setShowModal(true);
    }

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div  >
            <Navbar />
            <div className={style.profileContainer} style={{}}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h2><div className={style.back} onClick={() => navigate(-1)}>🡠</div>My Profile </h2>
                    <button className={style.editButtonMobile} onClick={toggleEditMode}>
                        Edit
                    </button>
                </div>

                <div className={style.profileHeader}>
                    <div className={style.profileHeader}>
                        <img
                            src={Photo}
                            alt="User Avatar"
                            className="profileAvatar"
                        />
                        <h2>{profile.fullName}</h2>
                    </div>
                    <button className={style.editButton} onClick={toggleEditMode}>
                        {isEditing ? "Save" : "Edit"}
                    </button>
                </div>

                <div className={style.profileDetails}>
                    <div className={style.profileDiv}>

                        <div className={style.detailField}>
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={profile.fullName}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className={style.detailFieldS}>
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className={style.profileDiv}>
                        <div className={style.detailField}>
                            <label>Gender</label>
                            <input
                                type="text"
                                name="gender"
                                value={profile.gender}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className={style.detailFieldS}>
                            <label>Country</label>
                            <input
                                type="text"
                                name="country"
                                value={profile.country}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>

                    </div>
                </div>

                <h3>Saved Payment Methods</h3>
                <div className={style.paymentMethods}>
                    {cards.map((card) => (
                        <div key={card.id} className={style.paymentCard}>
                            <div className={style.paymentCardInside}>
                                <img className={style.card} src={Card} alt="card" />
                                <div>
                                    <p>{card.number}</p>
                                    <small>{card.NameonCard}</small>
                                </div>
                            </div>
                            <img className={style.edit} src={Edit} alt="Edit Icon" onClick={() => handleModal(card)} />
                        </div>
                    ))}
                    <div className={style.addPaymentCard}>
                        <img className={style.card} src={Plus} alt="card" />
                        <div>
                            <p>Add New Card</p>

                        </div>

                    </div>
                </div>
                {showModal && (
                    <div className={style.modalOverlay}>
                        <div className={style.modal}>
                            <div className={style.modalHeader}>Edit Payment Method</div>
                            <div className={style.modalBody}>
                                <div className={style.modalContent}>
                                    <label>Card Number</label>
                                    <input type="text" name="number" className={style.input} placeholder="XXXX XXXX XXXX 1234" value={cardSelected.number}
                                        onChange={handleCardChange} />
                                </div>
                                <div className={style.modalContent}>
                                    <label>Expiration</label>
                                    <input type="text" name="Expiration" className={style.input} placeholder="MM/YY" value={cardSelected.Expiration}
                                        onChange={handleCardChange} />
                                </div>
                                <div className={style.modalContent}>
                                    <label>CVC</label>
                                    <input type="text" name="CVC" className={style.input} placeholder="XXX" value={cardSelected.CVC}
                                        onChange={handleCardChange} />
                                </div>
                                <div className={style.modalContent}>
                                    <label>Name on Card</label>
                                    <input type="text" name="NameonCard" className={style.input} placeholder="John Doe" value={cardSelected.NameonCard}
                                        onChange={handleCardChange} />
                                </div>
                            </div>
                            <div className={style.modalFooter}>
                                <button className={style.removeButton} onClick={removeCard}>
                                    {window.innerWidth > 768 ? "Remove" : "Delete"}
                                </button>
                                <div>
                                    <button className={style.cancelButton} onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button className={style.saveButton} onClick={saveCardChanges}>Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {window.innerWidth > 768 && <Footer />}
        </div >
    );
};


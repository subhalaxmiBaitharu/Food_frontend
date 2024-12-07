import React, { useState, useEffect } from "react";
import styles from "./address.module.css";
import Navbar from "../../components/Navbar";
import Location from "../../images/location (3).png";
import { useNavigate } from "react-router-dom";
import { getUserDetailsById } from "../../routes";

export default function Address({ deliveryAddress, setDeliveryAddress }) {

  const navigate = useNavigate();
  const loadAddressListFromStorage = () => {
    const storedAddressList = localStorage.getItem("addressList");
    return storedAddressList
      ? JSON.parse(storedAddressList)
      : [];
  };

  const [addressList, setAddressList] = useState(loadAddressListFromStorage);
  const [user, setUser] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(localStorage.getItem('deliveryAddress'));
  const [formFields, setFormFields] = useState({
    state: "",
    city: "",
    pincode: "",
    phone: "",
    address: "",
  });

  const state = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  useEffect(() => {
    const defaultAddress = addressList.find((addr) => addr.default)?.fullAddress;
    setDeliveryAddress(defaultAddress || "");
  }, [addressList, setDeliveryAddress]);

  useEffect(() => {
    localStorage.setItem("addressList", JSON.stringify(addressList));
  }, [addressList]);

  const openModal = (address = null) => {
    if (address) {
      const [addr, city, state, pincode] = address.fullAddress.split(", ");
      setFormFields({
        address: addr.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
        phone: address.phoneNumber,
      });
      setCurrentAddress(address);
    } else {
      setFormFields({ state: "", city: "", pincode: "", phone: "", address: "" });
      setCurrentAddress("");
    }
    setModalVisible(true);
  };


  useEffect(() => {
    const userId = localStorage.getItem("userId")
    if (userId) {
      getUserDetailsById(userId)
        .then((data) => {
          setUser(data.user.name);
        })
        .catch((error) => console.error("Error fetching user details:", error));
    }
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    addressList.map((addr) => {
      if (addr.default == true) {
        setDeliveryAddress(addr.fullAddress);
      }
    })
  })
  const handleFormChange = (field, value) => {
    setFormFields((prev) => ({ ...prev, [field]: value }));
  };

  const saveAddress = () => {
    const { state, city, pincode, phone, address } = formFields;

    if (!state || !city || !pincode || !phone || !address) {
      alert("All fields are required.");
      return;
    }

    const newAddress = {
      id: currentAddress ? currentAddress.id : Date.now(),
      name: user,
      fullAddress: `${address}, ${city}, ${state}, ${pincode}`,
      phoneNumber: phone,
      default: currentAddress ? currentAddress.default : false,
    };

    setAddressList((prevList) => {
      if (currentAddress) {
        return prevList.map((addr) => (addr.id === currentAddress.id ? newAddress : addr));
      } else {
        return [...prevList, newAddress];
      }
    });

    closeModal();
  };

  const deleteAddress = (id) => {
    setAddressList((prev) => prev.filter((addr) => addr.id !== id));
  };

  const markAsDefault = (id) => {

    const updatedAddressList = addressList.map((addr) =>
      addr.id === id
        ? { ...addr, default: true }
        : { ...addr, default: false }
    );
    setAddressList(updatedAddressList);
    const selectedAddress = updatedAddressList.find((addr) => addr.id === id).fullAddress;
    setDeliveryAddress(selectedAddress);
  };

  const handleClickOutside = (event) => {
    if (isModalVisible && event.target.classList.contains(styles.modal)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isModalVisible]);

  return (
    <div className={styles.container}>
      <Navbar currentAddress={deliveryAddress} />
      <div className={styles.mainContainer}>
        <h2><div className={styles.back} onClick={() => navigate(-1)}>🡠</div> Your Addresses</h2>
        <div className={styles.addressGrid}>

          <div className={styles.addCard} onClick={() => openModal()}>
            <div className={styles.addIcon}>+</div>
            <p>Add Address</p>
          </div>

          {addressList.map((address) => (
            <div key={address.id} className={styles.addressCard}>
              <div className={styles.cardHeader}>
                <h3>{address.name}</h3>
                {address.default && <span className={styles.defaultLabel}>Default</span>}
              </div>
              <div>
                <p>{address.fullAddress}</p>
                <p>Phone: {address.phoneNumber}</p>
              </div>
              <div className={styles.actions}>
                <button onClick={() => openModal(address)}>Edit</button>
                <div className={styles.line}></div>
                <button onClick={() => deleteAddress(address.id)}>Remove</button>
                {!address.default && (
                  <>
                    <div className={styles.line}></div>
                    <button onClick={() => markAsDefault(address.id)}>Set as Default</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalVisible && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>
              <img src={Location} alt="Location Icon" />
              {currentAddress ? "Edit Address" : "Add Address"}
            </h3>
            <div className={styles.form}>
              <div className={styles.formTop}>
                <select
                  value={formFields.state}
                  onChange={(e) => handleFormChange("state", e.target.value)}
                >
                  <option value="" disabled>
                    State
                  </option>
                  {state.map((state, idx) => (
                    <option key={idx} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="City/District"
                  value={formFields.city}
                  onChange={(e) => handleFormChange("city", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Pin Code"
                  value={formFields.pincode}
                  onChange={(e) => handleFormChange("pincode", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Phone Number"
                  value={formFields.phone}
                  onChange={(e) => handleFormChange("phone", e.target.value)}
                />
              </div>
              <textarea
                placeholder="Enter Full Address"
                value={formFields.address}
                onChange={(e) => handleFormChange("address", e.target.value)}
              ></textarea>
            </div>
            <div className={styles.modalActions}>
              <button onClick={saveAddress}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


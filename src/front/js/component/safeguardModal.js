import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const SafeguardrModal = (props) => {

  const { store, actions } = useContext(Context);
  const { id, provider_id, service, date } = props;

  const [updatedServiceRequestPasswords, setUpdatedServiceRequestPasswords] = useState({
    verbalPassword: "",
    qrPassword: "",
  })

  const [qrCodeImage, setQrCodeImage] = useState("");

  // useEffects

  useEffect(() => {
    if (store.serviceRequestPasswords) {
      setUpdatedServiceRequestPasswords({
        ...updatedServiceRequestPasswords,
        verbalPassword: store.serviceRequestPasswords.verbal_password,
        qrPassword: store.serviceRequestPasswords.qr_password
      });
    }
  }, [store.serviceRequestPasswords]);


  // useEffect for QR code 

  useEffect(() => {
    const generateQRCode = async (text, size) => {

      const credentials = JSON.parse(localStorage.getItem("credentials"));
      const adminText = `Solutioner Security ID: #${id}-${credentials.id}. Service: ${service}, on ${date}. QR password: `;
      const encodedText = encodeURIComponent(adminText + text);
      const url = `https://image-charts.com/chart?chs=${size}x${size}&cht=qr&chl=${encodedText}&choe=UTF-8&icqrb=7F7F7F&icqrf=e0e0e0`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to generate QR code.');
        }

        const qrBlob = await response.blob();
        return qrBlob;
      } catch (error) {
        console.error(error);
        return "";
      }
    };

    const generateQR = async () => {
      if (updatedServiceRequestPasswords && updatedServiceRequestPasswords.qrPassword && updatedServiceRequestPasswords.qrPassword !== "") {
        try {
          const qrBlob = await generateQRCode(updatedServiceRequestPasswords.qrPassword, 160);
          setQrCodeImage(qrBlob);
        } catch (error) {
          console.error(error);
        }
      }
    };

    generateQR();
  }, [updatedServiceRequestPasswords.qrPassword]);


  // handle Functions

  const handleChangeVerbalPassword = (event) => {
    setUpdatedServiceRequestPasswords({
      ...updatedServiceRequestPasswords,
      verbalPassword: event.target.value
    });
  };

  const handleChangeQrPassword = (event) => {
    setUpdatedServiceRequestPasswords({
      ...updatedServiceRequestPasswords,
      qrPassword: event.target.value
    });
  };

  const handleCloseSafeguardModal = (id) => {
    const dialog = document.querySelector(`#dialogSafeguard${id}`);
    dialog.close();
  }

  const hamdleUpdateServiceRequestPasswords = (id) => {
    actions.updateServiceRequestPasswords(updatedServiceRequestPasswords, id);
    handleCloseSafeguardModal(id);
  }

  // Map

  const experienceMap = new Map([
    [1, "1 year"],
    [2, "1 to 3 years"],
    [3, "over 3 years"],
  ]);

  // Pre-processing props

  // subcomponenets

  const roundToNearestHalf = (num) => {
    return Math.floor(num * 2) / 2;
  };


  const StarRating = ({ rating }) => {
    const renderStar = (indexOfStar) => {
      if (indexOfStar <= Math.floor(rating)) {
        return (
          <span className="filled-star">
            <svg className="starWhite" xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 -960 960 960" width="10">
              <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
            </svg>
          </span>
        );
      } else if (indexOfStar === Math.floor(rating) + 1 && rating % 1 !== 0) {
        return (
          <span className="half-filled-star">
            <svg className="starWhite" xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 -960 960 960" width="10">
              <path d="m480-299 157 95-42-178 138-120-182-16-71-168v387ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
            </svg>
          </span>
        );
      } else {
        return (
          <span className="empty-star">
            <svg className="starWhite" xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 -960 960 960" width="10">
              <path d="m323-205 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-355Z" />
            </svg>
          </span>
        );
      }
    };

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i}>{renderStar(i)}</span>);
    }
    return <div className="starRatingWrapper">{stars}</div>;
  };

  // Main JSX
  return (
    <>
      <dialog data-modal id={"dialogSafeguard" + id} className="servieRequestPasswordModal">
        <div className="passwordImagesWrapper d-flex align-items-top ">
          {store.providerDetails ? (
            <div className="providerAvatarImageWrapper ms-1" key={`providerAvatarImage${id}`}>
              <img className="providerAvatarImage" src={store.providerDetails.avatar_image} alt="Provider Avatar" />
            </div>
          ) : (
            <div className="providerAvatarImageWrapper ms-1" key={`providerAvatarReplacement${id}`}>
              <div className="providerAvatarReplacement"></div>
            </div>
          )}
          {qrCodeImage && store.providerDetails ? (
            <div className="qrCodeImageWrapper">
              <img className="qrCodeImage" src={URL.createObjectURL(qrCodeImage)} alt="QR Code" />
            </div>
          ) : (
            <div className="qrCodeImageWrapper">
              <div className="replacementQRCode"></div>
            </div>
          )}
        </div>
        <div>
          {store.providerDetails && (
            <div>
              <div>
                <span className="calendarModalTableLabel providerNameLabel1 me-1">provider:</span>
                <span className="calendarModalTableValue providerNameValue1">{store.providerDetails.name}</span>
              
              </div>
            </div>
          )}
        </div>
        <div className="d-inline-flex inputFormsWrapper">
          <form role="search" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="serviceSearchField2" className="calendarModalTableLabel">
              verbal password:
            </label>
            <input
              id="serviceSearchField2"
              type="search"
              maxLength="12"
              placeholder="Type…"
              aria-label="Search"
              value={updatedServiceRequestPasswords.verbalPassword || ""}
              onChange={handleChangeVerbalPassword}
            />
          </form>
          <form role="search" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="serviceSearchField3" className="calendarModalTableLabel">
              qr:
            </label>
            <input
              id="serviceSearchField3"
              type="search"
              maxLength="12"
              placeholder="Type…"
              aria-label="Search"
              value={updatedServiceRequestPasswords.qrPassword || ""}
              onChange={handleChangeQrPassword}
            />
          </form>
        </div>
        <div>
          <button className="safeguardUpdateButton" onClick={() => { hamdleUpdateServiceRequestPasswords(id) }} >update</button>
          <button className="safeguardCancelButton" onClick={() => { handleCloseSafeguardModal(id) }}>cancel</button>
        </div>
      </dialog>
    </>
  );

};


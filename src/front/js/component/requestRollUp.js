import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";


export const RequestRollUp = (props) => {

    const { store, actions } = useContext(Context);
    let { id, status, date, time, recurrence, quantity, provider_id, address_id, service_description_id, } = props.requestObject;
    let serviceCategory = null;

    const categoryColorMap = new Map([
        ["cleaning", "#32CD32"],
        ["wardrobe", "red"],
        ["plumbing", "#AFEEEE"],
        ["electrical", "yellow"],
        ["hvac", "purple"],
        ["security", "#9400D3"],
        ["handyman", "#EE4B2B"],
        ["patching", "yellow"],
        ["gardening", "green"],
        ["extermination", "teal"],
        ["eventing", "purple"],
        ["companionship", "#FF69B5"],
        ["grooming", "navy"],
        ["nursing", "green"],
        ["nannying", "cyan"],
        ["petcare", "brown"],
        ["wellness", "pink"],
        ["multiple", "white"],
    ]);

    const statusMap = new Map([
        [0, ["expired", "orange"]],
        [1, ["requested", "green"]],
        [2, ["taken", "blue"]],
        [3, ["safeguarded", "yellow"]],
        [4, ["provided", "darkblue"]],
        [5, ["renewed", "grey"]],
        [6, ["reviewed", "black"]],
        [7, ["completed", "white"]],
        [8, ["sanctioned", "black"]],

    ]);

    const recurrenceMap = new Map([
        [1, ["Once", "green"]],
        [2, ["Monthly", "yellow"]],
        [3, ["Weekly", "blue"]],
        [4, ["Daily", "red"]],

    ]);

    // Handle Functions

    const handleClickCancel = (serviceRequestId) => {
        actions.deleteServiceRequest(serviceRequestId);
    }

    const handleUpdateAndRenewServiceRequest = (serviceRequestId) => {
        actions.updateAndRenewServiceRequest(serviceRequestId);
    }

    // Subcomponents

    const IconBar = () => {
        const HomeIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 -960 960 960" width="12" style={{ fill: "var(--requestRollUpColor)" }}>
                <path d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z" />
            </svg>
        );

        const RepeatIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 -960 960 960" width="12" style={{ fill: "var(--requestRollUpColor)" }}>
                <path d="M480-80q-75 0-140.5-28T225-185q-49-49-77-114.5T120-440h60q0 125 87.5 212.5T480-140q125 0 212.5-87.5T780-440q0-125-85-212.5T485-740h-23l73 73-41 42-147-147 147-147 41 41-78 78h23q75 0 140.5 28T735-695q49 49 77 114.5T840-440q0 75-28 140.5T735-185q-49 49-114.5 77T480-80Z" />
            </svg>
        );
        
        const PasswordIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 -960 960 960" width="12" style={{ fill: "var(--requestRollUpColor)" }}><path d="M237.694-100.001q-23.596 0-40.645-17.048-17.048-17.049-17.048-40.645v-400.151q0-23.894 17.048-40.793 17.049-16.899 40.645-16.899h69.615v-91.769q0-71.89 50.439-122.29 50.439-50.401 122.384-50.401 71.944 0 122.252 50.401 50.307 50.4 50.307 122.29v91.769h69.615q23.596 0 40.645 16.899 17.048 16.899 17.048 40.793v400.151q0 23.596-17.048 40.645-17.049 17.048-40.645 17.048H237.694Zm0-45.384h484.612q5.385 0 8.847-3.462 3.462-3.462 3.462-8.847v-400.151q0-5.385-3.462-8.847-3.462-3.462-8.847-3.462H237.694q-5.385 0-8.847 3.462-3.462 3.462-3.462 8.847v400.151q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462Zm242.474-144.616q27.986 0 47.793-19.531 19.808-19.531 19.808-47.007 0-26.538-19.976-47.768-19.976-21.231-47.961-21.231-27.986 0-47.793 21.231-19.808 21.23-19.808 48.268 0 27.039 19.976 46.538 19.976 19.5 47.961 19.5ZM352.693-615.537h254.614v-91.769q0-53.045-37.09-90.176-37.09-37.132-90.077-37.132-52.986 0-90.217 37.132-37.23 37.131-37.23 90.176v91.769ZM225.385-145.385v-424.769 424.769Z"/></svg>
            )

        const QuantityIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 -960 960 960" width="12" style={{ fill: "var(--requestRollUpColor)" }}>
                <path d="M286.788-81Q257-81 236-102.212q-21-21.213-21-51Q215-183 236.212-204q21.213-21 51-21Q317-225 338-203.788q21 21.213 21 51Q359-123 337.788-102q-21.213 21-51 21Zm400 0Q657-81 636-102.212q-21-21.213-21-51Q615-183 636.212-204q21.213-21 51-21Q717-225 738-203.788q21 21.213 21 51Q759-123 737.788-102q-21.213 21-51 21ZM235-741l110 228h288l125-228H235Zm-30-60h589.074q22.964 0 34.945 21Q841-759 829-738L694-495q-11 19-28.559 30.5Q647.881-453 627-453H324l-56 104h491v60H277q-42 0-60.5-28t.5-63l64-118-152-322H51v-60h117l37 79Zm140 288h288-288Z" />
            </svg>
        );
        return (
            <div className="">
                <span>{HomeIcon}</span>
                <span>{PasswordIcon}</span>
                <span>{RepeatIcon}</span>
                <span>{QuantityIcon}</span>
            </div>
        );
    };


    const RequestStatusBar = () => {
        const circleCount = 7;
        const circleElements = [];
        let circleStyle = {};

        for (let i = 0; i < circleCount; i++) {
            circleStyle = i === status ? (status === 0 ? { background: "#ffbf00" } : { background: "var(--standOutGreen)" }) : { background: "var(--categoryLabelBackground)" };

            circleElements.push(
                <div className="statusCircle" style={circleStyle} key={i}></div>
            );
        }

        return (
            <div className="statusBarContainer">
                <div className="statusBarRow">{circleElements}</div>
            </div>
        );
    };

    // Pre-processing Props

    const shortenTimeFormat = (time) => {
        const [hour, minutes, _] = time.split(':');
        const paddedHour = hour.padStart(2, '0');
        return `${paddedHour}:${minutes}`;
    };

    const convertDateFormat = (longDateFormat) => {
        const date = new Date(longDateFormat);

        const formattedDate = new Intl.DateTimeFormat('en', {
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        }).format(date);

        return formattedDate;
    };

    const providerString = "details";
    let addressString = null;
    let servideString = null;

    const statusString = statusMap.get(status)[0].charAt(0).toUpperCase() + statusMap.get(status)[0].slice(1);
    const dateString = convertDateFormat(date);
    const timeString = shortenTimeFormat(time);
    const recurrenceString = recurrenceMap.get(recurrence)[0];

    if (store.userAddresses) {
        addressString = (store.userAddresses.id1 === address_id) ? "main address" : "secondary address"
    }

    if (store.serviceDescriptions) {
        const temporaryObject = store.serviceDescriptions.find(object => object.id === service_description_id);
        serviceCategory = temporaryObject ? temporaryObject.category : null;
        servideString = temporaryObject ? temporaryObject.service : "None";
    }

    // Main JSX
    return (
        <>
            <div className="container-fluid my-1">
                <div className="requestRollUp my-1" id={id}>
                    <div className="requestRollUpBanner">
                        <div className="requestRollUpColumns d-flex mx-0 px-0 g-0 vw-100">
                            <div className="requestRollUpColumn1 d-flex justify-content-end">
                                <div className="requestRollUpTitleWrapper">
                                    <span className="requestRollUpTitleLabel">{servideString}</span>
                                </div>
                            </div>
                           
                            <div className="requestRollUpColumn4">
                                <span className="rollUpDescription">date:</span>
                            </div>
                            <div className="requestRollUpColumn5">
                                <span className="rollUpValue">{dateString}</span>
                            </div>
                            <div className="requestRollUpColumn6">
                                <span className="rollUpDescription">time:</span>
                            </div>
                            <div className="requestRollUpColumn7">
                                <span className="rollUpValue">{timeString}</span>
                            </div>
                          
                            <div className="">
                                <button 
                                onClick={() => {handleClickCancel(id)}}
                                className="btn btn-sm btn-danger">CANCEL</button>
                            </div>
                            <div className="">
                                <button 
                                onClick={() => {handleUpdateAndRenewServiceRequest(id)}}
                                className="btn btn-sm btn-success">Update</button>
                            </div>
                       
                        </div>
                    </div>
                    <div className="requestExpandableWrapper" id={"requestExpandableWrapperId" + id}>
                        <div className="requestExpandable">
                            <div className="requestExpandableContent">
                                <p>
                                </p>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </>

    );
};


/* 

<div className="bookButtonWrapper">
<div className="bannerLabel4 d-flex align-items-center">
    <button
        className="bookButton mt-1"
    // onClick={handleBookClick}
    >
        book
    </button>
</div>
</div> */
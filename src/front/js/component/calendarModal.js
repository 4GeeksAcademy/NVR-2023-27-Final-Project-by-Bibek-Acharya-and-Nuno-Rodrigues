import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const CalendarModal = (props) => {
    const { store, actions } = useContext(Context);
    const { id, service, price } = props

    const [ newSerViceRequest , setNewServiceRequest ] = useState({
        status: 1,
        date: "",
        time: "09:00",
        recurrence: 1,
        quantity: 1,
        service_description_id: id,
        user_id: store.credentials.id,
        provider_id: null,
        address_id: null,
    });

    useEffect(() => {
        if (store.userAddresses) {
            setNewServiceRequest({...newSerViceRequest, address_id: store.userAddresses.id1})
        }
    } , [store.userAddresses]);

    const getExtendedDateString = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const handleClickCancel = () => {
        return true;
    }

    const Calendar = () => {

        const currentDate = new Date();
        const startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - currentDate.getDay());

        const weekdayAbbreviations = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        const weeks = [];
        weeks.push(
            <div key="weekdays" className="calendarContainer">
                {weekdayAbbreviations.map((day, index) => (
                    <div key={index} className="weekDaysAbbreviations calendarCell">
                        {day}
                    </div>
                ))}
            </div>
        );

        for (let i = 0; i < 5; i++) {
            const weekStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i * 7);
            const week = [];
            for (let j = 0; j < 7; j++) {
                const day = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + j);
                const dayOfMonth = day.getDate();

                const previousDate = new Date(currentDate);
                previousDate.setDate(currentDate.getDate() - 1);

                const isUnviableDay = (day < previousDate) || (i === 4 && j > currentDate.getDay());
                const isCurrentDay = day.getDate() === currentDate.getDate() && day.getMonth() === currentDate.getMonth() && day.getFullYear() === currentDate.getFullYear();
                const buttonClassName = `calendarCell ${isUnviableDay ? "unviableDay" : "viableDay"} ${isCurrentDay ? "currentDay" : ""}`;

                const cell = (
                    <button
                        key={`${i}-${j}`}
                        className={`${buttonClassName} calendarCell`}
                        onClick={() => {
                            setNewServiceRequest({...newSerViceRequest, date: new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1).toISOString().split('T')[0]})
                        }
                        }
                        disabled={buttonClassName.includes("unviableDay")}
                    >
                        {dayOfMonth}
                    </button>
                );
                week.push(cell);
            }
            weeks.push(<div key={i} className="weekContainer">{week}</div>);
        }

        return <div className="calendarWrapper">{weeks}</div>;
    };

    //CalendarModal JSX
    return (
        <>
            <dialog data-modal id={"dialog" + id} className="">
                <span>
                    <form method="dialog">
                        <button onClick={(handleClickCancel)}>
                            <span className="cancelModal">
                                <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="48"><path d="m336-294 144-144 144 144 42-42-144-144 144-144-42-42-144 144-144-144-42 42 144 144-144 144 42 42ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Z" /></svg>
                            </span>
                        </button>
                    </form>
                </span>
                <div>
                    {/* {store.user_addresses.id1} */}
                    Addressid: {newSerViceRequest.address_id}
                </div>
                <div className="menuLabel d-flex justify-content-center align-items-center">
                    book {service.toLowerCase()}
                </div>
                <div>
                    <Calendar />
                </div>
                <div>
                    Service date: {newSerViceRequest.date}
                </div>
                <div>
                    <input className="expand-toggle" id={`expand-toggle${id}`} type="checkbox" />
                    <label htmlFor={`expand-toggle${id}`} className="expand-label">Toggle</label>
                    <div className="expand-content">
                        Invisible content to expand
                    </div>
                </div>
                <p>
                    {id}
                </p>
                <p>
                    {service}
                </p>
                <p>
                    {price}
                </p>
            </dialog>

        </>

    );
}
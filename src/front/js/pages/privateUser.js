import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/privateuser.css";

export const PrivateUser = () => {
  const [serviceSearchBar, setServiceSearchBar] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPrice, setSelectedPrice] = useState("Any price");


  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleBook = (id, service, price) => {
    alert(`The key value of the ${service} is: ${id} , with price ${price}`);
  };
  

  useEffect(() => {
    actions.getServiceDescriptions();
  }, []);

  const handleClickHome = () => {
    navigate("/");
  };

  const handleChangeSearchBar = (event) => {
    setServiceSearchBar(event.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setServiceSearchBar("");
  };

  const handlePriceSelect = (price) => {
    setSelectedPrice(price);
    setServiceSearchBar("");
  };

  const filteredServices = store.serviceDescriptions.filter((service) => {
    // Filter by category
    if (selectedCategory !== "All Categories" && service.category !== selectedCategory) {
      return false;
    }
  
    // Filter by price
    if (selectedPrice !== "Any price") {
      const price = parseFloat(service.price);
  
      if (selectedPrice === "less than 50" && price >= 50) {
        return false;
      } else if (selectedPrice === "between 50 and 100" && (price < 50 || price > 100)) {
        return false;
      } else if (selectedPrice === "more than 100" && price <= 100) {
        return false;
      }
    }
  
    // Filter by search bar content
    if (serviceSearchBar.trim() !== "") {
      const searchTerm = serviceSearchBar.toLowerCase();
  
      if (
        !service.category.toLowerCase().includes(searchTerm) &&
        !service.service.toLowerCase().includes(searchTerm) &&
        !service.description.toLowerCase().includes(searchTerm)
      ) {
        return false;
      }
    }
  
    return true;
  });
  
  const categories = ["All Categories", ...new Set(store.serviceDescriptions.map((service) => service.category))];
  categories.sort();

  return (
    <>
      <nav className="navbar bg-light fixed-top">
        <div className="container-fluid">
          <button className="btn btn-primary" onClick={handleClickHome}>
            Home
          </button>
          {/* Category dropdoiwn */}
          <div className="dropdown">
            <button
              className="bg-light border-0"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Category: {selectedCategory}
            </button>
            <ul className="dropdown-menu rounded-0">
              {categories.map((category, index) => (
                <li className="category-item" key={index} onClick={() => handleCategorySelect(category)}>
                  {category}
                </li>
              ))}
            </ul>
          </div>
          {/* Price dropdoiwn */}
          <div className="dropdown">
            <button
              className="bg-light border-0"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Price: {selectedPrice}
            </button>
            <ul className="dropdown-menu rounded-0">
              <li className="price-item" onClick={() => handlePriceSelect("Any price")}>
                Any price
              </li>
              <li className="price-item" onClick={() => handlePriceSelect("less than 50")}>
                Less than 50
              </li>
              <li className="price-item" onClick={() => handlePriceSelect("between 50 and 100")}>
                Between 50 and 100
              </li>
              <li className="price-item" onClick={() => handlePriceSelect("more than 100")}>
                More than 100
              </li>
            </ul>
          </div>

          {/* Search bar */}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={serviceSearchBar}
              onChange={handleChangeSearchBar}
            />
          </form>
        </div>
      </nav>
      {/* Display filtered services */}
      <div className="py-5">
        <p>{serviceSearchBar}</p>
        {filteredServices.map((filteredService, index) => (
          <div className="service-wrapper mx-3 px-3" key={filteredService.id}>
            <p>Category: {filteredService.category}</p>
            <p>Service: {filteredService.service}</p>
            <span>Description: {filteredService.description}</span>
            <span>Unit: {filteredService.unit}</span>
            <span>Duration: {filteredService.duration}</span>
            <span>Personnel: {filteredService.personnel}</span>
            <span>Includes: {filteredService.included}</span>
            <span>Price: {filteredService.price}</span>
            <button className="btn btn-success m-3" onClick={() => handleBook(filteredService.id, filteredService.service, filteredService.price)}>Book</button>
          </div>
        ))}
      </div>
    </>
  );
};

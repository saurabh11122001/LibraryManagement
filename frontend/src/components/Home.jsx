import React, { useEffect, useState } from "react";
import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import { setAllAppliedBooks, setCategoryBook, setSearchedQuery } from "../redux/bookSlice";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/authSlice";

const Home = () => {
  let dispatch=useDispatch();
  const categories = [
    { name: "Fiction", description: "Immerse in storytelling." },
    { name: "Historical Fiction", description: "Learn from real events." },
    { name: "Drama", description: "Expand your knowledge." },
    { name: "Short Stories", description: "Explore the past." },
    { name: "Thriller", description: "Explore the past." },
    { name: "Crime Thriller", description: "Explore the past." },
  ];
  const [query,setQuery]=useState("");
  const navigate=useNavigate();
useEffect(()=>{
  dispatch(setCategoryBook([]));
  dispatch(setAllAppliedBooks([]));
},[]);

  const searchHandler=()=>{
    dispatch(setLoading(true));
    if(!query){
      dispatch(setLoading(false))
      return
    }
    dispatch(setLoading(true));
    dispatch(setSearchedQuery(query));
    dispatch(setLoading(false));
    navigate("/search");
    setQuery("");
  }
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="home-title">Welcome to Scholar's Haven</h1>
          <p className="home-subtitle">
            Discover books across various genres and explore a world of
            knowledge and imagination.
          </p>
          <div className="search-bar">
            <input type="text"value={query} placeholder="Search and purchase Book...."onChange={(e)=>(setQuery(e.target.value))} />
            <h3 className="search-btn"onClick={searchHandler}>Search</h3>
          </div>
        </div>
      </section>

     
      <div><h1 style={{fontSize:'30px',fontWeight:'700'}}>Categories</h1></div>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <Link
            to={`/category/${category.name}`}
            key={index}
            className="category-card"
          >
            <h2>{category.name}</h2>
            <p>{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

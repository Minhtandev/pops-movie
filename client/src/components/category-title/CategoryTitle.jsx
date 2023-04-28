import React from "react";
import "./category-title.scss";

const CategoryTitle = ({ text = "Movies" }) => {
  return <h3 className="category-title">{text}</h3>;
};

export default CategoryTitle;

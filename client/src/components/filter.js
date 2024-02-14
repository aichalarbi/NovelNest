import React, { useState } from "react";

const Filter = ({ handleFilter }) => {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilter(title);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={handleChange}
      />
      <button type="submit">Filter</button>
    </form>
  );
};

export default Filter;

import React, { useState } from 'react';

const EditBookForm = ({ book, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: book.title,
    authors: book.authors.join(', '),
    description: book.description,
    image: book.image,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} />
      
      <label>Description:</label>
      <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
      <label>Image:</label>
      <input type="text" name="image" value={formData.image} onChange={handleChange} />
      <button type="submit">Update Book</button>
    </form>
  );
};

export default EditBookForm;

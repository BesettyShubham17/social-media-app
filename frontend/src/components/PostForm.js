import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem("user") || "Shubham"; // Or get from JWT if decoding
    try {
      await axios.post('http://localhost:5000/api/posts', { content, user });
      setContent('');
      onPostCreated(); // reload posts
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <textarea
        className="form-control"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post here..."
        required
      />
      <button type="submit" className="btn btn-primary mt-2">Post</button>
    </form>
  );
};

export default PostForm;
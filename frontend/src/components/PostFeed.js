import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import jwtDecode from 'jwt-decode';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const token = localStorage.getItem('token');
  const decoded = token ? jwtDecode(token) : null;
  const currentUser = decoded?.email || 'Anonymous';

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      fetchPosts();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const startEdit = (post) => {
    setEditingId(post._id);
    setEditContent(post.content);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, {
        content: editContent
      });
      setEditingId(null);
      setEditContent('');
      fetchPosts();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/posts/${id}/like`);
      fetchPosts();
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h3>Create a Post</h3>
      <PostForm onPostCreated={fetchPosts} />

      <h3>All Posts</h3>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="card mb-2 text-start">
            <div className="card-body">
              {editingId === post._id ? (
                <>
                  <textarea
                    className="form-control"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button className="btn btn-success mt-2 me-2" onClick={() => handleUpdate(post._id)}>Save</button>
                  <button className="btn btn-secondary mt-2" onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <p>{post.content}</p>
                  <small>By: {post.user}</small>
                  <div className="mt-2">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleLike(post._id)}>
                      ❤ Like ({post.likes})
                    </button>
                    {post.user === currentUser && (
                      <>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => startEdit(post)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(post._id)}>Delete</button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostFeed;

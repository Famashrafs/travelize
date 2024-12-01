import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import defaultProfile from '../images/default-avatar.jpg'
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  const [personalInfo , setPersonalInfo] = useState('');
  const user = auth.currentUser;
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setPersonalInfo(data); // Update the userData in App

          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user, setPersonalInfo]);
  console.log(personalInfo)
  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(savedBlogs);
  }, []);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64Image = await convertToBase64(file);
      setMainImage(base64Image);
    }
  };

  const handleSecondImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64Image = await convertToBase64(file);
      setSecondImage(base64Image);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content && mainImage && secondImage) {
      const newBlog = { title, content, mainImage , secondImage  };
      const updatedBlogs = [...blogs, newBlog];
      setBlogs(updatedBlogs);
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      setTitle('');
      setContent('');
      setMainImage(null);
      setSecondImage(null);
      setIsCreatingBlog(false);
    }
    window.location.reload();
  };

  const handleDelete = (index) => {
    const updatedBlogs = blogs.filter((_, i) => i !== index);
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    window.location.reload();
  };

  return (
    <div className="blog-page-container page-margin-top">
      <div className="personal-info">
        <img src={personalInfo.profilePicUrl || defaultProfile} alt={`${personalInfo.displayName}'s profile`} style={{width:"50px",height:"50px",borderRadius:"50%"}}/>
        <h3>{personalInfo.displayName}</h3>
        <button className="create-blog-btn" onClick={() => setIsCreatingBlog(!isCreatingBlog)}>
          Create a New Blog Post
        </button>
      </div>

      <div className="blog-content">
        {isCreatingBlog && (
          <div className="create-blog-section">
            <h2>Create a New Blog Post</h2>
            <form onSubmit={handleSubmit} className="blog-form">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea style={{width:"500px",height:"200px", border:"1px solid #ddd"}} id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="image">Blog Cover</label>
                <input type="file" id="image" onChange={handleMainImageChange} required />
              </div>
              {mainImage && <div className="image-preview"><img src={mainImage} alt="Blog preview" /></div>}
              <div className="form-group">
                <label htmlFor="image">Blog's Image</label>
                <input type="file" id="image" onChange={handleSecondImageChange} required />
              </div>
              {secondImage && <div className="image-preview"><img src={secondImage} alt="Blog preview" /></div>}
              <button type="submit" className="post-btn">Post Blog</button>
            </form>
          </div>
        )}

        <div className="blog-list-section">
          <div className="blog-list">
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <div key={index} className="blog-card">
                  <Link to={`/blog/${index}`} state={{ blog }}> {/* Link to detailed page */}
                    <img src={blog.mainImage} alt="Blog" className="blog-image" />
                    <div className='blog-card-content'>
                      <div className='blog-text'>
                        <h2>{blog.title}</h2>
                        <p>{blog.content.substring(0, 50)}<span style={{fontWeight:"bold"}}>...see more</span></p> {/* Show a preview */}
                      </div>
                  </div>
                  </Link>
                  <div className='delete-btn'>
                        <button onClick={() => handleDelete(index)} style={{color:"#f00"}}><FontAwesomeIcon icon={faTrash} /></button>
                      </div>
                </div>
              ))
            ) : (
              <p>No blogs available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

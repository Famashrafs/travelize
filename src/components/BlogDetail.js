import {useEffect} from 'react';
import { useLocation } from 'react-router-dom'; // To access passed blog data

const BlogDetail = () => {
  const { state } = useLocation(); // Access the state passed from Link
  const { blog } = state; // Extract blog object
  useEffect(() => {
    // Scroll to the top of the page when the component is rendered
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="blog-detail-container page-margin-top">
      <div className="blog-cover" style={{backgroundImage:`url(${blog.mainImage})`}}>
        <h1>{blog.title}</h1>
      </div>
      <div className="blog-content-detail" style={{display:"flex"}}>
        <p style={{padding:"70px 50px"}}>{blog.content}</p>
        <img style={{width:"400px", height:"300px", padding:"20px"}} src={blog.secondImage} alt={blog.title} />
      </div>
    </div>
  );
};

export default BlogDetail;

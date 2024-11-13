// Home.js
import ContactUs from '../components/ContactUs';
import DownloadSection from '../components/DownloadSection';
import Testimonials from '../components/Testimonials';
import LandingPage from '../pages/LandingPage';
import { Link } from 'react-router-dom';
const Home = ({ blogs , hotelsData }) => {
  return (
  <div>
      <LandingPage/>
      <div className='recommended-hotels'>
        <h2 style={{ fontWeight:"bold",fontSize:"40px", margin:"20px 0 0 30px"}}>Best Hotels</h2>
        <div className='hotel-list'>
        {  hotelsData.length > 0 ? (
            hotelsData.slice(0, 5).map((hotel, index) => (
              <div key={index} className="blog-card">
                <img src={hotel.images[0] || 'default-hotel-image.jpg'} alt="Hotel" className="hotel-image" />
              </div>
            ))
          ) : (
            <p>No blogs available yet.</p>
          )}
        </div>
      </div>
      <div className="blog-list-section">
        <h2 style={{ fontWeight:"bold",fontSize:"40px",textAlign: "center"}}>Recent Blogs</h2>
        <div className="blog-list">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div key={index} className="blog-card">
                {/* Make each blog clickable to its detail page */}
                <Link to={`/blog/${index}`} state={{ blog }}>
                  <img src={blog.mainImage} alt="Blog" className="blog-image" />
                  <div className='blog-text-card'>
                    <h2>{blog.title}</h2>
                    <p>{blog.content.substring(0, 50)}<span style={{fontWeight:"bold"}}>...see more</span></p> {/* Show a preview */}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No blogs available yet.</p>
          )}
        </div>
      </div>
      <DownloadSection />
      <Testimonials />
      <ContactUs />
  </div>
  );
};

export default Home;
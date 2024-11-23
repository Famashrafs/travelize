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
      <div className="blog-list-section">
        <h3 className='pre-heading'>Story</h3>
        <h2 className='heading'>Recent Blogs</h2>
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
      <div className='recommended-hotels'>
      <h3 className='pre-heading'>Stay</h3>
        <h2 className='heading' >Rooms & Hotels</h2>
        <div className='hotel-list'>
        {  hotelsData ? (
            hotelsData.slice(0 , 1).map((hotel, index) => (
              <div key={index} className='hotel-card main-hotel-card'>
                <img src={hotel.images[0] || 'default-hotel-image.jpg'} alt="Hotel" className="hotel-image" />
              </div>
            ))
          ) : (
            <p>No hotels available yet.</p>
          )} 
          <div className='rest-hotels'>     
            {  hotelsData ? (
                hotelsData.slice(14, 20).map((hotel, index) => (
                  <div key={index} className='hotel-card'>
                    <img src={hotel.images[0] || 'default-hotel-image.jpg'} alt="Hotel" className="hotel-image" />
                  </div>
                ))
              ) : (
                <p>No hotels available yet.</p>
              )}
          </div>
        </div>
      </div>
      <Testimonials />
      <DownloadSection />
      <ContactUs />
  </div>
  );
};

export default Home;
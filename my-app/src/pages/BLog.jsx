import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap'; // Spinner əlavə olundu
import img from '../imgs/Rectangle_2.jpg';
import '../style/blog.css'
import axios from 'axios';

function BLog() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // isLoading state-i əlavə olundu

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://xnykiejhjsppxvnmqcev.supabase.co/rest/v1/Blog?select=*', {
          headers: {
            apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueWtpZWpoanNwcHh2bm1xY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODk0NDcsImV4cCI6MjAzODg2NTQ0N30.GTpLwlyahu9lMtSdKkCX4C9PtcT_7rvZPRCPYdkP1NY',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueWtpZWpoanNwcHh2bm1xY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODk0NDcsImV4cCI6MjAzODg2NTQ0N30.GTpLwlyahu9lMtSdKkCX4C9PtcT_7rvZPRCPYdkP1NY'
          }
        });
        setBlogs(response.data);
        setIsLoading(false); // Datalar gəldikdən sonra loading-i false elə
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setIsLoading(false); // Error olanda da loading-i false elə
      }
    };

    fetchBlogs();
  }, []);

  // Tarixi formatlamaq üçün funksiya
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short' }; // Ay qısa formada (short), gün rəqəmlə
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date); // İngilis dilində qısa ay formatı
  }

  return (
    <>
      <Container fluid className="p-0 m-0">
        <Row className="g-0">
          <Col>
            <div className='image-container'>
              <img src={img} alt="" />
              <p className='image-text'>Blog</p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="mt-5 blog-container">
        <Row>
          {isLoading ? ( // Əgər loading true-dursa spinner görünsün
            <Col className="text-center">
              <div className="spinner-container text-white"> {/* Spinner stilini burda tətbiq edirik */}
                <Spinner animation="border" role="status" className="custom-spinner">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            </Col>
          ) : (
            blogs.map(blog => (
              <Col md={4} key={blog.id} className="mb-4">
                <Card className="blog-card h-100">
                  <div className="img-container">
                    <Card.Img variant="top" src={blog.image_url} className="blog-image" />
                  </div>
                  <Card.Body>
                    <Card.Text>{formatDate(blog.date)} - <span>{blog.author}</span></Card.Text> {/* Tarixi formatladıq */}
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Text>{blog.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  )
}

export default BLog;

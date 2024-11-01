import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import img from '../imgs/Rectangle_2.jpg';
import '../style/blog.css'
import axios from 'axios';
import { ThemeContext } from '../context api/ThemeContext';

function BLog() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const baseUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_BLOG_KEY;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${baseUrl}/rest/v1/Blog?select=*`, {
          headers: {
            apikey: apiKey,
            Authorization: `Bearer ${apiKey}`
          }
        });
        setBlogs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  return (
    <>
      <Container fluid className={`${isDarkMode ? 'dark-mode' : 'light-mode'} p-0 m-0`}>
        <Row className="g-0">
          <Col>
            <div className='image-container'>
              <img src={img} alt="" />
              <p className='image-text'>Blog</p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className={`${isDarkMode ? 'dark-mode' : 'light-mode'} p-5 blog-container`}>
        <Row className='blog-row'>
          {isLoading ? (
            <Col className="text-center">
              <div className="spinner-container text-white">
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
                    <Card.Text>{formatDate(blog.date)} - <span>{blog.author}</span></Card.Text>
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

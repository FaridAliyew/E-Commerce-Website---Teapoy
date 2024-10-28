import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Container, Button, Modal, Form } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ThemeContext } from '../context api/ThemeContext';

function AdminPanel({ setIsLoggedIn }) {
    const { isDarkMode } = useContext(ThemeContext);
    const [blogs, setBlogs] = useState([]);
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [blogData, setBlogData] = useState({
        image_url: '',
        title: '',
        author: '',
        description: '',
        date: '',
    });

    const logOut = () => {
        localStorage.removeItem('isAdmin');
        setIsLoggedIn(false);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const baseUrl = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_API_ADMIN_KEY;

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${baseUrl}/rest/v1/Blog?select=*`, {
                headers: {
                    apikey: apiKey,
                    Authorization: `Bearer ${apiKey}`
                }
            });
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const saveBlog = async () => {
        try {
            if (editMode && selectedBlog) {
                await axios.patch(`${baseUrl}/rest/v1/Blog?id=eq.${selectedBlog.id}`, blogData, {
                    headers: {
                        apikey: apiKey,
                        Authorization: `Bearer ${apiKey}`,
                    }
                });

                const updatedBlogs = blogs.map((blog) =>
                    blog.id === selectedBlog.id ? { ...blog, ...blogData } : blog
                );
                setBlogs(updatedBlogs);
                toast.success("Update Blog");
            } else {
                const currentDate = new Date().toISOString();
                const blogWithDate = { ...blogData, date: currentDate };

                await axios.post(`${baseUrl}/rest/v1/Blog`, blogWithDate, {
                    headers: {
                        apikey: apiKey,
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    }
                });

                setBlogs([...blogs, blogWithDate]);
                toast.success("Add new blog");
            }

            handleClose();
            setBlogData({ image_url: '', title: '', author: '', description: '', date: '' });
            setEditMode(false);
            setSelectedBlog(null);

            fetchBlogs();
        } catch (error) {
            console.error('Error saving blog:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${baseUrl}/rest/v1/Blog?id=eq.${id}`, {
                headers: {
                    apikey: apiKey,
                    Authorization: `Bearer ${apiKey}`
                }
            });

            setBlogs((prevBlogs) => prevBlogs.filter(blog => blog.id !== id));
            toast.success("Delete Blog");
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlogData({ ...blogData, [name]: value });
    };

    const handleEdit = (blog) => {
        setBlogData(blog);
        setSelectedBlog(blog);
        setEditMode(true);
        handleShow();
    };

    return (
        <Container fluid className={`${isDarkMode ? 'dark-mode' : 'light-mode'} p-5`}>
            <h1 className='text-white dashboard'>Dashboard</h1>
            <Button variant="danger" className='mb-3' onClick={() => { setEditMode(false); handleShow(); }}>
                New Blog
            </Button>

            <Button variant="secondary" className='mb-3 ms-2' onClick={() => logOut()}>
                Log Out
            </Button>

            <Table striped bordered hover >
                <thead >
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id}>
                            <td>{blog.id}</td>
                            <td><img src={blog.image_url} alt={blog.title} style={{ width: '100px' }} /></td>
                            <td>{blog.title}</td>
                            <td>{blog.author}</td>
                            <td>{blog.description}</td>
                            <td>{new Date(blog.date).toLocaleDateString()}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(blog.id)}>
                                    <FaTrash />
                                </Button>
                                <Button variant="warning" onClick={() => handleEdit(blog)} >
                                    <FaEdit />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Edit Blog' : 'Add New Blog'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formImageUrl">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="text" name="image_url" value={blogData.image_url} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={blogData.title} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="formAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" name="author" value={blogData.author} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="description" value={blogData.description} onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveBlog}>
                        {editMode ? 'Update Blog' : 'Add Blog'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default AdminPanel;

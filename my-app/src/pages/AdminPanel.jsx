import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Button, Modal, Form } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

function AdminPanel() {
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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // fetchBlogs funksiyasını useEffect-dən kənarda tərtib edirik
    const fetchBlogs = async () => {
        try {
            const response = await axios.get('https://xnykiejhjsppxvnmqcev.supabase.co/rest/v1/Blog?select=*', {
                headers: {
                    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueWtpZWpoanNwcHh2bm1xY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODk0NDcsImV4cCI6MjAzODg2NTQ0N30.GTpLwlyahu9lMtSdKkCX4C9PtcT_7rvZPRCPYdkP1NY',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueWtpZWpoanNwcHh2bm1xY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODk0NDcsImV4cCI6MjAzODg2NTQ0N30.GTpLwlyahu9lMtSdKkCX4C9PtcT_7rvZPRCPYdkP1NY'
                }
            });
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    // useEffect içərisində fetchBlogs çağırırıq
    useEffect(() => {
        fetchBlogs();
    }, []);

    const saveBlog = async () => {
        try {
            if (editMode && selectedBlog) {
                await axios.patch(`https://xnykiejhjsppxvnmqcev.supabase.co/rest/v1/Blog?id=eq.${selectedBlog.id}`, blogData, {
                    headers: {
                        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueWtpZWpoanNwcHh2bm1xY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODk0NDcsImV4cCI6MjAzODg2NTQ0N30.GTpLwlyahu9lMtSdKkCX4C9PtcT_7rvZPRCPYdkP1NY',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueWtpZWpoanNwcHh2bm1xY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODk0NDcsImV4cCI6MjAzODg2NTQ0N30.GTpLwlyahu9lMtSdKkCX4C9PtcT_7rvZPRCPYdkP1NY',
                        'Content-Type': 'application/json',
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

                await axios.post('https://xnykiejhjsppxvnmqcev.supabase.co/rest/v1/Blog', blogWithDate, {
                    headers: {
                        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueWtpZWpoanNwcHh2bm1xY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODk0NDcsImV4cCI6MjAzODg2NTQ0N30.GTpLwlyahu9lMtSdKkCX4C9PtcT_7rvZPRCPYdkP1NY',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueWtpZWpoanNwcHh2bm1xY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODk0NDcsImV4cCI6MjAzODg2NTQ0N30.GTpLwlyahu9lMtSdKkCX4C9PtcT_7rvZPRCPYdkP1NY',
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

            // Yeniləndikdən sonra siyahını təzələmək üçün fetchBlogs çağırırıq
            fetchBlogs();
        } catch (error) {
            console.error('Error saving blog:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://xnykiejhjsppxvnmqcev.supabase.co/rest/v1/Blog?id=eq.${id}`, {
                headers: {
                    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueWtpZWpoanNwcHh2bm1xY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODk0NDcsImV4cCI6MjAzODg2NTQ0N30.GTpLwlyahu9lMtSdKkCX4C9PtcT_7rvZPRCPYdkP1NY',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueWtpZWpoanNwcHh2bm1xY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODk0NDcsImV4cCI6MjAzODg2NTQ0N30.GTpLwlyahu9lMtSdKkCX4C9PtcT_7rvZPRCPYdkP1NY'
                }
            });

            setBlogs((prevBlogs) => prevBlogs.filter(blog => blog.id !== id));
            toast.success("Delete Blog");

            // Silindikdən sonra siyahını yeniləmək üçün fetchBlogs çağırırıq
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
        <Container>
            <h1 className='text-white mt-5'>Dashboard</h1>
            <Button variant="danger" className='mb-3' onClick={() => { setEditMode(false); handleShow(); }}>
                New Blog
            </Button>
            <Table striped bordered hover>
                <thead>
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

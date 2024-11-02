import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../style/addCommentModal.css'; 

function AddCommentModal() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];

    if (storedUsername) setUsername(storedUsername);
    setComments(storedComments);
  }, []);

  const handleSaveComment = () => {
    const newComment = { username, comment };
    const updatedComments = [...comments, newComment];
    
    setComments(updatedComments);
    localStorage.setItem('username', username);
    localStorage.setItem('comments', JSON.stringify(updatedComments));

    setComment('');
    setShow(false);
  };

  return (
    <div className="text-center mt-5 comment">
      <Button variant="warning" onClick={() => setShow(true)}>
        Add to Comment
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add to Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formComment" className="mt-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your comment here"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              style={{backgroundColor:'#111', color:'white'}}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveComment}>
            Save Comment
          </Button>
        </Modal.Footer>
      </Modal>

      {comments.length > 0 && (
        <div className='container mt-4'>
          {comments.map((savedComment, index) => (
            <div key={index} className="comment-container">
              <p className="comment-username text-start">{savedComment.username}</p>
              <hr />
              <p className="comment-text">{savedComment.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddCommentModal;

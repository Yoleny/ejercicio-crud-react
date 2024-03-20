import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Form, Alert } from 'react-bootstrap';

const App = () => {
  const [users, setUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
  }
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/users/', formData);
      setUsers([...users, response.data]);
      setFormData({ name: '', email: '', avatar: '' });
      setShowAlert(true);
      setAlertType('success');
      setAlertMessage('User created successfully');
    } catch (error) {
      setShowAlert(true);
      setAlertType('danger');
      setAlertMessage('Error creating user');
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://api.escuelajs.co/api/v1/users/${selectedUser.id}`, formData);
      setUsers(
        users.map((user) => (user.id === selectedUser.id ? response.data : user))
      );
      setFormData({ name: '', email: '', avatar: '' });
      setSelectedUser(null);
      setShowAlert(true);
      setAlertType('success');
      setAlertMessage('User updated successfully');
    } catch (error) {
      setShowAlert(true);
      setAlertType('danger');
      setAlertMessage('Error updating user');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://api.escuelajs.co/api/v1/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      setShowAlert(true);
      setAlertType('danger');
      setAlertMessage('User deleted successfully');
    } catch (error) {
      setShowAlert(true);
      setAlertType('danger');
      setAlertMessage('Error deleting user');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectUser = (user) => {
    setFormData({ name: user.name, email: user.email, avatar: user.avatar });
    setSelectedUser(user);
  };

  const handleCleanForm = () => {
    setFormData({
      name: '',
      email: '',
      avatar: '',
    });
    setSelectedUser(null);
  };

  return (
    <Container className="my-5">
      <h1>React CRUD Example</h1>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Avatar</th>
                <th>Actions</th>
              </tr>
</thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <img
                      src={user.avatar || 'https://via.placeholder.com/150'}
                      alt="avatar"
                      style={{ width: '100px' }}
                    />
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleSelectUser(user)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col>
          <Form onSubmit={selectedUser ? handleEditUser : handleCreateUser}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAvatar">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary"type="submit">
              {selectedUser ? 'Update' : 'Create'}
            </Button>
            <Button variant="secondary" onClick={handleCleanForm}>
              Limpiar
            </Button>
          </Form>
          {showAlert && (
            <Alert
              variant={alertType}
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {alertMessage}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
import React from 'react';
import Form from '../Form';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useState from 'react'
import '../../styles/Form.css';


function LoginModal(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
            </Modal>
    
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Go
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

// render(<LoginModal />);
export default LoginModal
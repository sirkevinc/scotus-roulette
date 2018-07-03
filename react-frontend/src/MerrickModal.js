import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class MerrickModal extends React.Component {
  state = {
    show: true,
  }


  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.toggle();
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  
  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>You Got Merrick Garland'd!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
            The government is split and deadlocked over the supreme court nominee
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer> 
        </Modal>
      </div>
    );
  }
}

export default MerrickModal;
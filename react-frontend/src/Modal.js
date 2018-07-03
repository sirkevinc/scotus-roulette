import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Facts from './data/facts';
import Judges from './data/judgeData';

class InfoModal extends React.Component {
  state = {
    show: false,

  }
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    console.log(Judges[this.props.category])
    return (
      <div>
        <button onClick={this.handleShow}></button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.judge}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              
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

export default InfoModal;
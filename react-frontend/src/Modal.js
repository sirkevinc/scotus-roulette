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
    const style = {
      "border": "none",
      "background": "none",
      "outline": "none",
      "width": "100%",
      "textAlign": "center",
      "margin": "5% 0"
    }
    return (
      <div>
        <button onClick={this.handleShow} style={style}>{this.props.judge}</button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.judge}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              YOYOYOYO
            </p>
            {this.props.message ? 
            <div>
              {this.props.message}
            </div> : null}
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
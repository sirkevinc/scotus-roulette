import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
// import Facts from './data/facts';
// import Judges from './data/judgeData';

class InfoModal extends React.Component {
  state = {
    show: false,
    info: {},
    infoLoaded: false
  }


  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false, info: {}, infoLoaded: false });
  }

  handleShow() {
    this.setState({ show: true });
    axios.get(`https://www.courtlistener.com/api/rest/v3/people/${this.props.id}/`)
      .then(res => {
        console.log(res.data);
        this.setState({ info: res.data, infoLoaded: true })
      })
      .catch(err => {
        console.log(err);
      })
  }

  
  render() {
    const info = this.state.info;
    const infoLoaded = this.state.infoLoaded
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
              {infoLoaded && info.dob_city && `Born in: ${info.dob_city}, ${info.dob_state}`}
            </p>
            <p>
              {infoLoaded && info.educations.length && `Education: ${info.educations.map(elem => elem.school.name.concat(' (', elem.degree_detail,')')).join(', ')}`}
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
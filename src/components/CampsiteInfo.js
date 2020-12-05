import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,

      yourName: "",

      touched: {
        yourName: false,
      }
    
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleLogin = this.handleLogin.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleSubmit(values) {
    console.log(values)
    console.log("Current state is: " + JSON.stringify(values));
    alert("Current state is: " + JSON.stringify(values));
  }

  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.state.isModalOpen} toggleModal={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>

            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="firstName" lg={12}>
                  Rating
                </Label>
                <Col lg={10}>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    placeholder="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="firstName" md={12}>
                  Your Name
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".author"
                    id="yourName"
                    name="yourName"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(2),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    component="div"
                    messages={{
                      required: "Required",
                      minLength: "Must be at least 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="firstName" md={12}>
                  Comment
                </Label>
                <Col md={10}>
                  <Control.textarea
                    model=".comment"
                    id="Comment"
                    name="Comment"
                    placeholder="Comment Here"
                    rows={6}
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(2),
                      maxLength: maxLength(15),
                    }}
                  />
                </Col>
              </Row>

              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
        <Button
          onClick={this.toggleModal}
          outline
          className="fa fa-lg fa-pencil"
        >
          Submit Comment
        </Button>
      </React.Fragment>
    );
  }
}
 
    function RenderCampsite({ campsite }) {
      return (
        <div className="col-md-5 m-1">
          <Card>
            <CardImg top src={campsite.image} alt={campsite.name} />
            <CardBody>
              <CardText>{campsite.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    }

     function RenderComments({ comments }) {
       if (comments)
         return (
           <div className="col-md-5 m-1">
             <h4>Comments</h4>
             {comments.map((comment) => {
               return (
                 <div key={comment.id}>
                   <p>{comment.text}</p>
                   <p>
                     {" "}
                     {new Intl.DateTimeFormat("en-US", {
                       year: "numeric",
                       month: "short",
                       day: "2-digit",
                     }).format(new Date(Date.parse(comment.date)))}{" "}
                   </p>
                 </div>
               );
             })}
             <CommentForm />
           </div>
         );
       return <div />;
     }

    function CampsiteInfo(props) {
      console.log(props.campsite);
      if (props.campsite) { 
          return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
      }
      return <div />;
    }


export default CampsiteInfo;

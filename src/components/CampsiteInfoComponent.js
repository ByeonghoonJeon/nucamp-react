import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Col,
  Collapse,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  FormText,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { CAMPSITES } from "../shared/campsites";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

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
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <strong>{comment.text}</strong>
              <br />
              --{comment.author},{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comment.date)))}
              <br />
              <br />
            </div>
          );
        })}
        <CommentForm />
      </div>
    );
  }

  return <div></div>;
}

function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
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
  } else {
    return <div />;
  }
}

const pencilIcon = <FontAwesomeIcon icon={faPencilAlt} />;
class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  validate(author) {
    const errors = {
      author: "",
    };

    if (this.state.touched.author) {
      if (author.length < 2) {
        errors.author = "First name must be at least 2 characters.";
      } else if (author.length > 15) {
        errors.author = "First name must be 15 or less characters.";
      }
    }
    return errors;
  }
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleInputChange(event) {
    this.setState(event);
    // console.log("ok", event);
    // const target = event.target;
    // const name = target.name;
    // const value = target.type === "checkbox" ? target.checked : target.value;

    // this.setState({
    //   [name]: value,
    // });
  }

  submitComment(event) {
    const { rating, author, text } = this.state;
    const formState = {
      rating,
      author,
      text,
    };
    alert(`Current State is: ${JSON.stringify(formState)}`);
    this.toggleModal();
  }

  render() {
    return (
      <React.Fragment>
        <Button outline fg-lg onClick={this.toggleModal}>
          {pencilIcon} Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
          <ModalBody>
            <LocalForm
              onSubmit={this.submitComment}
              onChange={this.handleInputChange}
            >
              <div className="form-group">
                <Label for="rating">Rating</Label>
                <Control.select
                  model=".rating"
                  name="rating"
                  id="rating"
                  className="form-control"
                >
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </Control.select>
              </div>
              <div className="form-group">
                <Label htmlFor="author">Your Name</Label>
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  className="form-control"
                  placeholder="Your name"
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
              </div>
              <FormGroup>
                <Label htmlFor="text">Comment</Label>
                <Control.textarea
                  model=".text"
                  name="text"
                  id="text"
                  className="form-control"
                  rows={6}
                  placeholder="Comment here"
                />
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CampsiteInfo;

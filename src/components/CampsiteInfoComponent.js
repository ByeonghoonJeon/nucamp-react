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

  submitComment(event) {
    alert(
      `Rating: ${this.rating.value} Your Name: ${this.yourname.value} Comment: ${this.comment.value}`
    );
    this.toggleModal();
    event.preventDefault();
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
            <LocalForm onSubmit={this.submitComment}>
              <FormGroup>
                <Label for="rating">Rating</Label>
                <Col sm={10}>
                  <Control.select model=".rating" id="rating">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="yourname">Your Name</Label>
                <Input
                  type="yourname"
                  id="yourname"
                  name="yourname"
                  innerRef={(input) => (this.yourname = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="comment">Comment</Label>
                <Input type="textarea" name="comment" id="comment" />
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

import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";

class CampsiteInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  renderCampsite(campsite) {
    return (
      <div className="col-md-5 m-1">
        <Card>
          <CardImg top src={campsite.image} alt={campsite.name} />
          <CardBody>
            <CardTitle>{campsite.name}</CardTitle>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
  renderComments(comments) {
    if (this.props.comments) {
      return (
        <div className="col-md-5 m-1">
          <h4>Comments</h4>
          {comments.map()}
        </div>
      );
    }
  }

  render() {
    if (this.props.campsite) {
      return <div className="row">{this.renderCampsite}</div>;
    } else {
      return <div></div>;
    }
  }
}

export default CampsiteInfo;

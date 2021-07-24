import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import { CAMPSITES } from "../shared/campsites";

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
          {comments.map(comment =>{
            return(
              this.props.comments.text,
              this.props.comments.date
              )
            })}
        </div>
      );
    }

    return(
      <div></div>
    )

  }

  // Inside the body of the callback function for the map method, return the comment in two lines 
  // - the first line should show the comment text, and the second line should show the comment author and date. 
  // Use this code to format the date correctly:
  // {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
  
  // Inside the CampsiteInfo component's render() function, under where you called the renderCampsite method, 
  // add the renderComments method, passing in the campsite object's comments array. 
  


  render() {
    if (this.props.campsite) {
      return <div className="row">{this.renderCampsite(this.props.campsite)}, {this.renderComments(this.props.comment)}</div>;
      
    } else {
      return <div></div>;
    }
  }
}

export default CampsiteInfo;

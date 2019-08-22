import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import avatarPlaceholder from "./avatar-placeholder.jpg";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ImageIcon from "@material-ui/icons/Image";
import firebase from "firebase";
import Auth from "./Auth";

class ProfilePage extends Component {
  state = {
    avatarUrl: "",
    user: null,
    file: null
  };

  handleOnInputFileChange = event => {
    this.setState({
      file: event.target.files[0]
    });
  };

  handleRemove = () => {
    firebase
      .storage()
      .ref("avatars/" + this.state.user.uid)
      .delete()
      .then(() => this.getAvatarUrl());
  };

  handleAdd = () => {
    if (this.state.file && this.state.user) {
      firebase
        .storage()
        .ref("avatars/" + this.state.user.uid)
        .put(this.state.file)
        .then(() => {
          alert("Dodano pomyślnie");
          this.getAvatarUrl();
        });
    }
  };

  getAvatarUrl = () => {
    if (this.state.user) {
      firebase
        .storage()
        .ref("avatars/" + this.state.user.uid)
        .getDownloadURL()
        .then(url => this.setState({ avatarUrl: url }))
        .catch(() => this.setState({ avatarUrl: null }));
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState(
        {
          user
        },
        () => this.getAvatarUrl()
      );
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Auth>
          <Typography component="h1" variant="h4">
            Profile
          </Typography>
          <div style={{ margin: "20px" }}>
            <Avatar
              src={
                this.state.avatarUrl ? this.state.avatarUrl : avatarPlaceholder
              }
              style={{
                bigAvatar: {
                  width: 60,
                  height: 60,
                  margin: "0 auto"
                }
              }}
            />
            <div style={{ margin: "20px" }}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={this.handleOnInputFileChange}
              />
              <label htmlFor="raised-button-file">
                <Fab size="small" color="default" component="span">
                  <ImageIcon />
                </Fab>
              </label>
              {this.state.file && `${this.state.file.name}`}
              <Fab
                size="small"
                color="primary"
                component="span"
                onClick={this.handleAdd}
              >
                <AddIcon />
              </Fab>
              <Fab
                size="small"
                color="secondary"
                component="span"
                onClick={this.handleRemove}
              >
                <RemoveIcon />
              </Fab>
            </div>
          </div>
          <Typography component="h3" variant="h6">
            Email: {this.state.user && this.state.user.email}
          </Typography>
          <Typography component="h3" variant="h6">
            User Id: {this.state.user && this.state.user.uid}
          </Typography>
          <div style={{ margin: "20px" }}>
            <Fab size="small" color="primary" aria-label="Edit">
              <EditIcon />
            </Fab>
          </div>
        </Auth>
      </div>
    );
  }
}

export default withRouter(ProfilePage);

import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { PageWrapper } from "../../components";
import avatarPlaceholder from "./avatar-placeholder.jpg";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ImageIcon from "@material-ui/icons/Image";
import firebase from "firebase";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userEmailValue: "",
        isLoggedIn: false,
        userFirstName: "",
        userId: "",
        userPicture: "",
        userAvatarUrl: ""
      }
    };
  }
  changeState() {
    this.props.changeIsLoggedInState(this.state);
  }

  logOut() {
    this.props.logOutChangeState(this.state);
  }

  handleDeleteAccount() {
    if (window.confirm("Jesteś pewny, że chcesz usunąć konto?")) {
      var user = firebase.auth().currentUser;
      var credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        window.prompt("Podaj hasło", "hasło")
      );
      user
        .reauthenticateWithCredential(credential)
        .then(function() {
          user.delete();
        })
        .catch(error => alert(error.message));
      this.logOut();
      this.changeState();
    }
  }

  handleOnInputFileChange2 = event => {
    console.log(event);
    this.setState({
      user: {
        ...this.state.user,
        userPicture: event.target.files[0]
      }
    });
  };

  handleRemove = () => {
    this.props.onAvatarRemove(this.state);
  };

  handleRemove2 = () => {
    firebase
      .storage()
      .ref("avatars/" + this.state.user.uid)
      .delete()
      .then(() => {
        this.getAvatarUrl();
        this.props.onAvatarChange(this.state);
        alert("Usunięto pomyślnie");
      });
  };

  handleAdd() {
    this.props.onAvatarChange(this.state);
  }
  handleAdd2 = () => {
    if (this.state.user.userPicture && this.state.user) {
      firebase
        .storage()
        .ref("avatars/" + this.state.user.uid)
        .put(this.state.user.userPicture)
        .then(() => {
          alert("Dodano pomyślnie");
          this.getAvatarUrl();
          this.props.onAvatarChange(this.state);
        });
    }
  };

  getAvatarUrl = () => {
    if (this.state.user) {
      firebase
        .storage()
        .ref("avatars/" + this.state.user.uid)
        .getDownloadURL()
        .then(url =>
          this.setState({
            user: {
              ...this.state.user,
              userAvatarUrl: url
            }
          })
        )
        .catch(() =>
          this.setState({
            user: {
              ...this.state.user,
              userAvatarUrl: null
            }
          })
        );
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
    return (
      <PageWrapper>
        <Typography component="h1" variant="h4">
          Profile
        </Typography>
        <div style={{ margin: "20px" }}>
          <Avatar
            src={
              this.state.user.userAvatarUrl
                ? this.state.user.userAvatarUrl
                : avatarPlaceholder
            }
            style={{
              width: 60,
              height: 60,
              margin: "0 auto"
            }}
          />
          {console.log(this.state.user.userAvatarUrl)}
          <Typography component="h3">Dodaj lub asuń avatar</Typography>
          <div style={{ margin: "20px" }}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={this.handleOnInputFileChange2}
            />
            <label htmlFor="raised-button-file">
              <Fab size="default" color="default" component="span">
                <ImageIcon />
              </Fab>
            </label>
            {this.state.user.userPicture &&
              `${this.state.user.userPicture.name}`}
            <Fab
              size="default"
              color="primary"
              component="span"
              onClick={this.handleAdd2.bind(this)}
            >
              <AddIcon />
            </Fab>
            <Fab
              size="default"
              color="secondary"
              component="span"
              onClick={this.handleRemove2.bind(this)}
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
        <Typography component="h3" variant="h6">
          Usuń konto
        </Typography>
        <div style={{ margin: "20px" }}>
          <Fab
            size="default"
            color="default"
            component="span"
            onClick={this.handleDeleteAccount.bind(this)}
          >
            USUŃ
          </Fab>
        </div>
      </PageWrapper>
    );
  }
}

export default withRouter(ProfilePage);

import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as styles from "./SignUp.module.css";
import * as firebase from "firebase";
let { navLink } = styles;

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const classes = useStyles();
  let [emailValue, changeEmailValue] = useState();
  let [passwordValue, changePasswordValue] = useState();
  let [nameValue, changeNameValue] = useState();
  const auth = firebase.auth();
  const signUpFunction = (emailValue, passwordValue, nameValue) => {
    auth.createUserWithEmailAndPassword(emailValue, passwordValue).catch(e => {
      alert(e.message);
      console.log(typeof emailValue, typeof passwordValue);
      console.log(e);
    });
  };
  //   const signInFunction = (emailValue, passwordValue) => {
  //     auth.signInWithEmailAndPassword(emailValue, passwordValue).catch(e => {
  //       alert(e.message);
  //       console.log(e);
  //     });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Zarejestruj się
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Imię"
                autoFocus
                onChange={e => changeNameValue(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Adres email"
                name="email"
                autoComplete="email"
                onChange={e => changeEmailValue(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Hasło"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => changePasswordValue(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={event => {
              event.preventDefault();
              console.log(emailValue, passwordValue, nameValue);
              signUpFunction(emailValue, passwordValue);
            }}
          >
            Zarejestruj się
          </Button>
          <Grid container>
            <Grid item>
              <Link>
                <NavLink className={navLink} exact to="/login">
                  Masz już konto? Zaloguj się! :)
                </NavLink>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

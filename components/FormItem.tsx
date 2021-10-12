import { Mode } from "@mui/icons-material";
import { Grid, Box, TextField, Button, Typography, Link } from "@mui/material";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import style from "./Form.module.scss";
import { useAppSelector, useAppDispatch } from "../store/hooks";

export default function FormItem(): JSX.Element {
  const [mode, setMode] = useState<Mode>("LOGIN");

  const tabsEl = useRef<HTMLDivElement>(null);
  const selectMode = (e: React.MouseEvent): void => {
    const selectedEle = e.target as HTMLElement;
    const eleCollection = tabsEl.current!.children;
    const selectedVal = selectedEle.innerHTML.toUpperCase() as Mode;
    for (let i = 0; i < eleCollection.length; i++) {
      eleCollection[i].classList.remove(style.selected);
    }
    selectedEle.classList.add(style.selected);
    setMode(selectedVal);
  };

  const onSignup = (e: React.MouseEvent) => {
    const eleCollection = tabsEl.current!.children;
    for (let i = 0; i < eleCollection.length; i++) {
      eleCollection[i].classList.remove(style.selected);
      if (eleCollection[i].innerHTML.toUpperCase() === "SIGNUP") {
        eleCollection[i].classList.add(style.selected);
      }
    }
    setMode("SIGNUP");
  };
  return (
    <Grid
      style={{ height: "100%" }}
      container
      flexDirection="column"
      alignItems="center"
    >
      <Grid
        item
        container
        flex={2}
        xs={9}
        alignItems="center"
        justifyContent="center"
      >
        <div className={style.tabs} ref={tabsEl} onClick={selectMode}>
          <span className={style.selected}>Login</span>
          <span>Signup</span>
        </div>
      </Grid>
      <Grid
        item
        container
        flex={8}
        xs={9}
        justifyContent="center"
        alignItems="center"
      >
        <FormGroup mode={mode} onSignup={onSignup} />
      </Grid>
    </Grid>
  );
}
enum Action {
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
}

type Mode = keyof typeof Action;

interface FormGroupProps {
  mode: Mode;
  onSignup: React.MouseEventHandler;
}

function FormGroup(props: FormGroupProps) {
  const { mode, onSignup } = props;
  // const [formInputs, setFormInputs] = useState<Inputs<string>>(
  //   mode === "LOGIN"
  //     ? { email: "", password: "" }
  //     : { email: "", password: "", repassword: "" }
  // );

  // const changeInput = (e: ChangeEvent, type: string) => {
  //   setFormInputs((prev) => ({
  //     ...prev,
  //     [type]: e.target.value,
  //   }));
  //   console.log(formInputs);
  // };

  // useEffect(() => {}, [mode]);
  const formInputs = useAppSelector((state) => state.formInputs);
  const dispatch = useAppDispatch();
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "80%",
        justifyContent: "space-evenly",
      }}
      component="form"
      sx={{
        "& .MuiTextField-root": {
          m: "1rem auto",
          width: "100%",
        },
        "& .MuiButton-root": {
          m: "1rem auto",
          width: "100%",
          background: "linear-gradient(90deg, #b993d6, #8ca6db)",
          height: "3.2rem",
        },
        "& .MuiTypography-root": {
          m: ".5rem auto",
          "& .MuiLink-root": {
            color: "#8ca6db",
            opacity: "0.8",
          },
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-email-input"
        label="Email"
        type="text"
        autoComplete="off"
        value={formInputs.email}
        onChange={(e) => changeInput(e, "email")}
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="off"
        value={formInputs.password}
        onChange={(e) => changeInput(e, "password")}
      />
      {mode === "SIGNUP" && (
        <TextField
          id="outlined-password-input"
          label="Re-password"
          type="password"
          autoComplete="off"
          value={formInputs.repassword}
          onChange={(e) => changeInput(e, "repassword")}
        />
      )}
      <Button variant="contained" size="large">
        {mode}
      </Button>
      {mode === "LOGIN" && (
        <Typography>
          Not a member?{" "}
          <Link underline="hover" onClick={onSignup}>
            Signup now
          </Link>
        </Typography>
      )}
    </Box>
  );
}

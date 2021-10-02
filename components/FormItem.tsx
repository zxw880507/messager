import { Grid, Box, TextField, Button } from "@mui/material";
import style from "./Form.module.scss";
export default function FormItem(): JSX.Element {
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
        <div className={style.tabs}>
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
        <LoginForm />
      </Grid>
    </Grid>
  );
}

function LoginForm() {
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
          "& .MuiButton-iconSizeLarge": {
            height: 56,
          },
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-email-input" label="Email" type="text" />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
      />
      <TextField
        id="outlined-password-input"
        label="Re-password"
        type="password"
      />
      <Button variant="contained" size="large">
        Contained
      </Button>
    </Box>
  );
}

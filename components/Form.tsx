import { Paper, Grid } from "@mui/material";
import { ReactChild } from "react";
import style from "./Form.module.scss";

interface Props {
  children: ReactChild;
}

export default function Form(props: Props) {
  return (
    <Paper elevation={3} className={style.root}>
      <Grid container flexDirection="column">
        <Grid item>
          <h2 className={style.title}>Welcome to Messager</h2>
        </Grid>
        <Grid item>{props.children}</Grid>
      </Grid>
    </Paper>
  );
}

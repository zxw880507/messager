import { Paper, Grid } from "@mui/material";
// import { ReactChild } from "react";
import FormItem from "./FormItem";
import style from "./Form.module.scss";

export default function Form() {
  return (
    <Paper elevation={3} className={style.root}>
      <Grid
        style={{ height: "100%" }}
        container
        flexDirection="column"
        justifyContent="space-evenly"
      >
        <Grid
          item
          container
          flex={2}
          justifyContent="center"
          alignItems="center"
        >
          <h1 className={style.title}>Welcome to Messager</h1>
        </Grid>
        <Grid
          item
          container
          flex={8}
          justifyContent="center"
          alignItems="center"
        >
          <FormItem />
        </Grid>
      </Grid>
    </Paper>
  );
}

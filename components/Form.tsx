import { Paper, Grid } from "@mui/material";
import FormItem from "./FormItem";
import style from "./Form.module.scss";

export default function Form(): JSX.Element {
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

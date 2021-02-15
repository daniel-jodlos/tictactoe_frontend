import { AppBar, Button, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home'
import { useHistory } from "react-router-dom";

const stylesHook = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    nav_button: {
      '&:hover': {
        background: '#ffffff22'
      }
    }
  })
)

export const Nav = () => {
  const classes = stylesHook()
  const history = useHistory()
  return (
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TicTacToe
          </Typography>
          <IconButton onClick={() => history.push('/')} className={classes.nav_button} color='inherit'><HomeIcon /></IconButton>
          <Button onClick={() => history.push('/create')} className={classes.nav_button} color="inherit">Create</Button>
        </Toolbar>
      </AppBar>
    </div>
     );
}
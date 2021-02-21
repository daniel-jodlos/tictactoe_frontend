import { Button, createStyles, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => createStyles({
    btn: {
        color: 'white',
        backgroundColor: 'green',
        width: '100%',
        marginTop: '10px'
    }
}))

const Home = () => {
    const styles = useStyles()
    const history = useHistory()
    return (
        <>
            <h1>How it works</h1>
            <p>That's super simple really. You go to the CREATE page:</p>
            <ol>
                <li>Select your username</li>
                <li>Send a provided link to your friend</li>
                <li>And here you go playing TicTacToe, the greatest game of all time</li>
            </ol>
            <Button onClick={() => history.push('/create')} className={styles.btn}>Get started</Button>
        </>
    );
}
         
export default Home;
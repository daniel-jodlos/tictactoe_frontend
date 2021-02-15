import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const ServerDown = () => {
    return ( 
        <div style={{ textAlign: 'center', color: 'red', marginTop: '50px' }}>
            <ErrorOutlineIcon style={{fontSize: '10rem'}}/>
            <p style={{ fontSize: '1.5rem' }}>Whoops! Looks like the server's dead</p>
        </div>
     );
}
 
export default ServerDown;
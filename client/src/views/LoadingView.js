import {React, Fragment} from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
const LoadingView = () => {
    const styles = {
        flex: {
            "width": "100%",
            "height": "100vh",
            "display": "flex",
            "justify-content": "center",
            "align-items": "center"
        },
        child: {
            
        }
    }
    return (
        <Fragment>
        <div style={styles.flex}>
            <div style={styles.child}>
                
                <ClimbingBoxLoader color={'#5383ff'} loading={true} />
            </div>
        </div>
        </Fragment>
    );
   
};


export default LoadingView;
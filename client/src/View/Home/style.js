import Theme from '../../Theme/theme';

const style = {
    container: {
        width: '80%',
        margin: '150px auto'
    },
    header: {
        marginTop: '50px',
        margin: 'auto',
        textAlign: 'center'
    },
    categories: {
        height: '100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    category: {
        marginRight: '20px',
        height: '40px',
        backgroundColor: Theme.colors.pinky
    },
    circle: {
        position: 'fixed',
        bottom: 50,
        right: 50,
        width: 60,
        height: 60,
        borderRadius: '50%',
        backgroundColor: Theme.colors.blue,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addicon: {
        color: 'white'
    }
}

export default style;
import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../images/close.svg';

const styles = {
        notification: {
            position: 'fixed',
            top: 0,
            left: 0,
            'z-index': 1100,
            display: 'flex',
            width: '100%',
            padding: '.625rem 1rem',
            background: 'rgba(34,34,34,.9)',
            color: '#fff'
        },
        notification_content: {
            flex: 1,
            'align-self': 'stretch',
            display: 'flex',
            'flex-direction': 'column',
            'justify-content': 'center'
        }
    }
;

class Toast extends React.Component {
    render() {
        return <div style={styles.notification}>
            <div style={styles.notification_content}></div>
            <img src={closeIcon} alt=""/>
        </div>;
    }
}

Toast.propTypes = {
    dots: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    onChangeIndex: PropTypes.func.isRequired
};

export default Toast;

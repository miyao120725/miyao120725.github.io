import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../images/close.svg';

const styles = {
    notification: {
        position: 'fixed',
        top: 0,
        left: 0,
        'zIndex': 1100,
        display: 'flex',
        width: '100%',
        padding: '.2rem .3rem',
        color: '#fff'
    },
    notification_content: {
        flex: 1,
        'alignSelf': 'stretch',
        display: 'flex',
        'flexDirection': 'column',
        'justifyContent': 'center',
        'fontSize': '14px',
        'textAlign': 'center'
    },
    img: {
        width: '24px',
        height: '24px'
    }
};

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            check: true,
            text: this.props.texts
        };
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                check: false
            });
            this.props.callBack();
        }, 2000);
    }

    tipBack() {
        const type = this.props.types;
        if (type === 'primary') {
            return {
                background: 'rgba(14,144,210,.9)'
            };
        } else if (type === 'success') {
            return {
                background: 'rgba(94,185,94,.9)'
            };
        } else if (type === 'warning') {
            return {
                background: 'rgba(243,123,29,.9)'
            };
        } else if (type === 'error') {
            return {
                background: 'rgba(221,81,76,.9)'
            };
        } else {
            return {
                background: 'rgba(34,34,34,.9)'
            };
        }
    }

    closeClick(e) {
        this.setState({
            check: false
        });
    }

    render() {
        const types = this.tipBack();
        return <div style={{
            ...styles.notification, ...types,
            ...this.state.check ? {} : {display: 'none'}
        }}>
            <div style={styles.notification_content}>{this.state.text}</div>
            <img src={closeIcon} style={styles.img} onClick={this.closeClick.bind(this)} alt=""/>
        </div>;
    }
}

Notification.propTypes = {
    dots: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    onChangeIndex: PropTypes.func.isRequired
};

export default Notification;

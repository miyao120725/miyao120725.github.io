import React, {Component} from 'react';
import './Personal.css';
import Global from '../../api/global';

const ListItem = (props) => {
    return (
        <div className="version-tab flex-between">
            <span className="left">{props.title}</span>
            <span className="right">{props.itemRight}</span>
        </div>
    );
};

class Personal extends Component {

    componentWillMount() {
        // if (!Global.getCookie('APIToken')) {
        //     this.props.history.push('/login');
        // }
    }

    loginOut(e) {
        Global.delCookie('APIToken', window.location.hostname);
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="App">
                <div className="item-list-personal">
                    <ListItem title="当前版本" itemRight="v 1.2.0"/>
                    <div className="version-btn">
                        <button onClick={this.loginOut.bind(this)}>退出</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Personal;

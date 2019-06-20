import React, {Component} from 'react';
import logo from '../../images/icon-02.png';
import path from '../../images/path.png';
import icon_info from '../../images/icon_info.png';
import icon_hezuo from '../../images/icon_hezuo.png';
import Icon01 from '../../images/icon-01.png';
import './Personal.css';
import axiosHttp from '../../axios-https';
import Global from '../../api/global';
import {
    Link
} from 'react-router-dom';

const PersonalHeader = (props) => {
    return (
        <div className="personal-header flex-start">
            <img src={logo} alt=""/>
            <span>{props.name}</span>
        </div>
    );
};

const ListItem = (props) => {
    return (
        <div className="item-list-tab">
            <img className="left" src={props.srcUrl} alt=""/>
            <span className="center">{props.title}</span>
            <span className="right">{props.itemRight}</span>
        </div>
    );
};

const ListItemTab = (props) => {
    return (
        <Link className="item-list-tab" to="/version">
            <img className="left" src={props.srcUrl} alt=""/>
            <span className="center">{props.title}</span>
            <img className="right-img" src={path} alt=""/>
        </Link>
    );
};

class Personal extends Component {

    constructor() {
        super();
        this.state = {
            phoneName: ''
        };
    }

    componentWillMount() {
        // if (!Global.getCookie('APIToken')) {
        //     this.props.history.push('/login');
        // } else {
        this.MyselfFun();
        // }
    }

    MyselfFun() {
        const option = {
            token: Global.getCookie('APIToken')
        };
        axiosHttp.Myself(option).then(res => {
            const data = res.data.data;
            if (res.data.code === 0) {
                this.setState({
                    phoneName: data.phone
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="App">
                <PersonalHeader name={this.state.phoneName}/>
                <div className="item-list-personal">
                    <ListItem title="问题反馈" srcUrl={icon_info} itemRight="QQ:1049906037"/>
                    <ListItem title="商务合作" srcUrl={icon_hezuo} itemRight="微信:heyfibad"/>
                    <ListItemTab title="设置" srcUrl={Icon01}/>
                </div>
            </div>
        );
    }
}

export default Personal;

import React, {Component} from 'react';
import iconDefoult from '../../images/icon-04.png';
import iconActive from '../../images/icon-05.png';
import './Login.css';
import axiosHttp from '../../axios-https';
import Global from '../../api/global';
// import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Notification from '../../components/Notification';

let time;

const LoginHeader = () => {
    return (
        <div className="login-header">
            <div className="center">
                <div className="header">
                    <p className="top">最高额度</p>
                    <p className="bottom">80000</p>
                    <div className='rotate-img'>
                        <div>
                            <img src={iconDefoult} alt=""/>
                            <img className="last-img" src={iconActive} alt=""/>
                        </div>
                    </div>
                </div>
                <p className="footer">3分钟极速到账</p>
            </div>
        </div>
    );
};

class TLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            codeNumber: '',
            codeText: '获取验证码',
            codeCheck: true,
            message: {
                type: '',
                text: '',
                check: false
            },
            err: ''
        };
    }

    handleChange(event) {
        this.setState({phoneNumber: event.target.value});
        this.setState({
            err: ''
        });
    }

    handleChangeOne(event) {
        this.setState({codeNumber: event.target.value});
        this.setState({
            err: ''
        });
    }

    setTime() {
        const phone_reg = /^1[3|4|5|7|8]\d{9}$/;
        const phoneCheck = phone_reg.test(this.state.phoneNumber);
        if (!this.state.phoneNumber || !phoneCheck) {
            this.setState({
                err: '手机号不能为空或输入错误'
            });
            return;
        }
        if (this.state.codeCheck) {
            let num = 60;
            time = setInterval(() => {
                num--;
                if (num < 0) {
                    this.setState({
                        codeText: '获取验证码',
                        codeCheck: true
                    });
                    clearInterval(time);
                } else {
                    this.setState({
                        codeText: num + 's 后获取',
                        codeCheck: false
                    });
                }
            }, 1000);
            this.requestCode();
        } else {
            this.setState({
                codeText: '获取验证码',
                codeCheck: true
            });
        }
    }

    requestCode() {
        const option = {
            phone: this.state.phoneNumber
        };
        axiosHttp.requestCode(option).then(res => {
            if (res.data.code === 0) {
                this.setState({
                    message: {
                        type: 'success',
                        text: '验证码发送成功',
                        check: true
                    }
                });
            } else {
                clearInterval(time);
                this.setState({
                    codeText: '获取验证码',
                    codeCheck: true
                });
                this.setState({
                    message: {
                        type: 'error',
                        text: res.data.msg,
                        check: true
                    }
                });
            }
        }).catch((err) => {
            console.log(err);
            this.setState({
                message: {
                    type: 'error',
                    text: err,
                    check: true
                }
            });
        });
    }

    btnLoin() {
        if (!this.state.codeNumber) {
            this.setState({
                err: '验证码不能为空'
            });
            return;
        }
        const option = {
            phone: this.state.phoneNumber,
            code: this.state.codeNumber,
            mobile_info: ''
        };
        axiosHttp.Login(option).then(res => {
            const date = res.data.data;
            if (res.data.code === 0) {
                Global.setCookie('APIToken', date.token, 24, window.location.hostname);
                this.props.history.push('/');
            } else {
                this.setState({
                    message: {
                        type: 'error',
                        text: res.data.msg,
                        check: true
                    }
                });
            }
        }).catch((err) => {
            console.log(err);
            this.setState({
                message: {
                    type: 'error',
                    text: err,
                    check: true
                }
            });
        });
    }

    checkMessage(e) {
        this.setState({
            message: {
                check: false
            }
        });
    }

    render() {
        return (
            <div className="login">
                <LoginHeader/>
                <div className="login-form">
                    <form action="javascript:;">
                        <div className="form-item">
                            <input type="number" value={this.state.phoneNumber} onChange={this.handleChange.bind(this)}
                                   placeholder="请输入手机号"/>
                        </div>
                        <div className="form-item flex-login">
                            <input type="number" value={this.state.codeNumber}
                                   onChange={this.handleChangeOne.bind(this)}
                                   placeholder="请输入验证码"/>
                            <a href="javascript:;" onChange={this.handleChange.bind(this)}
                               onClick={this.setTime.bind(this)}>{this.state.codeText}</a>
                        </div>
                        <p className="errVaule">{this.state.err}</p>
                        <button className="btn-login" onClick={this.btnLoin.bind(this)}>登录</button>
                    </form>
                </div>
                {
                    this.state.message.check ? <Notification types={this.state.message.type}
                                                             texts={this.state.message.text}
                                                             callBack={this.checkMessage.bind(this)}/> : ''

                }

            </div>
        );
    }

};
const Login = withRouter(TLogin);
export default Login;

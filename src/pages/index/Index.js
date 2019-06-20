import React, {Component} from 'react';
import './Index.css';
import Swipeable from '../../components/Swipeable';
import img from '../../images/icon-close.png';
import axiosHttp from '../../axios-https';
import Global from '../../api/global';
import {Goods_Active} from '../../api/Log';

const Tip = (props) => {
    const status = props.status;
    return (
        <div className="tip-infor" style={{display: status ? 'block' : 'none'}}>
            同时申请3家以上，官方提高90%通过率
            <img src={img} alt="" onClick={props.TipCheck.bind(this, false)}/>
        </div>
    );
};

const Htitle = (props) => {
    return (<h3 className="title-H"><span></span>{props.text}</h3>);
};

const Recommendation = (props) => {
    const data = props.dataArr;
    return (
        data.map((item) => {
            return <a key={item.id.toString()} href={item.url}
                      className={'common-item flex-between' + ' ' + props.class}
                      onClick={props.callBack.bind(this, item.id)}>
                <img src={item.picture} alt=""/>
                <div className="text-infor">
                    <h4>{item.title || 'jfkajsdkfk'}</h4>
                    <p>{item.description}</p>
                    <div className="price flex-start">
                        额度
                        <span>{item.amount} 元</span>
                    </div>
                </div>
                <a className="item-btn" href="javascript:;">立即申请</a>
            </a>;
        })
    )
        ;
};

const HighText = (props) => {
    const item = props.data;
    return (
        <a key={item.id.toString()} href={item.url} className="high-text"
           onClick={props.callBack.bind(this, item.id)}>
            <div>
                <div className="header flex-start">
                    <img src={item.picture} alt=""/>
                    <div className="high-right">
                        <p>{item.title}</p>
                        <span>{item.description}</span>
                    </div>
                </div>
                <div className="footer flex-start">
                    <span className="left">额度</span>
                    <span className="right">{item.amount} 元</span>
                </div>
            </div>
        </a>

    );
};


class Index extends Component {

    constructor() {
        super();
        this.state = {
            selected: 'home',
            banners: [],
            high_pass_goods: [],
            hot_goods: [],
            recommend_goods: [],
            hints: [],
            tipCheck: true
        };
    }

    componentWillMount() {
        // if (!Global.getCookie('APIToken')) {
        //     this.props.history.push('/login');
        // } else {
        this.goodsInfoFun();
        // }

        if (Global.getCookie('TIPCHECK')) {
            this.setState({
                tipCheck: false
            });
        }
    }

    goodsInfoFun() {
        const option = {
            token: Global.getCookie('APIToken')
        };
        axiosHttp.goodsInfo(option).then(res => {
            const data = res.data.data;
            if (res.data.code === 0) {
                this.setState({
                    banners: data.banners,
                    high_pass_goods: data.high_pass_goods,
                    recommend_goods: data.recommend_goods,
                    hints: data.hints,
                    hot_goods: data.hot_goods
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    tipCheckFun(bu, e) {
        e.preventDefault();
        Global.setCookie('TIPCHECK', bu.toString(), 24, window.location.hostname);
        this.setState({
            tipCheck: false
        });
    }

    activeGoods(id, e) {
        Goods_Active(Global.getCookie('APIToken'), id);
    }

    render() {
        return (
            <div className="App">

                <Tip TipCheck={this.tipCheckFun.bind(this)} status={this.state.tipCheck}/>
                <Swipeable banner={this.state.banners}/>
                <Htitle text="官方推荐"/>
                <div className="recommend">
                    <Recommendation dataArr={this.state.recommend_goods} callBack={this.activeGoods.bind(this)}/>
                </div>
                <Htitle text="高通过"/>
                <div className="flex-high mbb-1">
                    {
                        this.state.high_pass_goods.map((item, index) => {
                            if (index <= 1) {
                                return <HighText data={item} callBack={this.activeGoods.bind(this)}/>;
                            }
                        })
                    }
                    {/*{*/}
                    {/*this.state.high_pass_goods.map((item, index) => {*/}
                    {/*if (index <= 1) {*/}
                    {/*return <HighText data={item}/>;*/}
                    {/*}*/}
                    {/*})*/}
                    {/*}*/}
                </div>
                <div className="flex-high mrb-20">
                    {
                        this.state.high_pass_goods.map((item, index) => {
                            if (index > 1 && index <= 3) {
                                return <HighText key={item.id.toString()} data={item}
                                                 callBack={this.activeGoods.bind(this)}/>;
                            }
                        })
                    }
                </div>
                <Htitle text="热门"/>
                <div className="hot">
                    <Recommendation dataArr={this.state.hot_goods} callBack={this.activeGoods.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default Index;

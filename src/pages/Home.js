import React, {Component} from 'react';
import Index from './index/Index';
import Personal from './personal/Personal';
// import Index from './index/Index';
import tab_tuijian from '../images/tab_tuijian.png';
import tab_tuijian_active from '../images/tab_tuijian_active.png';
import tab_me from '../images/tab_me.png';
import tab_me_active from '../images/tab_me_active.png';
import {
    Route,
    Link,
    Switch
} from 'react-router-dom';

// import RouteMap from '../router/Router';

const TabBar = (props) => {
    const activeCheck = props.status;
    return (
        <nav className="tabbar tabbar-primary">
            <Link className="tabbar-item" to="/" onClick={props.tabClick.bind(this, 0)}>
                <img src={activeCheck === 0 ? tab_tuijian_active : tab_tuijian}
                     alt=""/>
                <span className={activeCheck === 0 ? 'active' : ''}>推荐</span>
            </Link>
            <Link className="tabbar-item" to="/personal" onClick={props.tabClick.bind(this, 1)}>
                <img src={activeCheck === 1 ? tab_me_active : tab_me} alt=""/>
                <span className={activeCheck === 1 ? 'active' : ''}> 我的</span>
            </Link>
        </nav>
    );
};

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: 'home',
            tabCheck: 0
        };
        // this.tabCheckFun = this.tabCheckFun.bind(this);
    }

    componentWillMount() {
        const pathName = this.props.location.pathname;
        if (pathName === '/') {
            this.setState({
                tabCheck: 0
            });
        } else {
            this.setState({
                tabCheck: 1
            });
        }
    }

    tabCheckFun(num, e) {
        this.setState({
            tabCheck: num
        });
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path='/' exact component={Index}/>
                    <Route path='/personal' component={Personal}/>
                </Switch>
                {/*<Route path='/' exact componenzt={Index}/>*/}
                <TabBar status={this.state.tabCheck} tabClick={this.tabCheckFun.bind(this)}/>
            </div>
        );
    }
}

export default Home;

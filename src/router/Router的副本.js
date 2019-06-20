import * as React from 'react';
import {
    // BrowserRouter as Router,
    HashRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import CurrentVersion from '../pages/personal/ CurrentVersion';
import Home from '../pages/Home';
import Login from '../pages/login/Login';
import Personal from '../pages/personal/Personal';

class RouteMap extends React.Component {

    updateHandle() {
        console.log(1111, '每次router变化之后都会触发');
    }

    // componentWillMount() {
    //     console.log(1111, '组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state');
    // }

    render() {
        return (
            <HashRouter>
                <Switch>
                    {/*<Redirect exact from="/" to="/home"></Redirect>*/}
                    <Route path='/' exact component={Home}/>
                    <Route path='/personal' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/version' component={CurrentVersion}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default RouteMap;
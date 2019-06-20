import * as React from 'react';
import {
    // BrowserRouter as Router,
    HashRouter,
    Switch
} from 'react-router-dom';
import {RouteMapConfig} from './RouterConfig';
import {RouterLogic} from './RouterLogic';

class RouteMap extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <RouterLogic config={RouteMapConfig}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default RouteMap;
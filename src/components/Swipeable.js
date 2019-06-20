import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import Pagination from './Pagination';
import '../style/swipe.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
    root: {
        position: 'relative'
    },
    slide: {
        padding: 15,
        minHeight: 100,
        color: '#fff'
    },
    slide1: {
        backgroundColor: '#FEA900'
    },
    slide2: {
        backgroundColor: '#B3DC4A'
    },
    slide3: {
        backgroundColor: '#6AC0FF'
    }
};

class DemoAutoPlay extends React.Component {
    state = {
        index: 0
    };

    handleChangeIndex = index => {
        this.setState({
            index
        });
    };

    render() {
        const {index} = this.state;

        return (
            <div style={styles.root} className="swipe-h5">
                <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
                    {
                        this.props.banner.map((item) => {
                            return <a key={item.id.toString()} href={item.url}>
                                <img src={item.picture} alt=""/>
                            </a>;
                        })
                    }
                    {/*<img src="http://s.amazeui.org/media/i/demos/bing-1.jpg" alt=""/>*/}
                    {/*<img src="http://s.amazeui.org/media/i/demos/bing-2.jpg" alt=""/>*/}
                    {/*<img src="http://s.amazeui.org/media/i/demos/bing-3.jpg" alt=""/>*/}
                    {/*<img src="http://s.amazeui.org/media/i/demos/bing-4.jpg" alt=""/>*/}
                </AutoPlaySwipeableViews>
                <Pagination dots={this.props.banner.length} index={index} onChangeIndex={this.handleChangeIndex}/>
            </div>
        );
    }
}

export default DemoAutoPlay;
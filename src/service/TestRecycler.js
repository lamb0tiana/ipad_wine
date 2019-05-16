/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import MenuHeader from './MenuHeader';
import Row from './Row';
import ChampagneHeader from './ChampagneHeader';
import CountryTitle from './CountryTitle';
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2
};

let containerCount = 0;

class CellContainer extends React.Component {
    constructor(args) {
        super(args);
        this._containerId = containerCount++;
    }
    render() {
        return <View {...this.props}>{this.props.children}<Text>Cell Id: {this._containerId}</Text></View>;
    }
}

/***
 * To test out just copy this component and render in you root component
 */
export default class TestRecycler extends React.Component {
    constructor(args) {
        super(args);
        
        let { width } = Dimensions.get("window");
        this.scrollViewRef = null;
        
        //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
        //THIS IS VERY IMPORTANT, FORGET PERFORMANCE IF THIS IS MESSED UP
        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });

        //Create the layout provider
        //First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
        //Second: Given a type and object set the exact height and width for that type on given object, if you're using non deterministic rendering provide close estimates
        //If you need data based check you can access your data provider here
        //You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
        //NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
        this._layoutProvider = new LayoutProvider(
            index => {
                if (index ==0 ) {
                    return 'MenuHeader';
                }else if(index == 1){
                    return 'ChampagneHeader';
                }
                else if(index == 2){
                    return 'CountryTitle';
                }
                else {
                    return 'Row';
                }
            },
            (type, dim) => {
                switch (type) {
                    case ViewTypes.HALF_LEFT:
                        dim.width = width / 2;
                        dim.height = 160;
                        break;
                    case ViewTypes.HALF_RIGHT:
                        dim.width = width / 2;
                        dim.height = 160;
                        break;
                    case ViewTypes.FULL:
                        dim.width = width;
                        dim.height = 140;
                        break;
                    case 'MenuHeader':
                        dim.width = 1024;
                        dim.height = 1317;
                        break;
                    case 'ChampagneHeader':
                        dim.width = 1024;
                        dim.height = 181;
                        break;
                    case 'CountryTitle':
                        dim.width = 1024;
                        dim.height = 74;
                        break;
                    case 'Row':
                        dim.width = 1024;
                        dim.height = 125.334;
                        break;
                    default:
                        dim.width = 0;
                        dim.height = 0;
                }
            }
        );

        this._rowRenderer = this._rowRenderer.bind(this);

        //Since component should always render once data has changed, make data provider part of the state
        this.state = {
            dataProvider: dataProvider.cloneWithRows(this._generateArray(339))
        };
    }

    _generateArray(n) {
        let arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = i;
        }
        return arr;
    }

    setScrollViewRef = (element) => {
        this.scrollViewRef = element;
    };
    //Given type and data return the view component
    _rowRenderer(type, data) {
        //You can return any view here, CellContainer has no special significance
        switch (type) {
            case ViewTypes.HALF_LEFT:
                return (
                    <CellContainer style={styles.containerGridLeft}>
                        <Text>Data: {data}</Text>
                    </CellContainer>
                );
            case ViewTypes.HALF_RIGHT:
                return (
                    <CellContainer style={styles.containerGridRight}>
                        <Text>Data: {data}</Text>
                    </CellContainer>
                );
            case ViewTypes.FULL:
                return (
                    <CellContainer style={styles.container}>
                        <Text>Data: {data}</Text>
                    </CellContainer>
                );
            case 'MenuHeader':
                return (
                    <MenuHeader>  </MenuHeader>        
                );
            case 'ChampagneHeader':
                return (
                    <ChampagneHeader>  </ChampagneHeader>   
                );
            case 'CountryTitle':
                return (
                    <CountryTitle></CountryTitle>   
                );
            case 'Row':
                return (
                    <Row></Row>   
                );
            default:
                return null;
        }
    }



    
    render() {
        return(
            <View style={{height: hp('100%'), width: wp('100%')}}>
            <TouchableOpacity  onPress = {() => {
                        let dataProvider = new DataProvider((r1, r2) => {
                            return r1 !== r2;
                        });  
                        this.setState({
                            dataProvider: dataProvider.cloneWithRows(this._generateArray(4))
                        });
            }}>
            <Text >
                    test
            </Text>
        </TouchableOpacity>
        <RecyclerListView layoutProvider={this._layoutProvider} dataProvider={this.state.dataProvider} rowRenderer={this._rowRenderer} ref={this.setScrollViewRef}/>
        </View>
        )
       
    }
}
const styles = {
    container: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#00a1f1"
    },
    containerGridLeft: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#ffbb00"
    },
    containerGridRight: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#7cbb00"
    }
};
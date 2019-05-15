import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    ScrollView,
    Image
} from 'react-native';
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,} from "react-native-responsive-screen";

    export default class Sommelier extends Component {
        constructor(props) {
            super(props)
        }

        static navigationOptions =
        {
            header:null
        }

        render() {
          return (
            <ScrollView style={styles.body}>
                <View style={styles.container}>
                    <Text style={{fontSize: 80, fontFamily:"American Typewriter", color:'#ee4723',textAlign:"center"}}>
                        MMBe The Sommelier
                    </Text>
                    <Image source={require('../img/somme.jpg')} style={styles.image}>
                    </Image>
                    <Text style={styles.text} >
                    Life's too short to drink wine you don't like and wine lists can be intimidating, we get that
                    </Text>
                    <Text style={styles.text}>
                    That's why Mr & Mrs Bund offers 32 lovingly picked wines "by the glass" - each in four sizes 
                    - so you can sip, savour, enjoy (and switch) as you please, when you please. 
                    </Text>
                    <Text style={styles.text}>
                    You could simply order from our "wine pad" and we'll take it from here, or ask our staff for your wine card, we will bring you on a tour on how you can really be the sommelier!
                    </Text>
                    <Text style={styles.text}>
                    生活太短暂，不能喝你不喜欢的葡萄酒，酒单可能令人生畏, 我们明白了。
                    Mr & Mrs Bund 这就是为什么提供 32 精心挑选的葡萄酒 "靠玻璃杯" - 每种都有四种尺寸 - 所以你可以随心所欲地啜饮，品尝，享受（和转换）。 
                    </Text>
                    <Text style={styles.text}>
                    您只需从我们的“酒垫”订购，我们就可以从这里购买，或者向我们的工作人员索取您的酒卡，我们将带您参观如何真正成为侍酒师 。 
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                    <Image source={require('../img/retour2.png')} style={styles.imageicon} resizeMode="contain"></Image>
                    </TouchableOpacity>
                </View>
            </ScrollView>
          )
        };


    }

const styles = StyleSheet.create({
    body:{
        backgroundColor: 'black',
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        width:wp('90%'),
        marginLeft:wp('5%'),
        marginTop:wp('3%')
    },
    text: {
        color:"white",
        fontSize:20,
        marginBottom: hp("2.8%"),
        letterSpacing: 1.6
    },
    image:{
        height: hp("40%"),
        width: wp("95%"),
        resizeMode: 'contain',
        marginLeft: -18, 
        marginTop:40,
        marginBottom:35
    },
    imageicon:{
            height: hp("4%"), width: wp("6.%"), alignSelf: 'flex-end'
    }
});
    
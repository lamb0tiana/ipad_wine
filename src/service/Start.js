import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {
    Text,
    View
} from 'react-native'

export default class Start extends React.Component {
  state = {
    messages: [],
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }
data = [
  {
  "telephone": "044477889",
  "dt_create": "2013-05-13",
  "id_chatter": "2146033",
  "nbMO": "0",
  "dt_lastmsg": "2012-07-26 18:35:55"
  },
    {
    "telephone": "0440278921",
    "dt_create": "2013-05-13",
    "id_chatter": "2146033",
    "nbMO": "0",
    "dt_lastmsg": "2012-07-26 18:35:55"
    },
  
    {
    "telephone": "0677585999",
    "dt_create": "2013-05-13",
    "id_chatter": "2147138",
    "nbMO": "0",
    "dt_lastmsg": "2012-08-01 20:29:41"
    },
    {
    "telephone": "0676194444",
    "dt_create": "2013-05-13",
    "id_chatter": "2146082",
    "nbMO": "0",
    "dt_lastmsg": "2012-08-02 19:45:00"
    },
    {
    "telephone": "0683077889",
    "dt_create": "2013-05-13",
    "id_chatter": "2149004",
    "nbMO": "0",
    "dt_lastmsg": "2013-07-03 16:28:00"
    }
    ];
  fetchMessage = () => this.data[0].telephone

   randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
  }
  onSend(messages = []) {
    
    console.log(messages);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))

    var newM =  {
      _id: this.randomInt(2,444555),
      text: 'response',
      createdAt: new Date(),
      user: {
        _id: 8,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    }

    //messages.push(newM);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, newM),
    }))



  }

  renderAvatar(){
        return (
            <View>
                <Text style={{color:'#808080', fontSize: 44,fontFamily:"American Typewriter"}}>
                    Avatar1
                </Text>   
                <View style={{ height: 0.1, width: '100%', backgroundColor: 'black' }} />            
            </View>
        );
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => {this.onSend(messages)}}
        
        user={{
          _id: 1,
        }}
      />
    )
  }
}
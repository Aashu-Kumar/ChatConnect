import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

type Props = {
  text: string;
  mine: boolean;
  time: string;
};

const MessageBubble = ({ text, mine, time }: Props) => {
  return (
    <View
      style={[
        styles.container,
        mine ? styles.right : styles.left,
      ]}>

      <View
        style={[
          styles.bubble,
          mine ? styles.myBubble : styles.otherBubble,
        ]}>

        <Text
        style={[
            styles.message,
            { color: mine ? '#FFFFFF' : '#222222' },
        ]}>
          {text}
        </Text>

        <Text
        style={[
            styles.time,
            { color: mine ? '#EEEEEE' : '#666666' },
        ]}>
          {time}
        </Text>

      </View>

    </View>
  );
};

export default MessageBubble;

const styles = StyleSheet.create({

  container:{
    width:'100%',
    marginVertical:8,
  },

  left:{
    alignItems:'flex-start',
  },

  right:{
    alignItems:'flex-end',
  },

  bubble:{
    maxWidth:'75%',
    padding:12,
    borderRadius:18,
  },

  myBubble:{
    backgroundColor:'#2563EB',
  },

  otherBubble:{
    backgroundColor:'#ECECEC',
  },

  message:{
    color:'white',
    fontSize:16,
  },

  time:{
    color:'#ddd',
    fontSize:11,
    alignSelf:'flex-end',
    marginTop:5,
  },

});
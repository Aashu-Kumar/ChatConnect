import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

type Props = {
  sender: string;
  text: string;
  mine: boolean;
  time: string;
};

const MessageBubble = ({ sender, text, mine, time }: Props) => {
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

        {!mine && (
            <Text style={styles.sender}>
            {sender}
            </Text>
            )}

        <Text
        style={[
            styles.message,
            { color: mine ? '#FFFFFF' : '#222222' },
        ]}>
          {text}
        </Text>

        <View style={styles.footer}>

        <Text
        style={[
        styles.time,
        {
        color:mine ? '#E5E7EB':'#666',
        },
        ]}>
        {time}
        </Text>

        {mine &&

        <Text style={styles.tick}>
        ✓
        </Text>

        }

        </View>

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

  sender:{
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
    marginBottom: 4,
    },

  left:{
    alignItems:'flex-start',
  },

  right:{
    alignItems:'flex-end',
  },

  bubble:{
    maxWidth:'80%',
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

  footer:{
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    marginTop:5,
},

tick:{
    color:'#E5E7EB',
    marginLeft:5,
    fontSize:11,
},

});
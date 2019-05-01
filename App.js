import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  Image,
  StyleSheet,
  View,
  Animated,
  Easing,
  PanResponder,
} from 'react-native';

export default class Myproject extends Component {
  constructor(props) {
    super(props);
    this.RotateValueHolder = new Animated.Value(0);

    this.StartImageRotateFunction();

    let deviceWidth = Dimensions.get('window').width;
    let deviceHeight = Dimensions.get('window').height;

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,

      onStartShouldSetPanResponderCapture: () => true,

      onPanResponderMove: (event, gestureState: GestureState) => {
        // modified coordinates
        var moveX = gestureState.moveX - deviceWidth / 2;
        var moveY = gestureState.moveY - deviceHeight / 2;

        // return degrees
        var moveValue = (Math.atan(moveY / moveX) * 180) / Math.PI;

        if (moveX > 0 && moveY < 0) {
          moveValue += 180;
        } else if (moveX > 0 && moveY > 0) {
          moveValue -= 180;
        }

        this.RotateValueHolder.setValue(moveValue);
      },

      onPanResponderRelease: (event, gestureState: GestureState) => {
        var angle = this.RotateValueHolder._value;
        var moveX = gestureState.x0 - deviceWidth / 2;
        var moveY = gestureState.y0 - deviceHeight / 2;

        // return degrees
        var moveAngle = (Math.atan(moveY / moveX) * 180) / Math.PI;

        if (moveX > 0 && moveY < 0) {
          moveAngle += 180;
        } else if (moveX > 0 && moveY > 0) {
          moveAngle -= 180;
        }

        var angleDiff = moveAngle - angle;
        console.log(angleDiff);
        if ((angleDiff < 0 && angleDiff > -200) || angleDiff > 200) {
          Animated.timing(this.RotateValueHolder, {
            toValue: Math.abs((angleDiff%120)*9),
            duration: 1000,
            easing: Easing.out(Easing.quad),
            userNativeDriver: true,
          }).start();
        } else if (angleDiff >= 0 || angleDiff < -200) {
          Animated.timing(this.RotateValueHolder, {
            toValue: -1 * Math.abs((angleDiff%120)*9),
            duration: 1000,
            easing: Easing.out(Easing.quad),
            userNativeDriver: true,
          }).start();
        }
      },
    });
  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: -720,
      duration: 1000,
      easing: Easing.out(Easing.quad),
      userNativeDriver: true,
    }).start();
  }

  render() {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });
    const width = Dimensions.get('window').width;

    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <Animated.Image
          style={{
            width: (width * 5) / 8,
            height: (width * 5) / 8,
            transform: [{ rotate: RotateData }],
          }}
          source={{
            uri: 'http://pngimg.com/uploads/banana/banana_PNG844.png',
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: 'lightblue',
  },
});


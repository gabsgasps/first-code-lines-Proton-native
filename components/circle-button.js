import { Text, TouchableOpacity } from 'proton-native'; // import the proton-native components
import React, { Component } from 'react'; // import from react

export class CircleButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: this.props.backgroundColor,
          borderRadius: 30,
          height: 60,
          alignItems: this.props.start ? 'flex-start' : 'center',
          justifyContent: 'center',
          minWidth: this.props.width || 60,
        }}
        onPress={this.props.onPress}
      >
        <Text
          style={{
            color: this.props.color,
            fontSize: this.props.size,
            marginLeft: this.props.start || 0,
            letterSpacing: 1.1,
          }}
        >
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }
}

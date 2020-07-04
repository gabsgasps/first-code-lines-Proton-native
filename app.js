import { App, Window } from 'proton-native';
import React, { Component } from 'react';
import { Calculator } from './components/calculator';

export default class Example extends Component {
  render() {
    return (
      <App>
        <Window
          style={{
            width: 450,
            minHeight: 600,
            backgroundColor: 'black',
          }}
        >
          <Calculator />
        </Window>
      </App>
    );
  }
}

import { Text, View } from 'proton-native'; // import the proton-native components
import React, { Component } from 'react'; // import from react
import btnStyle from '../utils/button';
import { CircleButton } from './circle-button';

const defaultState = {
  secondary: 0,
  primary: 0,
  operator: '',
  justChanged: false,
  decimal: false,
};

export class Calculator extends Component {
  state = defaultState;

  buttonsHeaders = [
    {},
    {
      text: 'Clear',
      type: 'secondary',
      onPress: () => this.setState(defaultState),
    },
    {
      text: '%',
      type: 'secondary',
      onPress: () =>
        this.setState({
          primary: this.state.primary / 100,
        }),
    },
    {
      text: '÷',
      type: 'primary',
      onPress: () => this.changeOperator('/'),
    },
  ];

  getButtons() {
    return [
      this.buttonsHeaders,
      [
        {
          text: '7',
          type: 'number',
          onPress: () => this.addDigit(7),
        },
        {
          text: '8',
          type: 'number',
          onPress: () => this.addDigit(8),
        },
        {
          text: '9',
          type: 'number',
          onPress: () => this.addDigit(9),
        },
        {
          text: '×',
          type: 'primary',
          onPress: () => this.changeOperator('*'),
        },
      ],
      [
        {
          text: '4',
          type: 'number',
          onPress: () => this.addDigit(4),
        },
        {
          text: '5',
          type: 'number',
          onPress: () => this.addDigit(5),
        },
        {
          text: '6',
          type: 'number',
          onPress: () => this.addDigit(6),
        },
        {
          text: '-',
          type: 'primary',
          onPress: () => this.changeOperator('-'),
        },
      ],
      [
        {
          text: '1',
          type: 'number',
          onPress: () => this.addDigit(1),
        },
        {
          text: '2',
          type: 'number',
          onPress: () => this.addDigit(2),
        },
        {
          text: '3',
          type: 'number',
          onPress: () => this.addDigit(3),
        },
        {
          text: '+',
          type: 'primary',
          onPress: () => this.changeOperator('+'),
        },
      ],
      [
        {
          text: '0',
          type: 'number',
          width: 185,
          start: true,
          onPress: () => this.addDigit(0),
        },
        {
          text: '.',
          type: 'number',
          onPress: () => this.setState({ decimal: true }),
        },
        {
          text: '=',
          type: 'primary',
          onPress: () => this.changeOperator('+'),
        },
      ],
    ];
  }

  addDigit = (digit) => {
    const { primary, justChanged, decimal } = this.state;
    let shared = {
      justChanged: false,
      secondary: primary,
    };
    if (justChanged) {
      if (decimal) {
        this.setState({
          ...shared,
          primary: digit / 10,
        });
        return;
      }
      this.setState({
        ...shared,
        primary: digit,
      });

      return;
    }

    if (!decimal) {
      this.setState({
        primary: 10 * this.state.primary + digit,
      });
      return;
    }
    if (primary.toString().indexOf('.') == -1) {
      this.setState({
        primary: parseFloat(primary.toString() + '.' + digit.toString()),
      });
      return;
    }
    this.setState({
      primary: parseFloat(primary.toString() + digit.toString()),
    });
  };

  changeOperator = (operator) => {
    let shared = {
      justChanged: true,
      operator,
      secondary: 0,
    };

    const operators = {
      '+': this.state.secondary + this.state.primary,
      '-': this.state.secondary - this.state.primary,
      '/': this.state.secondary / this.state.primary,
      '*': this.state.secondary * this.state.primary,
    };

    if (!operators[this.state.operator]) {
      this.setState({ operator, justChanged: true });
      return;
    }

    this.setState({ ...shared, primary: operators[this.state.operator] });
  };

  componentDidUpdate() {
    console.log('state', this.state);
  }

  render() {
    return (
      <>
        <View
          style={{
            width: '100%',
            height: '30%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            paddingRight: 35,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 80,
              textAlign: 'right',
              marginBottom: 15,
              fontWeight: 200,
            }}
          >
            {this.state.primary.toString().length >= 7
              ? this.state.primary.toExponential(4)
              : this.state.primary}
          </Text>
        </View>
        {this.getButtons().map((buttonGroup, index1) => (
          <View
            key={index1.toString()}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 35,
              paddingLeft: 35,
            }}
          >
            {buttonGroup.map((button, index2) => (
              <CircleButton
                key={index1.toString() + index2.toString()}
                {...btnStyle[button.type]}
                width={button.width}
                onPress={button.onPress}
              >
                {button.text}
              </CircleButton>
            ))}
          </View>
        ))}
      </>
    );
  }
}

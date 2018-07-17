

import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TextInput, View,TouchableOpacity,Button,Alert} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
  'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      resultText: "",
      calculationText : ""

    }
    this.operations = ['DEL','+' , '-' , '*', '/']

    this.buttonPressed = this.buttonPressed.bind(this);
  }

  validate() {
    const text = this.state.resultText

    switch(text.slice(-1)) {

      case '+':
      case '-':
      case '*':
      case '/':
      return false

    }
    return true
  }

  buttonPressed(text) {
    console.log(text);

    if(text == '='){
      return this.validate() && this.calculateResult();
    }
    this.setState( {
      resultText: this.state.resultText + text
    })



  }
  calculateResult() {
    const text = this.state.resultText

    this.setState ({
      calculationText : eval(text)
    })




  }
  operate(operation) {
    switch(operation){
      case 'DEL':
      let text = this.state.resultText.split('')
      text.pop()
      text.join('')
      this.setState({
        resultText: text.join('')
      })
      break
      case '+':
      case '-':
      case '*':
      case '/':
      const lastChar = this.state.resultText.split('').pop()

      if(this.operations.indexOf(lastChar) > 0 ) return


      if(this.state == "") return
      this.setState({
        resultText: this.state.resultText + operation
      })


    }
  }



  render() {

    let rows = []
    let nums = [ [1 , 2, 3,] , [4 ,5 ,6] , [7 ,8 ,9] , ['.' , 0 , '=']]

    for(let i=0;i < 4 ;++i){
      let row = []
      for(let j=0; j < 3 ;++j){
          row.push(<TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])}
          style = {styles.btn}><Text style =  {styles.btnText}>{nums[i][j]}
          </Text></TouchableOpacity>)
      }
      rows.push( <View key={i} style = {styles.row}>{row}</View>)

    }


    let ops = []
    for(let i=0;i < 5 ;++i){


      ops.push(<TouchableOpacity key={this.operations[i]} onPress={() => this.operate(this.operations[i])}
      style = {styles.btn}><Text style =  {[styles.btnText,styles.white]}>{this.operations[i]}
      </Text></TouchableOpacity>)


    }



    return (
      <View style={styles.container}>
            <View style = {styles.result}>
                <Text style={styles.resultText}>{this.state.resultText}</Text>
            </View>
            <View style = {styles.calculation}>
                <Text style={styles.calculationText}>{this.state.calculationText}</Text>
            </View>
            <View style = {styles.buttons}>
                <View style = {styles.numbers}>
                    {rows}
                </View>

                 <View style = {styles.operations}>

                    {ops}

                  </View>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,  // Layoutun kalınlığı

  },
  resultText: {
    fontSize: 34,
    color: 'black'
  },
  btnText : {
    fontSize: 30,
    color:'white'

  },
  calculationText: {
    fontSize:30,
    color: 'black'
  },
  btn : {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems : 'center'
  },
  row: {
    flexDirection : 'row',
    flex : 1,
    justifyContent: 'space-around',
    alignItems : 'center'
  },
  result: {
    flex: 2 ,  // Layoutun kalınlığı
    backgroundColor : 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculation: {
    flex: 1,  // Layoutun kalınlığı
    backgroundColor : 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flex: 7,
    flexDirection : 'row',
  },
  numbers: {
    flex: 3 ,   // Layoutun kalınlığı
    backgroundColor : 'green',
  },
  operations: {
    flex: 1 ,  // Layoutun kalınlığı
    backgroundColor : 'grey',
    justifyContent: 'space-around',
    alignItems : 'stretch'

  },
  white : {
    color: 'white'
  }

})

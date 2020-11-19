/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './src/App';
import { name as appName } from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#ff3838',
        accent: '#fff200',
    },
};

const preMesgs = ["Hello", "How are you doin' ?", "My Name is", "Are you ?", "Is that", "Sorry", "May I ?"]
const getSavedMessages = async () => {
    try {
      const msgJSON = await AsyncStorage.getItem("MESSAGES");
      const messages = JSON.parse(msgJSON || "");
      if (msgJSON && messages.indexOf) {
        return messages;
      } else {
        await AsyncStorage.setItem("MESSAGES", JSON.stringify(preMesgs));
        return preMesgs;
      }
    } catch (error) {
        return preMesgs;
    }

  };


class Main extends React.PureComponent {
    state = {
        predefinedMessages:preMesgs
    }
    componentDidMount(){
        var self = this;
        getSavedMessages().then(data => {
            self.setState({
                predefinedMessages:data
            })
        })
    }
    render (){
        return (
            <PaperProvider theme={theme}>
                <App messages={this.state.predefinedMessages}/>
            </PaperProvider>
        );
    }
   
}

AppRegistry.registerComponent(appName, () => Main);

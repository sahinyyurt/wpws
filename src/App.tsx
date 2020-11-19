import React from 'react';
import {
  Keyboard,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { ActivityIndicator, Button, Dialog, Paragraph, Portal, Snackbar, Text, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, PhoneNumberInput } from './components';
import { checkNumberIsFoundInWP } from './services';

declare const global: { HermesInternal: null | {} };
type Props = {
  messages: Array<string>
}
const App = React.memo(({ messages }: Props) => {
  const [message, onChangeTextMessage] = React.useState('');
  const [formattedValue, setFormattedValue] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [predefinedMessages, setPredefinedMessages] = React.useState(messages);
  const [visibleSnack, setVisibleSnack] = React.useState(false);
  React.useEffect(() => {
    setPredefinedMessages(messages);
  }, [messages]);

  const renderUnvisibleElem = () => {
    return (
      <>
        <Snackbar
          duration={2000}
          visible={visibleSnack}
          onDismiss={() => setVisibleSnack(false)}
        >
          <Icon name="trash-o" size={20} color="white" />
          <Text style={{ color: "white" }} >
            Quick message has been deleted
          </Text>
        </Snackbar>
        {loading && <View style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          opacity: 0.5,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1
        }}>
          <ActivityIndicator animating={loading} size="large" />
        </View>}
        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{alertMessage}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </>
    )
  }

  const handleSendPress = async () => {
    if (formattedValue.length > 0) {
      setLoading(true);
      Keyboard.dismiss();
      try {
        const isFounded = await checkNumberIsFoundInWP(formattedValue);
        if (isFounded) {
          Linking.openURL(`https://api.whatsapp.com/send/?phone=${formattedValue}&text=${message}`);
          if (message.length > 2) {
            var index = predefinedMessages.indexOf(message);
            if (index > -1) {
              predefinedMessages.splice(index, 1);
            }
            await AsyncStorage.setItem("MESSAGES", JSON.stringify([message, ...predefinedMessages]));
            setPredefinedMessages([message, ...predefinedMessages])

          }
        } else {
          setAlertMessage("Phone Number is not found in WhatsApp");
          setVisible(true);
        }
      } catch (error) {
        setAlertMessage("Error Occured!!" + JSON.stringify(error));
        setVisible(true);
      }
      setLoading(false);
    } else {
      setAlertMessage("Please Type Phone Number");
      setVisible(true);
    }
  };


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        {renderUnvisibleElem()}
        <Container>
          <PhoneNumberInput onChangeFormattedValue={setFormattedValue} />
          <TextInput
            label="Type Message"
            value={message}
            mode="outlined"
            textAlignVertical="top"
            onChangeText={text => onChangeTextMessage(text)}
            style={{
              width: "100%",
              height: 150
            }}
            multiline
            numberOfLines={4}
          />
          <Button
            testID="details"
            mode="contained"
            style={{ margin: 10 }}
            onPress={handleSendPress}
          >
            Send via Whatsapp
          </Button>
          <Text style={{ margin: 10, fontSize: 20, fontWeight: "600" }}>Quick Messages</Text>
          <ScrollView style={{ flex: 1, width: "90%" }} contentContainerStyle={{ justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap" }}>
            {predefinedMessages.map((el, i) => {
              return (
                <Button
                  key={i}
                  mode="contained"
                  uppercase={false}
                  style={{ margin: 5, maxWidth: 200 }}
                  onPress={() => {
                    onChangeTextMessage(predefinedMessages[i])
                  }}
                  onLongPress={() => {
                    predefinedMessages.splice(i, 1);
                    AsyncStorage.setItem("MESSAGES", JSON.stringify([...predefinedMessages]));
                    setPredefinedMessages([...predefinedMessages]);
                    setVisibleSnack(true);
                  }}
                >
                  {el}
                </Button>)
            })}
          </ScrollView>
        </Container>
      </SafeAreaView>
    </>
  );
});

export default App;

import React from 'react';
import PhoneInput from "react-native-phone-number-input";

export const PhoneNumberInput = ({onChangeFormattedValue}:any) => {
  const [value, setValue] = React.useState("");

  return (
    <PhoneInput
      defaultValue={value}
      defaultCode="TR"
      onChangeText={(text: React.SetStateAction<string>) => {
        setValue(text);
      }}
      onChangeFormattedText={(text: React.SetStateAction<string>) => {
        onChangeFormattedValue(text);
      }}

      autoFocus
      countryPickerProps={{
        withEmoji: true,
        withAlphaFilter: true,
        withCallingCode: true
      }}
      codeTextStyle={{
        fontWeight: "600"
      }}
      textInputStyle={{
        backgroundColor: "white",
        fontWeight: "600"
      }}
      textInputProps={{
        selectionColor: "#ff3838",
        placeholder: "Type Phone Number",
        placeholderTextColor: "#7b7b7b"
      }}
      textContainerStyle={{
        backgroundColor: "white",
      }}
      containerStyle={{
        width: "100%",
        borderColor: "#7b7b7b",
        backgroundColor: "white",
        borderWidth: 1.2,
        borderRadius: 5,
        margin: 5,
        padding: 5
      }} />
  );
};

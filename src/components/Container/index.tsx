import React, { ReactNode } from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';

type Props = {
    children: ReactNode | ReactNode[];
    testID?: string;
};

export function Container({ children, testID }: Props) {
    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    padding: 10
                }}
                testID={testID}
            >
                {children}
            </View>
        </TouchableWithoutFeedback>
    );
}

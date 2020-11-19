import React from 'react';
import { Appbar } from 'react-native-paper';

type Props = {
    testID?: string;
    style?: any
};

export function Header({ testID, style }: Props ) {
    return (
        <Appbar.Header >
            <Appbar.Content title="WPWS" subtitle={'Whatsapp without saving contact'} />
        </Appbar.Header>
    );
}

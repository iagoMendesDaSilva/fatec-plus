import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StackNav } from './stackNav';
import { ModalProvider } from './modalContext';

export const Navigation = () => {

    return (
        <NavigationContainer>
            <ModalProvider>
                <StackNav />
            </ModalProvider>
        </NavigationContainer>
    );
}
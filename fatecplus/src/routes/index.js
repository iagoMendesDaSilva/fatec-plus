import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StackNav } from './stackNav';
import { UserProvider } from './userContext';
import { ModalProvider } from './modalContext';

export const Navigation = () => {

    return (
        <NavigationContainer>
            <UserProvider>
                <ModalProvider>
                    <StackNav />
                </ModalProvider>
            </UserProvider>
        </NavigationContainer>
    );
}
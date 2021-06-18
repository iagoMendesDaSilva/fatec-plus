import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StackNav } from './stackNav';

export const Navigation = () => {

    return (
        <NavigationContainer>
            <StackNav />
        </NavigationContainer>
    );
}
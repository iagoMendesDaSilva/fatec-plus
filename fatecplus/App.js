import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StackNav } from './src/navigators';
import { ModalProvider } from './src/contexts';

const App = () => {

    return (
        <NavigationContainer>
                <ModalProvider>
                    <StackNav />
                </ModalProvider>
        </NavigationContainer>
    );
}

export default App;
import styles from './style';

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

import { Icon } from '../helpers';
import Colors from '../constants/colors';
import { Splash, Auth, Vacancies,Student, Job, Recovery, VerificationCode, ChangePassword } from '../modules';

export const StackNav = () => {

    const Stack = createStackNavigator();

    const back = (navigation, back = true) => {
        return (
            <>
                <SafeAreaView style={styles.safeArea} />
                <StatusBar barStyle={'light-content'} backgroundColor={Colors.background} />
                {back &&
                    <TouchableOpacity style={styles.touchableGoBack}
                        onPress={() => navigation.goBack()}>
                        <Icon name={'angle-left'} size={40} />
                    </TouchableOpacity>}
            </>
        )
    }

    const screenOptions = {
        headerTitle: false,
        headerTransparent: true,
        headerTintColor: 'white',
    }

    return (
        <Stack.Navigator
            initialRouteName='Splash'
            screenOptions={screenOptions}>
            <Stack.Screen name="Login" component={Auth} options={{ header: ({ navigation }) => back(navigation, false) }} />
            <Stack.Screen name="Splash" component={Splash} options={{ header: ({ navigation }) => back(navigation, false) }} />
            <Stack.Screen name="Vacancies" component={Vacancies} options={{ header: ({ navigation }) => back(navigation, false) }} />
            <Stack.Screen name="Recovery" component={Recovery} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="VerificationCode" component={VerificationCode} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Student" component={Student} options={{ header: ({ navigation }) => back(navigation, false) }} />
            <Stack.Screen name="Job" component={Job} options={{ header: ({ navigation }) => back(navigation, false) }} />
        </Stack.Navigator>
    );
}
import styles from './style';

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

import { Icon } from '../helpers';
import { TabNav } from './tabNav';
import Colors from '../constants/colors';
import { Splash, Auth, Recovery, VerificationCode, ChangePassword, Register, MainRegister, AddressRegister, Resume, Vacancy, Student, Job, ChangeLog, Coordinators } from '../modules';

export const StackNav = () => {

    const Stack = createStackNavigator();

    const back = (navigation, back = true, color = Colors.BACKGROUND) => {
        return (
            <>
                <SafeAreaView style={{ ...styles.safeArea, backgroundColor: color }} />
                <StatusBar animated barStyle={'light-content'} backgroundColor={color} />
                {back &&
                    <TouchableOpacity style={styles.touchableGoBack}
                        onPress={() => navigation.goBack()}>
                        <Icon name={'angle-left'} size={40} />
                    </TouchableOpacity>}
            </>
        )
    }

    const backTabBar = data => {
        const color = data.route.state && data.route.state.index === 2
            ? Colors.BACKGROUND
            : Colors.BACKGROUND_LIGHT
        return back(false, false, color)
    }

    const screenOptions = {
        headerTitle: false,
        headerTransparent: true,
        headerTintColor: Colors.TEXT_PRIMARY,
    }

    return (
        <Stack.Navigator
            initialRouteName='Splash'
            screenOptions={screenOptions}>
            <Stack.Screen name="Login" component={Auth} options={{ header: ({ navigation }) => back(navigation, false) }} />
            <Stack.Screen name="Splash" component={Splash} options={{ header: ({ navigation }) => back(navigation, false) }} />
            <Stack.Screen name="Resume" component={Resume} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Register" component={Register} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Vacancy" component={Vacancy} options={{ header: ({ navigation }) => back(navigation, false) }} />
            <Stack.Screen name="Recovery" component={Recovery} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="ChangeLog" component={ChangeLog} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="MainRegister" component={MainRegister} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Coordinators" component={Coordinators} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="AddressRegister" component={AddressRegister} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="VerificationCode" component={VerificationCode} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Home" component={TabNav} options={{ header: ({ scene }) => backTabBar(scene) }} />
            <Stack.Screen name="Student" component={Student} options={{ header: ({ navigation }) => back(navigation, false) }} />
            <Stack.Screen name="Job" component={Job} options={{ header: ({ navigation }) => back(navigation, false) }} />
        </Stack.Navigator>
    );
}

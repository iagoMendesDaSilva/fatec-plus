import styles from './style';

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

import { Icon } from '../helpers';
import Colors from '../constants/colors';
import { Splash, Auth, Vacancies,Student, Job, Recovery, VerificationCode, ChangePassword, Register, MainRegister, AddressRegister, ResumeRegister, Network, Language, Project, Formation, Experience } from '../modules';

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
            <Stack.Screen name="Register" component={Register} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="MainRegister" component={MainRegister} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="AddressRegister" component={AddressRegister} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="ResumeRegister" component={ResumeRegister} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Network" component={Network} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Language" component={Language} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Project" component={Project} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Formation" component={Formation} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Experience" component={Experience} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Student" component={Student} options={{ header: ({ navigation }) => back(navigation, false) }} />
            <Stack.Screen name="Job" component={Job} options={{ header: ({ navigation }) => back(navigation, false) }} />
        </Stack.Navigator>
    );
}
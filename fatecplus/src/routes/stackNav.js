import styles from './style';

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

import { Icon } from '../helpers';
import { TabNav } from './tabNav';
import Colors from '../constants/colors';
import { Splash, Auth, Recovery, VerificationCode, ChangePassword, Register, MainRegister, AddressRegister, Resume, Network, Language, Project, Formation, Experience, ListItems } from '../modules';

export const StackNav = () => {

    const Stack = createStackNavigator();

    const back = (navigation, back = true, color = Colors.background) => {
        return (
            <>
                <SafeAreaView style={{ ...styles.safeArea, backgroundColor: color }} />
                <StatusBar barStyle={'light-content'} backgroundColor={color} />
                {back &&
                    <TouchableOpacity style={styles.touchableGoBack}
                        onPress={() => navigation.goBack()}>
                        <Icon name={'angle-left'} size={40} />
                    </TouchableOpacity>}
            </>
        )
    }

    const verifyScreenHome = data => {
        const color = data.route.state && data.route.state.index === 4 ? Colors.background : Colors.background_light
        return back(false, false, color)
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
            <Stack.Screen name="Project" component={Project} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Splash" component={Splash} options={{ header: ({ navigation }) => back(navigation, false) }} />
            <Stack.Screen name="Resume" component={Resume} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Register" component={Register} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Network" component={Network} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="ListItems" component={ListItems} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Recovery" component={Recovery} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Language" component={Language} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Formation" component={Formation} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Experience" component={Experience} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="MainRegister" component={MainRegister} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="AddressRegister" component={AddressRegister} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="VerificationCode" component={VerificationCode} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ header: ({ navigation }) => back(navigation, true) }} />
            <Stack.Screen name="Home" component={TabNav} options={{ header: ({ scene }) => verifyScreenHome(scene) }} />
        </Stack.Navigator>
    );
}
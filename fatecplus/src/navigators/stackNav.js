import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import Colors from '~colors';
import { Icon } from '~components';
import { TabNav } from '~navigators';
import { ModalContext } from '~contexts';
import { Splash, Auth, Recovery, VerificationCode, ChangePassword, Register, MainRegister, AddressRegister, Resume, JobForm, Student, Job, ChangeLog, Coordinators } from '~screens';

export const StackNav = () => {

    const Stack = createStackNavigator();
    const modal = useContext(ModalContext);

    const back = (navigation, back = true, color = Colors.BACKGROUND) => {
        return (
            <>
                <SafeAreaView style={{ ...styles.safeArea, backgroundColor: color }} />
                <StatusBar animated barStyle={'light-content'} backgroundColor={modal.info.visible ? Colors.BACKGROUND : color} />
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
            <Stack.Screen name="JobForm" component={JobForm} options={{ header: ({ navigation }) => back(navigation, false) }} />
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

const styles = StyleSheet.create({
    safeArea: {
        flex: 0,
    },
    touchableGoBack: {
        width: 75,
        height: 50,
        paddingHorizontal: 11,
        justifyContent: "center",
    },
});
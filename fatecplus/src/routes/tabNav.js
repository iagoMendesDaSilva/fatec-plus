import styles from './style';
import * as React from 'react';
import SystemNavigationBar from "react-native-system-navigation-bar";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TextDefault, Icon } from '../helpers';


import Colors from '../constants/colors';
import { Vacancies, Menu, Students } from '../modules';

export const TabNav = ({ navigation }) => {

    navigation.addListener('blur', () => SystemNavigationBar.setNavigationColor(Colors.BACKGROUND, true));
    navigation.addListener('focus', () => SystemNavigationBar.setNavigationColor(Colors.BACKGROUND_LIGHT, true));


    const Tab = createBottomTabNavigator();

    const getScreenProps = name => {
        switch (name) {
            case "Menu":
                return { name: "Menu", icon: { name: "bars", lib: "FontAwesome5" } }
            case "Vacancies":
                return { name: "Vagas", icon: { name: "suitcase", lib: "FontAwesome" } }
            case "Students":
                return { name: "Alunos", icon: { name: "graduation-cap", lib: "FontAwesome5" } }
        }
    }

    const getIconsByRoute = (name, focused) => {
        const screen = getScreenProps(name);
        return (
            <>
                <Icon
                    size={20}
                    lib={screen.icon.lib}
                    name={screen.icon.name}
                    color={focused ? Colors.TEXT_PRIMARY : Colors.TEXT_PRIMARY_LIGHT_PLUS} />
                {
                    focused &&
                    <TextDefault
                        children={screen.name}
                        styleText={styles.txtTabBar} />
                }
            </>
        );
    }



    return (
        <Tab.Navigator
            initialRouteName='Vacancies'
            tabBarOptions={{ style: styles.tabBar, showLabel: false }}
            screenOptions={({ route }) => ({ tabBarIcon: ({ focused }) => getIconsByRoute(route.name, focused), })}>
            <Tab.Screen name="Students" component={Students} />
            <Tab.Screen name="Vacancies" component={Vacancies} />
            <Tab.Screen name="Menu" component={Menu} />
        </Tab.Navigator>
    );
}

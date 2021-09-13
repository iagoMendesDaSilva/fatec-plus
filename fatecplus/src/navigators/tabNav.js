import * as React from 'react';
import { StyleSheet } from 'react-native';
import SystemNavigationBar from "react-native-system-navigation-bar";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '~colors';
import { TextDefault, Icon } from '~components';
import { Vacancies, Menu, Students } from '~screens';

export const TabNav = ({ navigation }) => {

    navigation.addListener('blur', () => SystemNavigationBar.setNavigationColor(Colors.BACKGROUND, true));
    navigation.addListener('focus', () => SystemNavigationBar.setNavigationColor(Colors.BACKGROUND_LIGHT, true));


    const Tab = createBottomTabNavigator();

    const getScreenProps = route => {
        switch (route.name) {
            case "Menu":
                return { name: "Menu", icon: { name: "bars", lib: "FontAwesome5" } }
            case "Vacancies":
                return { name: "Vagas", icon: { name: "suitcase", lib: "FontAwesome" } }
            case "Students":
                return { name: route.params && route.params.jobId ? "Inscritos" : "Alunos", icon: { name: "graduation-cap", lib: "FontAwesome5" } }
        }
    }

    const getIconsByRoute = (route, focused) => {
        const screen = getScreenProps(route);
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
            screenOptions={({ route }) => ({ tabBarIcon: ({ focused }) => getIconsByRoute(route, focused), })}>
            <Tab.Screen name="Students" component={Students} />
            <Tab.Screen name="Vacancies" component={Vacancies} />
            <Tab.Screen name="Menu" component={Menu} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: 60,
        borderTopWidth: 0,
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
    txtTabBar: {
        fontSize: 12,
        color: Colors.TEXT_PRIMARY,
        paddingBottom: 5,
    },
});

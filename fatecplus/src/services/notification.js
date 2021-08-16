import OneSignal from 'react-native-onesignal';

import Constants from '../constants/values';

export class Notification {
    constructor(navigation) {
        this.navigation = navigation;
        this.configOneSignal()
    }

    configOneSignal() {
        OneSignal.setLogLevel(6, 0);
        OneSignal.setAppId(Constants.ONESIGNAL_APP_ID);
        OneSignal.setNotificationOpenedHandler(payload => this.goTo(payload));
    }

    static getPlayerId() {
        OneSignal.disablePush(false)
        return new Promise(async resolve => {
            const deviceState = await OneSignal.getDeviceState();
            return resolve(deviceState.userId);
        });
    }

    goTo(payload) {
        if (payload.notification.additionalData) {
            const data = payload.notification.additionalData
            const indication = data.indication || false
            this.navigation.replace("Splash", { id: Number(data.id), type: data.type, indication })
        } else {
            this.navigation.replace('Splash')
        }
    }

   static unregister(){
        OneSignal.disablePush(true);
    }

}
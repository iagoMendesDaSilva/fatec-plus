import OneSignal from 'react-native-onesignal';

export class Notification {
    constructor(navigation) {
        this.navigation = navigation;
        this.configOneSignal()
    }

    configOneSignal() {
        OneSignal.setLogLevel(6, 0);
        OneSignal.setAppId("76288217-d814-43e3-8cd0-5dcf5f052177");
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
            this.navigation.replace("Splash", { id: Number(data.id), type: data.type })
        } else {
            this.navigation.replace('Splash')
        }
    }

   static unregister(){
        OneSignal.disablePush(true);
    }

}
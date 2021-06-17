import { Animated } from 'react-native';

export class Animate {
    constructor() {
        throw new Error("Can't instantiate to Animate class.")
    }

    static timming = (state, toValue, duration = 600, useNativeDriver = false) => {
        return Animated.timing(state, {
            duration,
            toValue,
            useNativeDriver,
        });
    }

}
import { Animated } from 'react-native';

export class Animate {
    constructor() {
        throw new Error("Can't instantiate to Animate class.")
    }

    static timming = (state, toValue, duration = 600, useNativeDriver = false, delay=0) => {
        return Animated.timing(state, {
            delay,
            duration,
            toValue,
            useNativeDriver,
        });
    }

}
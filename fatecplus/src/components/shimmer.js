import React from 'react';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import Colors from '~colors';

export const Shimmer = ({ children, visible, style }) => {

    return (
        <ShimmerPlaceHolder
            autoRun
            style={style}
            visible={visible}
            colorShimmer={Colors.SHIMMER}>
            {children}
        </ShimmerPlaceHolder>
    )
}

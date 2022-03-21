import React, { forwardRef, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';

interface Props extends KeyboardAwareScrollViewProps {
    children: ReactNode;
    customStyle?: StyleProp<ViewStyle>;
}

const StyledKeyboardAware = (props: Props, ref: any) => {
    const { children, customStyle, extraScrollHeight, ...otherProps } = props;

    return (
        <KeyboardAwareScrollView
            ref={ref}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={customStyle}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            showsVerticalScrollIndicator={false}
            extraScrollHeight={extraScrollHeight || 40}
            nestedScrollEnabled={true}
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            {...otherProps}
        >
            {children}
        </KeyboardAwareScrollView>
    );
};

export default forwardRef(StyledKeyboardAware);

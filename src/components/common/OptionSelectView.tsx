import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { OPTION_SELECT_IMAGE, staticValue } from 'utilities/staticData';

const OptionSelectView = ({ onPress, data = OPTION_SELECT_IMAGE }: any) => {
    return (
        <View style={{ flex: 1 }}>
            {data.map((item: any) => {
                return (
                    <StyledTouchable
                        key={item?.id}
                        hitSlop={staticValue.DEFAULT_HIT_SLOP}
                        customStyle={[styles.wrapRow]}
                        onPress={() => onPress(item?.id)}
                    >
                        <StyledText i18nText={item?.name} customStyle={styles.textOption} />
                        {!!item.icon && <StyledIcon source={item.icon} size={18} />}
                    </StyledTouchable>
                );
            })}
        </View>
    );
};

const styles = ScaledSheet.create({
    wrapRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '20@s',
        marginVertical: '20@vs',
        justifyContent: 'space-between',
    },
    textOption: {
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        right: '10@s',
        top: '10@vs',
        zIndex: 1,
    },
});

export default OptionSelectView;

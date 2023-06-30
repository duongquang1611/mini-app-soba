import { RootState } from 'app-redux/hooks';
import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import InputChooseRestaurants from 'feature/authentication/components/InputChooseRestaurants';
import { HOME_ROUTE } from 'navigation/config/routes';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

interface IProps {
    customContainerStyle?: StyleProp<ViewStyle>;
}

const BtnChooseRestaurants = (props: IProps) => {
    const {
        globalDataUnSave: { withoutAccount },
        globalData: { chooseBranch },
    } = useSelector((state: RootState) => state);
    const { customContainerStyle } = props;
    if (withoutAccount) return null;

    return (
        <View style={[styles.container, customContainerStyle]}>
            {!chooseBranch?.id ? (
                <StyledText
                    i18nText={'authen.register.selectBranchStore.noBranch'}
                    customStyle={[styles.txtAddress, styles.txtDefault]}
                    numberOfLines={1}
                />
            ) : (
                <>
                    <StyledText originValue={chooseBranch?.name} customStyle={styles.txtAddress} numberOfLines={1} />
                    <StyledText
                        i18nText={'authen.register.selectBranchStore.currentlySelected'}
                        customStyle={styles.txtDefault}
                    />
                </>
            )}
            <InputChooseRestaurants
                chooseBranch={chooseBranch}
                route={HOME_ROUTE.CHOOSE_RESTAURANT}
                isLabel={false}
                isBtn
                customStyleContainer={styles.customStyleContainer}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flexShrink: 1,
        flexDirection: 'row',
        backgroundColor: Themes.COLORS.pastelYellow,
        alignItems: 'center',
        paddingLeft: '8@s',
        marginLeft: '10@s',
    },
    customStyleContainer: {
        marginTop: 0,
    },
    txtAddress: {
        fontWeight: 'bold',
        fontSize: '16@ms0.3',
        flexShrink: 1,
        color: Themes.COLORS.textSecondary,
    },
    txtDefault: {
        marginHorizontal: '8@s',
        color: Themes.COLORS.textSecondary,
    },
});

export default BtnChooseRestaurants;

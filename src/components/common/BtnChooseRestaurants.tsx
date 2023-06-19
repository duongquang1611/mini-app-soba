import { IRestaurants } from 'app-redux/slices/globalDataSlice';
import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import InputChooseRestaurants from 'feature/authentication/components/InputChooseRestaurants';
import { HOME_ROUTE } from 'navigation/config/routes';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface IProps {
    chooseBranch: IRestaurants;
    setChooseBranch: (value: any) => void;
    customContainerStyle?: StyleProp<ViewStyle>;
}

const BtnChooseRestaurants = (props: IProps) => {
    const { chooseBranch, setChooseBranch, customContainerStyle } = props;

    return (
        <View style={[styles.container, customContainerStyle]}>
            <StyledText originValue={chooseBranch?.name} customStyle={styles.txtAddress} numberOfLines={1} />
            <StyledText
                i18nText={'authen.register.selectBranchStore.currentlySelected'}
                customStyle={styles.txtDefault}
            />
            <InputChooseRestaurants
                chooseBranch={chooseBranch}
                setChooseBranch={setChooseBranch}
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
    },
    txtDefault: {
        marginHorizontal: '8@s',
    },
});

export default BtnChooseRestaurants;

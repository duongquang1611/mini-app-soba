import { IRestaurants } from 'app-redux/slices/globalDataSlice';
import { Themes } from 'assets/themes';
import { StyledText, StyledTouchable } from 'components/base';
import StyledInput, { LabelInput } from 'components/base/StyledInput';
import { navigate } from 'navigation/NavigationService';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

export interface IInputChooseBranch {
    chooseBranch: IRestaurants;
    setChooseBranch: (value: any) => void;
    route?: string;
    isLabel?: boolean;
    isBtn?: boolean;
    customStyleContainer?: StyleProp<ViewStyle>;
}

const InputChooseRestaurants = (props: IInputChooseBranch) => {
    const {
        chooseBranch,
        setChooseBranch,
        isLabel = true,
        isBtn = false,
        route = AUTHENTICATE_ROUTE.SELECT_BRANCH_RESTAURANT,
        customStyleContainer,
    } = props;

    const goToSelectBranch = () => {
        navigate(route, {
            chooseBranch,
            setChooseBranch,
        });
    };

    return (
        <StyledTouchable onPress={goToSelectBranch} customStyle={[styles.normalInputContainer, customStyleContainer]}>
            {isLabel && (
                <LabelInput label={'authen.register.selectBranchStore.labelBranch'} containerStyle={styles.ml20} />
            )}
            {isBtn ? (
                <View style={styles.viewBtn}>
                    <StyledText
                        i18nText={'authen.register.selectBranchStore.btnChangeBranch'}
                        customStyle={styles.txtBtn}
                    />
                </View>
            ) : (
                <StyledInput
                    value={chooseBranch?.name}
                    containerStyle={styles.containerStyleBtn}
                    pointerEvents="none"
                    customPlaceHolder="authen.register.selectBranchStore.placeHolderBranch"
                />
            )}
        </StyledTouchable>
    );
};

const styles = ScaledSheet.create({
    normalInputContainer: {
        marginTop: '13@vs',
    },
    viewBtn: {
        backgroundColor: Themes.COLORS.goldenRod,
        paddingVertical: '4@vs',
        paddingHorizontal: '11@s',
    },
    ml20: {
        marginLeft: '20@s',
    },
    containerStyleBtn: {
        marginTop: 0,
        marginBottom: 0,
        width: 'auto',
    },
    txtBtn: {
        lineHeight: '17@vs',
    },
});

export default InputChooseRestaurants;

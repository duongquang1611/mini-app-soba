import { IRestaurants } from 'app-redux/slices/globalDataSlice';
import { Themes } from 'assets/themes';
import { StyledText, StyledTouchable } from 'components/base';
import { LabelInput } from 'components/base/StyledInput';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledHeader from 'components/common/StyledHeader';
import ModalChooseRestaurants from 'feature/authentication/components/ModalChooseRestaurants';
import React, { FunctionComponent, useRef } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { ScaledSheet } from 'react-native-size-matters';

interface IProps {
    chooseBranch: IRestaurants;
    setChooseBranch: (value: any) => void;
}

const SelectBranchStoreScreen: FunctionComponent = (props: any) => {
    const { chooseBranch, setChooseBranch }: IProps = props?.route?.params;
    const modalRef = useRef<Modalize>();

    return (
        <View style={styles.container}>
            <ModalChooseRestaurants ref={modalRef} chooseBranch={chooseBranch} setChooseBranch={setChooseBranch} />
            <StyledHeader title={'authen.register.selectBranchStore.title'} />
            <StyledKeyboardAware customStyle={styles.scrollView}>
                <View style={styles.containerContent}>
                    <StyledText customStyle={styles.title} i18nText={'authen.register.selectBranchStore.description'} />
                    <LabelInput
                        label={'authen.register.selectBranchStore.labelInput'}
                        customStyle={styles.cssLabel}
                        labelRequire={'*'}
                    />
                    <View style={styles.viewInput}>
                        <StyledText
                            i18nText="authen.register.selectBranchStore.describeLabel"
                            customStyle={styles.describeLabel}
                        />
                        <StyledTouchable onPress={() => modalRef?.current?.open()}>
                            <StyledText
                                i18nText={'authen.register.selectBranchStore.descriptionInput'}
                                customStyle={styles.cssTxtInput}
                            />
                        </StyledTouchable>
                    </View>
                    <View style={styles.viewCheckSquare}>
                        <StyledText
                            i18nText="authen.register.selectBranchStore.attention.first"
                            customStyle={[styles.textBlack, { marginTop: 0, fontWeight: '700' }]}
                        />
                        <StyledText
                            i18nText="authen.register.selectBranchStore.attention.second"
                            customStyle={styles.textBlack}
                        />
                        <StyledText
                            i18nText="authen.register.selectBranchStore.attention.three"
                            customStyle={styles.textBlack}
                        />
                    </View>
                </View>
            </StyledKeyboardAware>
            <View style={styles.viewFooter} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    title: {
        fontWeight: 'bold',
        fontSize: '18@ms0.3',
        lineHeight: '26@vs',
    },
    viewInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textBlack: {
        color: Themes.COLORS.black,
        lineHeight: '20@vs',
        marginTop: '8@vs',
    },
    cssTxtInput: {
        marginLeft: '11@s',
        fontSize: '16@ms',
        fontWeight: 'bold',
        flexShrink: 1,
    },
    viewCheckSquare: {
        marginTop: '26@vs',
    },
    cssLabel: {
        marginTop: '10@vs',
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
    },
    scrollView: {
        flexGrow: 1,
        marginTop: '10@vs',
        marginBottom: '5@vs',
        backgroundColor: Themes.COLORS.white,
    },
    containerContent: {
        paddingHorizontal: '20@s',
        paddingTop: '23@vs',
    },
    viewFooter: {
        backgroundColor: Themes.COLORS.white,
        height: '34@vs',
    },
    describeLabel: {
        color: Themes.COLORS.black,
        lineHeight: '20@vs',
        fontWeight: '400',
    },
});

export default SelectBranchStoreScreen;

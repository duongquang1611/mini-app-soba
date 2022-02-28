import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledHeader from 'components/common/StyledHeader';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { MODAL_ID } from 'utilities/staticData';
import HistoryExchangeModal from './components/HistoryExchangeModal';
import ListCouponExchange from './components/ListCouponExchange';
import StampItem from './components/StampItem';

const StampNumberView = ({ title, count }: any) => {
    return (
        <View style={styles.wrapNumberView}>
            <StyledText i18nText={title} customStyle={styles.textTitleNumber} />
            <StyledText i18nText={'stampDetail.count'} i18nParams={{ count }} customStyle={styles.textCountNumber} />
        </View>
    );
};

const StampCardDetailScreen = (props: any) => {
    const modalize = ModalizeManager();
    const { item } = props?.route?.params || {};
    const [caseType, setCaseType] = useState(1);

    const changeCaseType = () => {
        setCaseType(caseType + 1 > 3 ? 1 : caseType + 1);
    };

    const showHistory = () => {
        modalize.show(
            MODAL_ID.HISTORY_STAMP,
            <HistoryExchangeModal />,
            {
                modalHeight: verticalScale(550),
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'stampDetail.historyExchange' },
        );
    };

    return (
        <>
            <StyledHeader title={'stampDetail.title'} />
            <View style={styles.container}>
                <StyledTouchable onPress={changeCaseType} customStyle={{ paddingVertical: 10, alignItems: 'center' }}>
                    <StyledText originValue={`--> Click to test change case : ${caseType} <--`} />
                </StyledTouchable>
                <ScrollView
                    contentContainerStyle={styles.contentScrollView}
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                >
                    <StampItem item={item} customStyle={styles.customItemStyle} caseType={caseType} />
                    <View style={styles.wrapContentHistory}>
                        <View style={styles.headerListContent}>
                            <StampNumberView title={'stampDetail.numberOfCollect'} count={20} />
                            <StampNumberView title={'stampDetail.numberOfUse'} count={5} />
                            <StyledTouchable onPress={showHistory} customStyle={styles.btnHistory}>
                                <StyledIcon source={Images.icons.history} size={15} />
                                <StyledText
                                    i18nText={
                                        caseType === 2 ? 'stampDetail.couponGetHistory' : 'stampDetail.historyExchange'
                                    }
                                    customStyle={styles.textHistory}
                                />
                            </StyledTouchable>
                        </View>
                        <ListCouponExchange caseType={caseType} />
                    </View>
                    <StyledText
                        originValue={
                            caseType === 2
                                ? `注意\nスタンプ対象商品設定：\n+ 山菜天ぷらかけ\n+ 山菜天ぷらもり\n+ 山菜天ぷら丼セットかけ\n+ 山菜天ぷら丼セットもり`
                                : `注意\nスタンプ対象商品設定：なし`
                        }
                        customStyle={styles.noteText}
                    />
                </ScrollView>
            </View>
        </>
    );
};

export default StampCardDetailScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.backgroundPrimary,
    },
    contentScrollView: {
        flexGrow: 1,
    },
    customItemStyle: {
        backgroundColor: Themes.COLORS.white,
        marginVertical: '10@vs',
    },
    textHistory: {
        color: Themes.COLORS.primary,
        fontWeight: 'bold',
        marginLeft: '5@s',
    },
    textTitleNumber: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
    },
    textCountNumber: {
        color: Themes.COLORS.mineShaft,
        fontSize: '18@ms0.3',
        fontWeight: 'bold',
    },
    wrapNumberView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: '10@vs',
    },
    wrapContentHistory: {
        paddingTop: '20@vs',
        backgroundColor: Themes.COLORS.white,
    },
    btnHistory: {
        flexDirection: 'row',
        marginTop: '8@vs',
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    headerListContent: {
        paddingHorizontal: '20@s',
    },
    noteText: {
        marginHorizontal: '20@s',
        marginTop: '10@vs',
        marginBottom: '30@vs',
        color: Themes.COLORS.mineShaft,
        lineHeight: '20@vs',
    },
});

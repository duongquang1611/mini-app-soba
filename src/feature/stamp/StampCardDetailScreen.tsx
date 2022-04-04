import { getDetailMemberStamp } from 'api/modules/api-app/stamp';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledHeader from 'components/common/StyledHeader';
import CouponContentView from 'feature/coupon/components/CouponContentView';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { StampCardType, StampSettingBox } from 'utilities/enumData';
import { MODAL_ID, staticValue } from 'utilities/staticData';
import HistoryExchangeModal from './components/HistoryExchangeModal';
import StampItem from './components/StampItem';
import StampTickList from './components/StampTickList';

const StampNumberView = ({ title, count }: any) => {
    return (
        <View style={styles.wrapNumberView}>
            <StyledText i18nText={title} customStyle={styles.textTitleNumber} />
            <StyledText i18nText={'stampDetail.count'} i18nParams={{ count }} customStyle={styles.textCountNumber} />
        </View>
    );
};

const createItemStampTick = (rd = Math.random()) => {
    return { id: rd, createdDate: null, couponsCumulative: [] };
};

const StampCardDetailScreen = (props: any) => {
    const modalize = ModalizeManager();
    const { item } = props?.route?.params || {};
    const [stampDetail, setStampDetail] = useState(item);
    const { stamp = {}, leftAmount = 0, totalAmount = 0 } = stampDetail;
    const {
        cardType,
        width: numCol = staticValue.DEFAULT_STAMP_TICK_COLUMN,
        boxAmount = 0,
        stampTicks = [],
        couponsExchange = [],
        settingBox,
        stampDishes = [],
    } = stamp;

    const isExchange = useMemo(() => cardType === StampCardType.EXCHANGE, [cardType]);

    const dataTicks = useMemo(() => {
        // init box amount when settingBox no limit (add 200 to max exchange amount)
        let settingInitBoxNoLimit = staticValue.NO_LIMIT_BOX;
        if (settingBox === StampSettingBox.NO_LIMIT) {
            if (couponsExchange?.length > 0 && !isExchange) {
                const indexAmounts = couponsExchange.map((item: any) => item.stampAmount);
                const maxAmount = Math.max(...indexAmounts) || 0;
                settingInitBoxNoLimit = maxAmount + staticValue.NO_LIMIT_BOX;
            }
            const modSettingInitBoxNoLimit = settingInitBoxNoLimit % numCol;
            settingInitBoxNoLimit += numCol - modSettingInitBoxNoLimit;
        }

        const newBoxAmount = settingBox === StampSettingBox.LIMIT ? boxAmount : settingInitBoxNoLimit;
        const dataListTicks = Array(newBoxAmount).fill(createItemStampTick(), 0, newBoxAmount);
        if (!isExchange) {
            couponsExchange.forEach((element: any) => {
                if (element?.stampAmount - 1 <= dataListTicks?.length) {
                    dataListTicks[element?.stampAmount - 1] = element;
                }
            });
        }
        dataListTicks.splice(0, stampTicks?.length, ...stampTicks);
        return dataListTicks;
    }, [stampTicks, boxAmount, settingBox, couponsExchange, numCol]);

    useEffect(() => {
        getDetailMemberStampData();
    }, []);

    const getDetailMemberStampData = async () => {
        try {
            const res = await getDetailMemberStamp(item.id);
            setStampDetail(res?.data);
        } catch (error) {
            console.log('getDetailMemberStampData -> error', error);
        }
    };

    const showHistory = () => {
        if (isExchange) {
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
        } else showModalGetCoupon();
    };

    const showModalGetCoupon = () => {
        modalize.show(
            MODAL_ID.GET_COUPON_STAMP,
            <CouponContentView isModal customStyle={styles.contentCoupon} data={{}} />,
            {
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'stampDetail.modalGetCoupon' },
        );
    };

    return (
        <>
            <StyledHeader title={'stampDetail.title'} />
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.contentScrollView}
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                >
                    <StampItem item={stampDetail} animation customStyle={styles.customItemStyle} />
                    <View style={styles.wrapContentHistory}>
                        <View style={styles.headerListContent}>
                            <StampNumberView title={'stampDetail.numberOfCollect'} count={totalAmount || 0} />
                            <StampNumberView
                                title={'stampDetail.numberOfUse'}
                                count={(totalAmount || 0) - (leftAmount || 0)}
                            />
                            <StyledTouchable onPress={showHistory} customStyle={styles.btnHistory}>
                                <StyledIcon source={Images.icons.history} size={15} />
                                <StyledText
                                    i18nText={
                                        isExchange ? 'stampDetail.historyExchange' : 'stampDetail.couponGetHistory'
                                    }
                                    customStyle={styles.textHistory}
                                />
                            </StyledTouchable>
                        </View>
                        <StampTickList
                            onPressItemHistory={showModalGetCoupon}
                            stampDetail={stampDetail}
                            numCol={numCol}
                            data={dataTicks}
                        />
                    </View>
                    <View style={styles.wrapNoteText}>
                        <StyledText
                            i18nText={
                                stampDishes?.length ? 'stampDetail.dishesApplyEach' : 'stampDetail.dishesApplyAll'
                            }
                            customStyle={styles.noteText}
                        />
                        {stampDishes?.map((item: any) => {
                            return (
                                <StyledText
                                    key={JSON.stringify(item)}
                                    originValue={`+ ${item?.title || ''}`}
                                    customStyle={styles.noteTextDish}
                                />
                            );
                        })}
                    </View>
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
        color: Themes.COLORS.mineShaft,
        lineHeight: '22@vs',
    },
    noteTextDish: {
        color: Themes.COLORS.mineShaft,
        lineHeight: '22@vs',
    },
    contentCoupon: {
        backgroundColor: Themes.COLORS.white,
    },
    wrapNoteText: {
        marginHorizontal: '20@s',
        marginBottom: '30@vs',
        marginTop: '20@vs',
    },
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useIsFocused } from '@react-navigation/native';
import { getDetailMemberStamp, getExchangeCouponHistory } from 'api/modules/api-app/stamp';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledHeader from 'components/common/StyledHeader';
import CouponContentStampView from 'feature/coupon/components/CouponContentStampView';
import CouponContentView from 'feature/coupon/components/CouponContentView';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { CheckDurationType, StampCardType, StampSettingBox } from 'utilities/enumData';
import { MODAL_ID, STAMP_NOTE, staticValue, tickTypeText } from 'utilities/staticData';
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
    return { id: rd, createdDate: null };
};

const StampCardDetailScreen = (props: any) => {
    const [loading, setLoading] = useState(true);
    const modalize = ModalizeManager();
    const focused = useIsFocused();
    const { item, fromNotify = false } = props?.route?.params || {};
    const [stateData, setStateData] = useState({
        stampDetail: item,
        histories: [],
    });
    const { stampDetail, histories } = stateData;
    const { stamp = {}, leftAmount = 0, totalAmount = 0, expiredAmount = 0 } = stampDetail;
    const {
        cardType,
        width: numCol = staticValue.DEFAULT_STAMP_TICK_COLUMN,
        boxAmount = 0,
        stampTicks = [],
        couponsExchange = [],
        settingBox,
        stampDishes = [],
        couponsCumulative = [],
        title: titleStamp,
        tickType = 0,
        tickDurationType,
        tickDuration = 0,
    } = stamp;

    const isExchange = useMemo(() => cardType === StampCardType.EXCHANGE, [cardType]);

    useEffect(() => {
        focused && getInitDataDetail();
    }, [focused]);

    const getInitDataDetail = async () => {
        try {
            const response = await Promise.all([getDetailMemberStamp(item.id), getExchangeCouponHistory(stamp?.id)]);
            setStateData({
                stampDetail: response?.[0]?.data,
                histories: response?.[1]?.data,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const dataTicks = useMemo(() => {
        // init box amount when settingBox no limit (add 200 to max exchange amount)
        let settingInitBoxNoLimit = staticValue.NO_LIMIT_BOX;
        if (settingBox === StampSettingBox.NO_LIMIT) {
            if (couponsCumulative?.length > 0 && !isExchange) {
                const positionsBox = couponsCumulative.map((item: any) => item.positionBox);
                const maxPosition = Math.max(...positionsBox) || 0;
                settingInitBoxNoLimit = maxPosition + staticValue.NO_LIMIT_BOX;
            }
            const modSettingInitBoxNoLimit = settingInitBoxNoLimit % numCol;
            settingInitBoxNoLimit += numCol - modSettingInitBoxNoLimit;
        }

        const newBoxAmount = settingBox === StampSettingBox.LIMIT ? boxAmount : settingInitBoxNoLimit;
        const dataListTicks = Array(newBoxAmount).fill(createItemStampTick(), 0, newBoxAmount);

        const lengthStampTick =
            settingBox === StampSettingBox.LIMIT
                ? stampTicks?.length > boxAmount
                    ? boxAmount
                    : stampTicks?.length
                : stampTicks?.length;

        const newStampTicks =
            settingBox === StampSettingBox.LIMIT
                ? stampTicks?.length > boxAmount
                    ? stampTicks?.slice(0, boxAmount)
                    : stampTicks
                : stampTicks;

        dataListTicks.splice(0, lengthStampTick, ...newStampTicks);
        if (!isExchange) {
            couponsCumulative.forEach((element: any) => {
                if (element?.positionBox - 1 <= dataListTicks?.length) {
                    dataListTicks[element?.positionBox - 1] = {
                        ...dataListTicks[element?.positionBox - 1],
                        ...element,
                    };
                }
            });
        }

        return dataListTicks;
    }, [stampTicks, boxAmount, settingBox, couponsCumulative, numCol]);

    const showHistory = () => {
        modalize.show(
            MODAL_ID.HISTORY_STAMP,
            <HistoryExchangeModal data={histories} />,
            {
                modalHeight: verticalScale(550),
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: isExchange ? 'stampDetail.historyExchange' : 'stampDetail.couponGetHistory' },
        );
    };

    const onPressItemStampTick = (positionBox: any, isOpen = false) => {
        const couponsCumulativeChoose = couponsCumulative.filter((item: any) => item?.positionBox === positionBox);
        modalize.show(
            MODAL_ID.BOX_RECEIVE_TICK,
            <CouponContentStampView
                isOpen={isOpen}
                customStyle={styles.contentCoupon}
                datas={couponsCumulativeChoose}
            />,
            {
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'stampDetail.modalGetCoupon' },
        );
    };
    const getRangeTick = () => {
        if (tickDurationType === CheckDurationType.DAY) return 'stampDetail.dayTickRange';
        if (tickDurationType === CheckDurationType.WEEK) return 'stampDetail.weekTickRange';
        if (tickDurationType === CheckDurationType.MONTH) return 'stampDetail.monthTickRange';
        return 'stampDetail.yearTickRange';
    };

    return (
        <>
            <StyledHeader title={titleStamp} />
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.contentScrollView}
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                >
                    <StampItem item={stampDetail} animation customStyle={styles.customItemStyle} />
                    <View style={styles.wrapContentHistory}>
                        <View style={styles.headerListContent}>
                            {isExchange && (
                                <>
                                    <StampNumberView title={'stampDetail.numberOfCollect'} count={totalAmount || 0} />
                                    <StampNumberView
                                        title={'stampDetail.numberOfUse'}
                                        count={(totalAmount || 0) - (leftAmount || 0) - (expiredAmount || 0)}
                                    />
                                    <StampNumberView title={'stampDetail.numberExpired'} count={expiredAmount || 0} />
                                </>
                            )}
                            <StyledTouchable
                                onPress={showHistory}
                                customStyle={[styles.btnHistory, isExchange && { marginTop: verticalScale(8) }]}
                                disabled={!histories?.length}
                            >
                                <StyledIcon source={Images.icons.history} size={15} disabled={!histories?.length} />
                                <StyledText
                                    i18nText={
                                        isExchange ? 'stampDetail.historyExchange' : 'stampDetail.couponGetHistory'
                                    }
                                    customStyle={styles.textHistory}
                                    disabled={!histories?.length}
                                />
                            </StyledTouchable>
                        </View>
                        <StampTickList
                            onPressItemStampTick={onPressItemStampTick}
                            stampDetail={stampDetail}
                            numCol={numCol}
                            data={dataTicks}
                            fromNotify={fromNotify}
                        />
                    </View>
                    <View style={styles.wrapNoteText}>
                        <StyledText i18nText={'stampDetail.note'} customStyle={styles.noteText} />
                        <StyledText
                            i18nText={'stampDetail.tickType'}
                            i18nParams={{ type: tickTypeText[tickType] }}
                            customStyle={styles.tickTypeText}
                        />
                        <StyledText
                            i18nText={
                                stampDishes?.length ? 'stampDetail.dishesApplyEach' : 'stampDetail.dishesApplyAll'
                            }
                            customStyle={styles.noteTextApply}
                        />
                        <StyledText
                            i18nParams={{ tickDuration }}
                            i18nText={getRangeTick()}
                            customStyle={styles.noteTextApply}
                        />
                        {stampDishes?.map((item: any, index: number) => {
                            return (
                                <StyledText
                                    key={index}
                                    originValue={`+ ${item?.title || ''}`}
                                    customStyle={styles.noteTextDish}
                                />
                            );
                        })}
                        <StyledText i18nText={'stamp.note'} customStyle={styles.noteStampText} />
                        {STAMP_NOTE.map((item: any, index: number) => {
                            return (
                                <View style={styles.rowStampNote} key={index}>
                                    <View style={styles.dot} />
                                    <StyledText
                                        i18nText={`${item?.content || ''}`}
                                        customStyle={styles.noteTextStamp}
                                    />
                                </View>
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
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginBottom: '20@vs',
    },
    headerListContent: {
        paddingHorizontal: '20@s',
    },
    noteText: {
        color: Themes.COLORS.mineShaft,
        lineHeight: '22@vs',
        fontWeight: '500',
    },
    noteStampText: {
        color: Themes.COLORS.mineShaft,
        marginTop: '20@vs',
        marginBottom: '5@vs',
        fontWeight: '500',
    },
    tickTypeText: {
        color: Themes.COLORS.mineShaft,
        lineHeight: '22@vs',
    },
    noteTextApply: {
        color: Themes.COLORS.mineShaft,
        lineHeight: '22@vs',
    },
    noteTextDish: {
        color: Themes.COLORS.mineShaft,
        lineHeight: '22@vs',
    },
    noteTextStamp: {
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
    rowStampNote: {
        flexDirection: 'row',
    },
    dot: {
        height: '3@s',
        width: '3@s',
        borderRadius: 10,
        backgroundColor: Themes.COLORS.mineShaft,
        marginTop: '9@ms0.3',
        marginRight: '5@s',
        marginLeft: '3@s',
    },
});

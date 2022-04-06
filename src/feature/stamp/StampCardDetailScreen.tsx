/* eslint-disable @typescript-eslint/no-unused-vars */
import { useIsFocused } from '@react-navigation/native';
import { getCouponList } from 'api/modules/api-app/coupon';
import { getDetailMemberStamp } from 'api/modules/api-app/stamp';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledHeader from 'components/common/StyledHeader';
import CouponContentStampView from 'feature/coupon/components/CouponContentStampView';
import CouponContentView from 'feature/coupon/components/CouponContentView';
import { SIZE_LIMIT } from 'hooks/usePaging';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { MemberCouponType, StampCardType, StampSettingBox } from 'utilities/enumData';
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
    return { id: rd, createdDate: null };
};

const StampCardDetailScreen = (props: any) => {
    const [loading, setLoading] = useState(true);
    const modalize = ModalizeManager();
    const focused = useIsFocused();
    const { item } = props?.route?.params || {};
    const [stateData, setStateData] = useState({
        stampDetail: item,
        histories: [],
    });
    const { stampDetail, histories } = stateData;
    const { stamp = {}, leftAmount = 0, totalAmount = 0 } = stampDetail;
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
    } = stamp;

    console.log('StampCardDetailScreen -> stampTicks', stampTicks);
    const isExchange = useMemo(() => cardType === StampCardType.EXCHANGE, [cardType]);

    useEffect(() => {
        focused && getInitDataDetail();
    }, [focused]);

    const getInitDataDetail = async () => {
        try {
            const response = await Promise.all([
                getDetailMemberStamp(item.id),
                getCouponList({ params: { take: SIZE_LIMIT, type: MemberCouponType.STAMP } }),
            ]);
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
        dataListTicks.splice(0, stampTicks?.length, ...stampTicks);
        if (!isExchange) {
            couponsCumulative.forEach((element: any) => {
                if (element?.positionBox - 1 <= dataListTicks?.length) {
                    dataListTicks[element?.positionBox - 1] = element;
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
                                        count={(totalAmount || 0) - (leftAmount || 0)}
                                    />
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

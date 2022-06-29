/* eslint-disable @typescript-eslint/no-unused-vars */
import { useIsFocused } from '@react-navigation/native';
import { getStampList, tickStamp } from 'api/modules/api-app/stamp';
import { RootState } from 'app-redux/hooks';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledList, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import { HeaderDefault } from 'components/base/modal/ModalizeManager';
import DashView from 'components/common/DashView';
import LinearView from 'components/common/LinearView';
import usePaging, { SIZE_LIMIT } from 'hooks/usePaging';
import { cloneDeep } from 'lodash';
import { STAMP_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { POPUP_TYPE, staticValue } from 'utilities/staticData';
import ChooseStampList from './components/ChooseStampList';
import StampItem from './components/StampItem';

interface StampListProps {
    canUse?: boolean;
    showEarnStamp?: any;
}

// let currentTimeRefresh = new Date();

const StampList = (props: StampListProps) => {
    const { canUse = false } = props;
    const modalizeRef = useRef<Modalize>(null);
    const isFocus = useIsFocused();
    const isFirstRender = useRef(true);
    const [chooseTickStampIds, setChooseTickStampIds] = useState({});
    const { triggerReloadStamp } = useSelector((state: RootState) => state.globalData);
    const userTicked = useMemo(() => {
        const lengthTicked = Object.values(chooseTickStampIds).filter((item: any) => Boolean(item))?.length;
        return lengthTicked || 0;
    }, [chooseTickStampIds]);

    const { pagingData, onRefresh, onLoadMore } = usePaging(
        getStampList,
        {
            status: Number(canUse),
            take: SIZE_LIMIT,
        },
        'stamps',
    );
    const { list, refreshing } = pagingData;
    const { stamps = [], untickedStamps = {} } = list;
    const { untickStampsAmount = 0, bill = [] } = untickedStamps;

    // useEffect(() => {
    //     if (triggerReloadStamp && canUse && diffTime(currentTimeRefresh, new Date()) > 2000) {
    //         currentTimeRefresh = new Date();
    //         onRefresh();
    //     }
    // }, [triggerReloadStamp]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (isFocus) {
            onRefresh();
        }
    }, [isFocus]);

    const goToDetail = (item: any) => {
        navigate(STAMP_ROUTE.STAMP_CARD_DETAIL, { item });
    };

    const renderItemStamp = ({ item }: any) => {
        return <StampItem item={item} onPress={() => goToDetail(item)} isBottomTab={true} />;
    };

    const openChooseStampTick = () => {
        modalizeRef.current?.open();
    };
    const closeChooseStampTick = () => {
        modalizeRef.current?.close();
    };

    const confirmTickStamp = async () => {
        closeChooseStampTick();
        const dataTicks: any[] = [];
        Object.entries(chooseTickStampIds).forEach(([billId, stampId]) => {
            if (!stampId) return;
            const billItem = bill.find((item: any) => item.id === Number(billId));
            const dataTick = {
                stampId,
                createdDate: billItem?.createdDate,
                stringBillId: billItem?.stringId,
            };
            dataTicks.push(dataTick);
        });
        try {
            await tickStamp({ tickStamps: dataTicks });
            setChooseTickStampIds({});
            onRefresh?.();
            AlertMessage('stamp.tickSuccess', { type: POPUP_TYPE.SUCCESS });
        } catch (error) {
            AlertMessage(error);
        }
    };

    const updateChooseIds = useCallback((id: number, billId: string) => {
        setChooseTickStampIds((prevIds: any) => {
            const newIds = cloneDeep(prevIds);
            newIds[billId] = newIds[billId] === id ? '' : id;
            return newIds;
        });
    }, []);

    return (
        <View style={styles.container}>
            <Portal>
                <Modalize
                    ref={modalizeRef}
                    withHandle={false}
                    scrollViewProps={{
                        keyboardShouldPersistTaps: 'handled',
                        contentContainerStyle: styles.contentEarnStamp,
                        nestedScrollEnabled: true,
                    }}
                    overlayStyle={styles.overlayStyle}
                    HeaderComponent={<HeaderDefault onPress={closeChooseStampTick} title={'chooseStamp.earnStamp'} />}
                    snapPoint={verticalScale(487)}
                    modalHeight={Metrics.screenHeight * staticValue.PERCENT_HEIGHT_POPUP}
                    FloatingComponent={() => (
                        <StyledButton
                            title={'chooseStamp.btn'}
                            customStyle={styles.footerButtonChooseStamp}
                            onPress={confirmTickStamp}
                            disabled={!userTicked}
                        />
                    )}
                    modalStyle={{
                        minHeight: 0,
                        backgroundColor: Themes.COLORS.white,
                    }}
                >
                    <ChooseStampList
                        data={bill}
                        chooseTickStampIds={chooseTickStampIds}
                        updateChooseIds={updateChooseIds}
                    />
                </Modalize>
            </Portal>

            {untickStampsAmount && canUse ? (
                <>
                    <StyledTouchable onPress={openChooseStampTick}>
                        <LinearView style={styles.wrapNote}>
                            <StyledIcon source={Images.icons.message} size={20} />
                            <StyledText
                                i18nText={'stamp.noteUse'}
                                i18nParams={{ count: untickStampsAmount }}
                                customStyle={styles.noteUse}
                            />
                        </LinearView>
                    </StyledTouchable>
                </>
            ) : null}
            <View style={styles.separator} />
            <StyledList
                data={stamps}
                renderItem={renderItemStamp}
                ItemSeparatorComponent={DashView}
                ListFooterComponent={DashView}
                customStyle={styles.listStamp}
                refreshing={refreshing}
                onRefresh={onRefresh}
                noDataText={'stamp.noData'}
                onEndReached={onLoadMore}
                removeClippedSubviews={true}
            />
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    noteUse: {
        color: Themes.COLORS.lightGray,
        marginLeft: '11@s',
        lineHeight: '20@vs',
    },
    wrapNote: {
        flexDirection: 'row',
        paddingVertical: '6@vs',
        alignItems: 'center',
        paddingHorizontal: '42@s',
    },
    listStamp: {
        backgroundColor: Themes.COLORS.white,
        flexGrow: 1,
        paddingBottom: '20@vs',
    },
    overlayStyle: {
        backgroundColor: Themes.COLORS.overlayModalize,
    },
    contentEarnStamp: {
        flexGrow: 1,
        paddingBottom: '90@vs',
    },
    footerButtonChooseStamp: {
        position: 'absolute',
        right: '20@s',
        bottom: '25@vs',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    separator: {
        height: '5@vs',
        backgroundColor: Themes.COLORS.lightGray,
    },
});
export default StampList;

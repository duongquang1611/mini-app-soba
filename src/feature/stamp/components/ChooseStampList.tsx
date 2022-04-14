/* eslint-disable @typescript-eslint/no-unused-vars */
import { Themes } from 'assets/themes';
import { StyledImage, StyledList, StyledText, StyledTouchable } from 'components/base';
import DashView from 'components/common/DashView';
import RadioCheckView from 'components/common/RadioCheckView';
import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { StampSettingBox } from 'utilities/enumData';

const ItemChooseStamp = memo(({ item, onPress, check, billId, chooseTickStampIds }: any) => {
    const { totalAmount, stamp = {} } = item;
    const { title, image, id, settingBox, boxAmount } = stamp;
    const currentAmountChoose = useMemo(() => {
        const allChooseIds = Object.values(chooseTickStampIds).flat();
        return allChooseIds?.filter((item: any) => item === id)?.length || 0;
    }, [id, chooseTickStampIds]);
    const disabled = useMemo(
        () => (settingBox === StampSettingBox.LIMIT ? totalAmount + currentAmountChoose >= boxAmount && !check : false),
        [settingBox, totalAmount, currentAmountChoose, boxAmount, check],
    );

    return (
        <StyledTouchable
            customStyle={styles.itemContainer}
            onPress={() => {
                onPress(id, billId);
            }}
            disabled={disabled}
        >
            <View style={styles.itemContent}>
                <StyledImage source={{ uri: image }} customStyle={styles.imgItem} resizeMode={'cover'} />
                <View style={styles.wrapTextStamp}>
                    <StyledText originValue={title} customStyle={styles.textName} disabled={disabled} />
                    {settingBox === StampSettingBox.LIMIT && (
                        <StyledText
                            i18nText={'chooseStamp.tickedNote'}
                            i18nParams={{ ticked: totalAmount + currentAmountChoose || 0, total: boxAmount || 0 }}
                            customStyle={styles.textTicked}
                            disabled={disabled}
                        />
                    )}
                </View>
            </View>
            <RadioCheckView check={check} />
        </StyledTouchable>
    );
});

const ChooseStampList = ({ data, chooseTickStampIds, updateChooseIds }: any) => {
    const userTicked = useMemo(() => {
        const lengthTicked = Object.values(chooseTickStampIds).filter((item: any) => Boolean(item))?.length;
        return lengthTicked || 0;
    }, [chooseTickStampIds]);

    const renderItemMemberStamp = (itemMemberStamp: any, billId: string) => {
        return (
            <ItemChooseStamp
                item={itemMemberStamp}
                check={chooseTickStampIds?.[`${billId}`] === itemMemberStamp?.stamp?.id}
                onPress={updateChooseIds}
                key={itemMemberStamp?.id}
                billId={billId}
                chooseTickStampIds={chooseTickStampIds}
            />
        );
    };

    const renderBlockOrder = ({ item }: any) => {
        const { memberStamps = [], stringId = '', id: billId, createdDate } = item;
        return (
            <View key={`${createdDate}-${billId}`}>
                <StyledText i18nText={'chooseStamp.orderId'} i18nParams={{ stringId }} customStyle={styles.textOrder} />
                <StyledText i18nText={'chooseStamp.pleaseChoose'} customStyle={styles.textPlsChoose} />
                {memberStamps.map((itemMemberStamp: any) => renderItemMemberStamp(itemMemberStamp, `${billId}`))}
                <DashView customStyle={styles.dashView} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {data?.length > 1 && (
                <StyledText
                    i18nText={'chooseStamp.tickStampNote'}
                    i18nParams={{ ticked: userTicked, total: data?.length }}
                    customStyle={styles.textNoteCurrentChoose}
                />
            )}
            <StyledList
                data={data}
                renderItem={renderBlockOrder}
                style={styles.listChoose}
                removeClippedSubviews={true}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '20@s',
    },
    btnYes: {
        marginBottom: '25@vs',
        alignSelf: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '15@vs',
    },
    separator: {
        height: '15@vs',
    },
    imgItem: {
        width: '60@s',
        height: '60@s',
        borderRadius: 1,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    textName: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        marginLeft: '10@s',
    },
    textTicked: {
        marginLeft: '10@s',
        marginTop: '5@s',
        fontSize: '12@ms0.3',
    },
    listChoose: {},
    textOrder: {
        fontSize: '18@ms0.3',
        fontWeight: 'bold',
        marginTop: '20@vs',
    },
    textPlsChoose: {
        fontSize: '16@ms0.3',
        color: Themes.COLORS.primary,
        marginVertical: '15@vs',
        fontWeight: 'bold',
    },
    footerButtonChooseStamp: {
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    textNoteCurrentChoose: {
        fontSize: '16@ms0.3',
        color: Themes.COLORS.primary,
        marginVertical: '15@vs',
        fontWeight: 'bold',
    },
    wrapTextStamp: {
        flexShrink: 1,
        marginRight: '10@s',
    },
    dashView: {
        alignSelf: 'center',
    },
});

export default memo(ChooseStampList);

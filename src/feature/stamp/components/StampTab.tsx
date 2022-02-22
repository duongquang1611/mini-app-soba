import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledList, StyledText } from 'components/base';
import DashView from 'components/common/DashView';
import LinearView from 'components/common/LinearView';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { STAMP_DATA } from 'utilities/staticData';
import StampItem from './StampItem';

interface StampTabProps {
    canUse?: boolean;
}
const goToDetail = () => {
    navigate(TAB_NAVIGATION_ROOT.STAMP_ROUTE.CARD_DETAIL);
};

const StampTab = (props: StampTabProps) => {
    const { canUse = false } = props;

    const renderItemStamp = ({ item }: any) => {
        return <StampItem item={item} onPress={goToDetail} />;
    };
    return (
        <View style={styles.container}>
            {canUse ? (
                <>
                    <LinearView style={styles.wrapNote}>
                        <StyledIcon source={Images.icons.message} size={20} />
                        <StyledText i18nText={'stamp.noteUse'} customStyle={styles.noteUse} />
                    </LinearView>
                </>
            ) : null}
            {/* <StyledButton title={'detail stamp'} onPress={goToDetail} outline /> */}
            {/* {canUse ? <StyledText originValue={'can use'} /> : <StyledText originValue={'used'} />} */}
            <StyledList
                data={STAMP_DATA.filter((item: any) => item.used === !canUse)}
                renderItem={renderItemStamp}
                ItemSeparatorComponent={DashView}
                customStyle={styles.listStamp}
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
        paddingVertical: '4@vs',
        alignItems: 'center',
        paddingHorizontal: '42@s',
    },
    listStamp: {
        marginTop: '5@vs',
        backgroundColor: Themes.COLORS.white,
        flexGrow: 1,
    },
});
export default StampTab;

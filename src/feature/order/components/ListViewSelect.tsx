import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import LinearView from 'components/common/LinearView';
import React, { memo, useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { moderateScale, scale, ScaledSheet } from 'react-native-size-matters';
import { LINEAR_COLOR } from 'utilities/staticData';

interface ListViewSelectProps {
    data: any[];
    category?: any;
    recommendSelected?: any;
    onPressCategory?: any;
    isCategory?: boolean;
}
const CategoryItems = (item: any) => {
    const { id, title } = item?.item;
    return (
        <LinearView
            style={[styles.linear, { borderWidth: item.category === id ? 0 : 1 }]}
            colors={item.category === id ? LINEAR_COLOR.CATEGORY : LINEAR_COLOR.NO_CHOOSE_CATEGORY}
        >
            <StyledTouchable
                customStyle={[styles.tabCategoryHeader]}
                disabled={item.category === id}
                activeOpacity={0.7}
                onPress={() => {
                    item?.onPressCategory(item?.item);
                }}
            >
                <StyledText
                    customStyle={{
                        color: item.category === id ? Themes.COLORS.white : Themes.COLORS.primary,
                        fontWeight: item.category === id ? 'bold' : '400',
                    }}
                    originValue={title}
                />
            </StyledTouchable>
        </LinearView>
    );
};
const RecommendedItems = (item: any) => {
    const { id, title } = item?.item;
    const { recommendSelected, onPressRecommend } = item;
    return (
        <StyledTouchable
            customStyle={[
                styles.tabRecommendHeader,
                {
                    backgroundColor: recommendSelected === id ? Themes.COLORS.secondary : Themes.COLORS.white,
                },
            ]}
            disabled={recommendSelected === id}
            activeOpacity={0.7}
            onPress={() => {
                onPressRecommend(item?.item);
            }}
        >
            <StyledText
                customStyle={{
                    color: recommendSelected === id ? Themes.COLORS.white : Themes.COLORS.secondary,
                    fontWeight: recommendSelected === id ? 'bold' : '400',
                }}
                originValue={title}
            />
        </StyledTouchable>
    );
};
const ListViewSelect = (props: ListViewSelectProps) => {
    const { data, category, onPressCategory, isCategory, recommendSelected } = props;
    const startItem = data[0]?.title || '';
    const endItem = data[data.length - 1]?.category || data[data.length - 1]?.name || '';
    const startWidth = startItem.length * moderateScale(14) + scale(20);
    const endWidth = endItem.length * moderateScale(14) + scale(35);

    const listCategoryRef = useRef<any>(null);
    const [showIconLeft, setShowIconLeft] = useState<boolean>(false);
    const [showIconRight, setShowIconRight] = useState<boolean>(props.data.length > 3);
    const scrollTop = () => {
        listCategoryRef?.current?.scrollTo({
            animated: true,
            index: 0,
            viewPosition: 0,
        });
    };

    useEffect(() => {
        if (!isCategory) {
            scrollTop();
            setShowIconLeft(false);
            props.data.length < 3 && setShowIconRight(false);
        }
    }, [category]);
    return (
        <View style={styles.categoryContainer}>
            {data.length > 0 ? (
                <View style={styles.row}>
                    {showIconLeft ? (
                        <View style={[styles.buttonCategory, styles.buttonPre]}>
                            <StyledIcon
                                source={Images.icons.arrowNext}
                                size={10}
                                customStyle={{
                                    tintColor: isCategory ? Themes.COLORS.primary : Themes.COLORS.secondary,
                                }}
                            />
                        </View>
                    ) : (
                        <View style={styles.buttonCategory} />
                    )}

                    <ScrollView
                        ref={listCategoryRef}
                        style={styles.container}
                        horizontal={true}
                        decelerationRate={'fast'}
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        onScroll={(e: any) => {
                            const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
                            if (contentOffset.x >= startWidth) {
                                setShowIconLeft(true);
                            } else {
                                setShowIconLeft(false);
                            }

                            if (contentOffset.x < contentSize.width - layoutMeasurement.width - endWidth) {
                                setShowIconRight(true);
                            } else {
                                setShowIconRight(false);
                            }
                        }}
                    >
                        {data.map((item, index) => (
                            <View key={index}>
                                {isCategory ? (
                                    <CategoryItems
                                        setShowIconRight={setShowIconRight}
                                        onPressCategory={onPressCategory}
                                        item={item}
                                        category={category}
                                    />
                                ) : (
                                    <RecommendedItems
                                        onPressRecommend={onPressCategory}
                                        item={item}
                                        recommendSelected={recommendSelected}
                                        setShowIconRight={setShowIconRight}
                                    />
                                )}
                            </View>
                        ))}
                    </ScrollView>
                    {showIconRight ? (
                        <View style={styles.buttonCategory}>
                            <StyledIcon
                                source={Images.icons.arrowNext}
                                size={10}
                                customStyle={{
                                    tintColor: isCategory ? Themes.COLORS.primary : Themes.COLORS.secondary,
                                }}
                            />
                        </View>
                    ) : (
                        <View style={styles.buttonCategory} />
                    )}
                </View>
            ) : null}
        </View>
    );
};

const styles = ScaledSheet.create({
    categoryContainer: {},
    recommendContainer: {
        backgroundColor: Themes.COLORS.white,
        marginTop: '-5@vs',
    },
    container: {
        flex: 1,
    },
    buttonCategory: {
        width: '20@s',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonPre: {
        transform: [{ rotate: '180deg' }],
    },
    linear: {
        paddingVertical: '8@vs',
        borderRadius: 5,
        marginRight: '15@s',
        borderColor: Themes.COLORS.primary,
    },
    tabCategoryHeader: {
        alignItems: 'center',
        paddingHorizontal: '10@s',
    },
    tabRecommendHeader: {
        alignItems: 'center',
        marginRight: '10@s',
        padding: '10@vs',
        paddingVertical: '8@vs',
        borderWidth: 1,
        borderColor: Themes.COLORS.secondary,
        borderRadius: 50,
        marginVertical: '10@vs',
    },
});

export default memo(ListViewSelect);

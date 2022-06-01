import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const GuideStamp = ({ content, customStyle, customTextStyle }: any) => {
    return (
        <View style={[styles.container, customStyle]}>
            <StyledText
                originValue={`${content}～会員証について～
                券売機にかざしてから発券する事で、お得なクーポンが手に入るスタンプを獲得する事ができるQRコードです。
                いつもの！注文 設定していない場合は、ホーム画面に自動的に表示されます。
                ～会員証について～
                券売機にかざしてから発券する事で、お得なクーポンが手に入るスタンプを獲得する事ができるQRコードです。
                いつもの！注文 設定していない場合は、ホーム画面に自動的に表示されます。
                ～会員証について～
                券売機にかざしてから発券する事で、お得なクーポンが手に入るスタンプを獲得する事ができるQRコードです。
                券売機にかざしてから発券する事で、お得なクーポンが手に入るスタンプを獲得する事ができるQRコードです。
                いつもの！注文 設定していない場合は、ホーム画面に自動的に表示されます。
                ～会員証について～
                券売機にかざしてから発券する事で、お得なクーポンが手に入るスタンプを獲得する事ができるQRコードです。
                いつもの！注文 設定していない場合は、ホーム画面に自動的に表示されます。
                ～会員証について～
                券売機にかざしてから発券する事で、お得なクーポンが手に入るスタンプを獲得する事ができるQRコードです。
                券売機にかざしてから発券する事で、お得なクーポンが手に入るスタンプを獲得する事ができるQRコードです。
                いつもの！注文 設定していない場合は、ホーム画面に自動的に表示されます。
                ～会員証について～
                券売機にかざしてから発券する事で、お得なクーポンが手に入るスタンプを獲得する事ができるQRコードです。
                いつもの！注文 設定していない場合は、ホーム画面に自動的に表示されます。
                ～会員証について～
                券売機にかざしてから発券する事で、お得なクーポンが手に入るスタンプを獲得する事ができるQRコードです。
                `}
                customStyle={[styles.textGuide, customTextStyle]}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        paddingVertical: '20@vs',
        paddingHorizontal: '20@s',
    },
    textGuide: {
        color: Themes.COLORS.mineShaft,
    },
});

export default GuideStamp;

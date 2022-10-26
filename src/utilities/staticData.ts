import { COUPON_URL } from 'api/urls';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import CryptoJS from 'crypto-js';
import { HOME_ROUTE, ORDER_ROUTE } from 'navigation/config/routes';
import { Platform } from 'react-native';

export const staticValue = {
    DEFAULT: 1,
    TIME_IMAGE_LOAD: 500,
    DEFAULT_HIT_SLOP: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
    },
    COLUMNS_STAMP_TICK: [3, 5, 7],
    THROTTLE_TIME: 500,
    CONFIG_THROTTLE: { trailing: false },
    ANIMATION_ITEM: {
        0: { opacity: 0, translateY: -100, scale: 0.2 },
        1: { opacity: 1, translateY: 0, scale: 1 },
    },
    AWS_DOMAIN: 'https://soba-prod.s3.amazonaws.com/',
    ACTION_WHENS_SET_VALUE: {
        shouldValidate: true,
        shouldDirty: true,
    },
    OTP_LENGTH: 6,
    COUNT_DOWN_OTP: 60,
    MAX_RETRY_OTP: 5,
    MAX_WRONG_OTP: 5,
    OTP_INVALID_MESSAGE: '認証コードが正しくありません.',
    MAX_ORDER: 10,
    NUMBER_ITEM_LIST_COUPON_MODAL: 3,
    QR_SIZE: 163,
    QR_SIZE_HOME: 110,
    END_CODE_QR: 'EOS',
    orderDetail: [
        {
            name: 'A',
            subIDs: ['A1', 'A2'],
        },
        {
            name: 'A',
            subIDs: ['A1', 'A2'],
        },
    ],
    DEFAULT_STAMP_TICK_COLUMN: 5,
    NO_LIMIT_BOX: 200,
    PERCENT_HEIGHT_POPUP: 0.8,
    DELAY_LONG_PRESS: Platform.OS === 'ios' ? 400 : 350,
    ENCRYPT_KEY: '@Soba$',
    TIMEOUT_CODEPUSH: 6000,
};

export const STORE_URL = Platform.select({
    ios: 'https://apps.apple.com/us/app/%E3%82%A2%E3%83%97%E3%83%AAde%E5%B0%8F%E8%AB%B8%E3%81%9D%E3%81%B0/id1621435295',
    android: 'https://play.google.com/store/apps/details?id=jp.co.mitsuwa.komoro.android',
});

export const VERSION_APP_KEY = ['IOS_VERSION', 'ANDROID_VERSION'];

export const LINEAR_COLOR = {
    CATEGORY: [Themes.COLORS.thunderbird, Themes.COLORS.primary],
    NO_CHOOSE_CATEGORY: [Themes.COLORS.white, Themes.COLORS.white],
};

export const IMG_URL = {
    IMG_1: 'https://kenh14cdn.com/203336854389633024/2021/9/1/photo-1-16304832141231584345047.jpg',
    IMG_2: 'https://static.b52.club/uploads/2020/10/melody-marks-la-ai.jpg',
    IMG_3: 'https://35express.org/wp-content/uploads/2021/10/tran-huyen-chau-la-ai-1-35express.jpg',
    IMG_4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvnt4b7WMOOiL1v6kiI2u8viuv7UTByHRz4A&usqp=CAU',
};

export const ERRORS = {
    default: 'common.error.unknown',
    network: 'common.error.network',
};

export const dataPicker = [
    'label1',
    'label2',
    'label3',
    'label4',
    'label5',
    'label6',
    'label7',
    'label8',
    'label9',
    'label10',
];
export const apiLocal = [
    { url: 'common/menu', key: 'menu' },
    { url: 'profile/info', key: 'info' },
    { url: COUPON_URL.list, key: 'listCoupon' },
];

export const dataFakeOderDefault = [
    {
        id: 1,
        name: 'name',
        dishes: [
            { name: 'mon 1', id: 1, choose: true },
            { name: 'mon 1', id: 2, choose: true },
            { name: 'mon 1', id: 3, choose: true },
        ],
    },
    {
        id: 2,
        name: 'name',
        dishes: [
            { name: 'mon 1', id: 1, choose: true },
            { name: 'mon 1', id: 2, choose: true },
        ],
    },
];
const exImageBanner =
    'https://aos-app-order-soba-8e35e74.s3-ap-southeast-1.amazonaws.com/2399c0cd-8544-43d5-b5d0-ab1fd51041a5-1648112724452-4a47a0db6e60853dedfcfdf08a5ca249.png';
export const exLinkImage =
    'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg';
export const exLinkImageSquare =
    'https://kenh14cdn.com/203336854389633024/2021/9/1/photo-1-16304832141231584345047.jpg';

export const imagesList: any = [exImageBanner, exImageBanner];

export const netWorkList: any = [
    {
        id: 1,
        name: 'Instagram',
        img: Images.icons.instagram,
    },
    {
        id: 2,
        name: 'facebook',
        img: Images.icons.facebook,
    },
    {
        id: 3,
        name: 'line',
        img: Images.icons.line,
    },
    {
        id: 4,
        name: 'facebook',
        img: Images.icons.facebook,
    },
];
export const listNews = [
    {
        id: 1,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4km6pqiEE1QzzbLxzOOeHSqawgslw-wX5Q&usqp=CAU',
        content: 'text content',
        time: '2021年11月2日　',
        name: 'さくらえび',
    },
    {
        id: 2,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4km6pqiEE1QzzbLxzOOeHSqawgslw-wX5Q&usqp=CAU',
        content: 'text content',
        time: '2021年11月2日　',
        name: 'さくらえび',
    },
    {
        id: 3,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4km6pqiEE1QzzbLxzOOeHSqawgslw-wX5Q&usqp=CAU',
        content: 'text content',
        time: '2021年11月2日　',
        name: 'さくらえび',
    },
];

export const listOrderDefault = [
    {
        id: 1,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4km6pqiEE1QzzbLxzOOeHSqawgslw-wX5Q&usqp=CAU',
        listAdd: [
            { id: 1, name: 'いか天', price: 500 },
            { id: 2, name: 'いか天', price: 500, num: 2 },
        ],
        name: 'さくらえび',
        quantity: 1,
    },
    {
        id: 2,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4km6pqiEE1QzzbLxzOOeHSqawgslw-wX5Q&usqp=CAU',
        listAdd: [
            { id: 1, name: 'いか天', price: 500 },
            { id: 2, name: 'いか天', price: 500 },
        ],
        name: 'さくらえび',
        quantity: 1,
    },
];

export const coupon = [
    { id: 1, name: '80％割引' },
    { id: 2, name: '新年会クーポン' },
    { id: 3, name: '新年会クーポン' },
];

export const listButton = [
    {
        id: 1,
        name: '注文履歴',
        img: Images.icons.history_order,
        key: 'history',
    },
    {
        id: 2,
        name: 'いつもの！選択',
        img: Images.icons.cart,
        key: 'orderDefault',
    },
    {
        id: 3,
        name: '通知設定',
        img: Images.icons.setting,
        key: 'notification',
    },
    {
        id: 4,
        name: 'お問い合わせ',
        img: Images.icons.contact,
        key: 'contact',
    },
    {
        id: 5,
        name: 'ポリシー',
        img: Images.icons.document_text,
        key: 'policy',
    },
    {
        id: 6,
        name: 'ログアウト',
        img: Images.icons.logout,
        key: 'logOut',
    },
];
export const orderHistoryListFake = [
    {
        id: 1,
        name: '2商品：そば、ごはん',
        time: '2021年11月6日　5時36分',
        price: '￥1,000',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4km6pqiEE1QzzbLxzOOeHSqawgslw-wX5Q&usqp=CAU',
    },
    {
        id: 2,
        name: '2商品：そば、ごはん',
        time: '2021年11月6日　5時36分',
        price: '￥1,000',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4km6pqiEE1QzzbLxzOOeHSqawgslw-wX5Q&usqp=CAU',
    },
    {
        id: 3,
        name: '2商品：そば、ごはん',
        time: '2021年11月6日　5時36分',
        price: '￥1,000',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4km6pqiEE1QzzbLxzOOeHSqawgslw-wX5Q&usqp=CAU',
    },
    {
        id: 4,
        name: '2商品：そば、ごはん',
        time: '2021年11月6日　5時36分',
        price: '￥1,000',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4km6pqiEE1QzzbLxzOOeHSqawgslw-wX5Q&usqp=CAU',
    },
];

// id to show modal avoid duplicate id
export const MODAL_ID = {
    CHOOSE_STAMP: 50,
    GUIDE_STAMP: 51,
    HISTORY_STAMP: 52,
    GET_COUPON_STAMP: 53,
    CONFIRM: 54,
    SUCCESS: 55,
    ERROR: 56,
    APPLY_COUPON: 57,
    ORDER_GUIDE: 58,
    LIST_COUPON: 59,
    IMG_PICKER: 60,
    DETAIL_MENU: 61,
    BOX_RECEIVE_TICK: 62,
    CHECK_IN_GUIDE: 63,
};

export const INFORMATION = [
    { title: 'メールアドレス', icon: Images.icons.email, value: 'soba@gmail.com' },
    { title: '名前', icon: Images.icons.userName, value: '田中　英雄（タナカ　ヒデオ）' },
    { title: '生年月日', icon: Images.icons.birthday, value: '2021年3月4日' },
    { title: '性別', icon: Images.icons.gender, value: '男' },
];

export const listImage = [
    {
        id: 1,
        title: 'きつね',
        status: 0,
        description: 'string',
        category: [
            {
                categoryId: 1,
            },
            {
                categoryId: 2,
            },
            {
                categoryId: 3,
            },
            {
                categoryId: 4,
            },
            {
                categoryId: 5,
            },
            {
                categoryId: 6,
            },
        ],

        subCategory: [
            {
                subCategoryId: 1,
            },
            {
                subCategoryId: 2,
            },
            {
                subCategoryId: 3,
            },
            {
                subCategoryId: 4,
            },
            {
                subCategoryId: 5,
            },
            {
                subCategoryId: 6,
            },
        ],
        thumbnail:
            'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 2,
        title: 'きつね',
        status: 0,
        description: 'string',
        category: [
            {
                categoryId: 1,
            },
            {
                categoryId: 2,
            },
            {
                categoryId: 5,
            },
            {
                categoryId: 6,
            },
        ],

        subCategory: [
            {
                subCategoryId: 1,
            },
            {
                subCategoryId: 4,
            },
            {
                subCategoryId: 5,
            },
            {
                subCategoryId: 6,
            },
        ],
        thumbnail:
            'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 3,
        title: 'きつね',
        status: 0,
        description: 'string',
        category: [
            {
                categoryId: 1,
            },
            {
                categoryId: 2,
            },
            {
                categoryId: 3,
            },
            {
                categoryId: 4,
            },
            {
                categoryId: 5,
            },
            {
                categoryId: 6,
            },
        ],

        subCategory: [
            {
                subCategoryId: 1,
            },
            {
                subCategoryId: 2,
            },
            {
                subCategoryId: 3,
            },
            {
                subCategoryId: 4,
            },
            {
                subCategoryId: 5,
            },
        ],
        thumbnail:
            'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 4,
        title: 'きつね',
        status: 0,
        description: 'string',
        category: [
            {
                categoryId: 1,
            },
            {
                categoryId: 2,
            },
            {
                categoryId: 5,
            },
            {
                categoryId: 6,
            },
        ],

        subCategory: [
            {
                subCategoryId: 3,
            },
            {
                subCategoryId: 4,
            },
            {
                subCategoryId: 5,
            },
            {
                subCategoryId: 6,
            },
        ],
        thumbnail:
            'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 5,
        title: 'きつね',
        status: 0,
        category: [
            {
                categoryId: 1,
            },
            {
                categoryId: 2,
            },
            {
                categoryId: 3,
            },
            {
                categoryId: 5,
            },
            {
                categoryId: 6,
            },
        ],

        subCategory: [
            {
                subCategoryId: 1,
            },
            {
                subCategoryId: 2,
            },
            {
                subCategoryId: 3,
            },
            {
                subCategoryId: 4,
            },
            {
                subCategoryId: 6,
            },
        ],
        description: 'string',
        thumbnail:
            'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 6,
        title: 'きつね',
        status: 0,
        description: 'string',
        category: [
            {
                categoryId: 1,
            },
            {
                categoryId: 2,
            },
            {
                categoryId: 3,
            },
        ],

        subCategory: [
            {
                subCategoryId: 1,
            },
            {
                subCategoryId: 6,
            },
        ],
        thumbnail:
            'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 7,
        title: 'きつね',
        status: 0,
        category: [
            {
                categoryId: 1,
            },
            {
                categoryId: 2,
            },
            {
                categoryId: 3,
            },
            {
                categoryId: 4,
            },
            {
                categoryId: 5,
            },
            {
                categoryId: 6,
            },
        ],

        subCategory: [
            {
                subCategoryId: 1,
            },
            {
                subCategoryId: 2,
            },
            {
                subCategoryId: 3,
            },
            {
                subCategoryId: 4,
            },
            {
                subCategoryId: 5,
            },
            {
                subCategoryId: 6,
            },
        ],
        description: 'string',
        thumbnail:
            'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
];
export const defaultRankColor = [Themes.COLORS.white, Themes.COLORS.white];
export const statusUser = [
    {
        colors: ['#A46628', '#D7995B'],
        background: '#CE9E6D',
        crownColor: 'rgba(144, 89, 35, 1)',
    },
    {
        colors: ['#CCCCCC', '#F2F2F2'],
        background: '#F2F2F2',
        crownColor: 'rgba(196, 196, 196, 1)',
    },
    {
        colors: ['#F8D156', '#FEECD2'],
        background: '#FEECD2',
        crownColor: 'rgba(249, 197, 33, 1)',
    },
    {
        colors: ['#A4F4F9', '#7B68EE'],
        background: '#DCFDFF',
        crownColor: 'rgba(172, 229, 238, 1)',
    },
];

// type of 3 popup in app
export enum POPUP_TYPE {
    CONFIRM,
    SUCCESS,
    ERROR,
}
export const stepGuide = [
    {
        index: 1,
        name: '手順 1：',
        contentName: 'アプリ使用可能店 に行く',
        content: '使用可能な店舗は随時追加 します。\n※2022/07時点、\n使用可能な店舗は「兜町店」のみです。',
        icon: Images.icons.step1,
        // textLink: 'こちら',
        link: 'https://www.facebook.com/',
    },
    {
        index: 2,
        name: '手順 2：',
        contentName: 'アプリのQRコード画面を開く',
        content: ' ホーム画面にあるQRコードもしくは注文画面からQRコードを発行しスマートフォンに表示します。',
        icon: Images.icons.step2,
    },
    {
        index: 3,
        name: '手順 3：',
        contentName: '券売機にかざす',
        content:
            '券売機のQR読取部分にスマートフォンをかざします。\n※使用可能な券売機は、下記の写真の読取部分がついています。',
        icon: Images.icons.step3,
    },
];

export const guideStamp = [
    {
        id: 1,
        name: '手順 1：',
        content: 'アプリ対応の店舗に行く',
        // textLink: 'こちら',
        link: 'https://www.facebook.com/',
        icLine: Images.icons.lineStampFirst,
        lineSize: 30,
    },
    {
        id: 2,
        name: '手順 2：',
        content: '券売機にQRコード（いつもの！／事前選択／会員証のいずれか）をかざしてログイン',
        icLine: Images.icons.lineStampSecond,
        lineSize: 50,
    },
    {
        id: 3,
        name: '手順 3：',
        content: '券売機で発券するとスタンプGET！',
        subContent:
            '※スタンプがGETできる対象商品が設定されている場合がございます。\n対象商品一覧は、各スタンプカード詳細の下部に表示されております。',
    },
];

export const guideStampType = [
    {
        id: 1,
        name: '累計型スタンプカード：',
        content: '決められたスタンプ数を集めると、自動的にクーポンがGETできるカードです。',
    },
    {
        id: 2,
        name: '交換型スタンプカード：',
        content:
            '集めたスタンプを使って、クーポンと交換する事ができるカードです。\n交換に必要なスタンプ数は、各カード・クーポン毎に異なります。',
    },
];

export const orderGuide = {
    content:
        '～会員証について～\n券売機にかざしてから発券する事で、お得なクーポンが手に入るスタンプを獲得する事ができるQRコードです。\nいつもの！選択 設定していない場合は、ホーム画面に自動的に表示されます。',
    header: '～使用方法～',
    steps: [
        {
            index: 1,
            content: '券売機に会員証をかざす',
            icon: Images.icons.step3,
        },
        {
            index: 2,
            content: '券売機で商品を選択し、発券する',
            icon: Images.icons.step1,
        },
        {
            index: 3,
            content: 'スタンプGET\nスタンプカードの詳しい使い方については',
            icon: Images.icons.step2,
            textLink: 'こちら',
            link: 'https://www.facebook.com/',
        },
    ],
};

export const FAKER = {};

// type in api request verify code
export enum VerifiedCodeType {
    REGISTER = 1,
    RESET_PASSWORD = 2,
    CHANGE_PASSWORD = 3,
}

// gender in register, profile
export enum Gender {
    MALE = 1,
    FEMALE = 2,
}

export const GENDER_DATA = [
    { id: Gender.MALE, title: '男性', value: `${Gender.MALE}` },
    { id: Gender.FEMALE, title: '女性', value: `${Gender.FEMALE}` },
];

export const OPTION_SELECT_IMAGE = [
    {
        id: 2,
        icon: Images.icons.arrowLeftPrimary,
        name: 'common.optionCamera',
    },
    {
        id: 1,
        icon: Images.icons.arrowLeftPrimary,
        name: 'common.optionFolder',
    },
];

export const TEXT_OTP = [
    {
        id: VerifiedCodeType.REGISTER,
        title: 'otp.register.title',
        titleInputOtp: 'otp.register.titleInputOtp',
        note: 'otp.register.note',
        confirm: 'common.next',
    },
    {
        id: VerifiedCodeType.RESET_PASSWORD,
        title: 'otp.resetPassword.title',
        titleInputOtp: 'otp.resetPassword.titleInputOtp',
        note: 'otp.resetPassword.note',
        confirm: 'common.next',
    },
    {
        id: VerifiedCodeType.CHANGE_PASSWORD,
        title: 'otp.changePass.title',
        titleInputOtp: 'otp.changePass.titleInputOtp',
        note: 'otp.changePass.note',
        confirm: 'common.next',
    },
];

// type 2 tab in coupon bottom tab
export enum TabCouponStatus {
    USED = 0,
    CAN_USE = 1,
}

export const CouponStoreKeyByStatus = ['couponsUsed', 'couponsCanUse'];

// coupon.dateType
export enum DateType {
    EXPIRED_DATE = 1,
    NO_EXPIRED_DATE = 2,
    EXPIRED_FROM_RECEIVED = 3,
}

// coupon.discountType
export enum DiscountType {
    ALL_ORDER = 1,
    EACH_DISH = 2,
}

export enum MenuType {
    ENABLE = 1,
    DISABLE = 0,
}

// orderType: api /order/save-order-options
export enum OrderType {
    DEFAULT_SETTING = 1,
    MOBILE = 2,
    DEFAULT_HOME = 3,
}

export enum OrderTypeMenu {
    CART_ORDER = 0,
    DEFAULT_ORDER = 1,
    MOBILE_ORDER = 2,
    DEFAULT_ORDER_LOCAL = 3,
}

export const QR_TAB_DATA = [
    {
        textButton: 'qrHome.default.button',
        textButtonNoEdit: 'qrHome.default.buttonNoEdit',
        textButtonEdited: 'qrHome.default.buttonEdited',
        background: Themes.COLORS.secondary,
        navigateScreen: ORDER_ROUTE.ORDER_QR_CODE,
        orderType: OrderTypeMenu.DEFAULT_ORDER_LOCAL,
        content1: 'qrHome.default.content1',
        content2: 'qrHome.default.content2',
        createButton: 'qrHome.default.createButton',
    },
    {
        textButton: 'qrHome.mobile.button',
        background: Themes.COLORS.primary,
        navigateScreen: ORDER_ROUTE.ORDER_QR_CODE,
        orderType: OrderTypeMenu.MOBILE_ORDER,
        content1: 'qrHome.mobile.content1',
        content2: 'qrHome.mobile.content2',
        createButton: 'qrHome.mobile.createButton',
    },
    {
        textButton: 'qrHome.checkIn.button',
        navigateScreen: HOME_ROUTE.CHECK_IN,
        background: Themes.COLORS.qrCheckIn,
    },
];

export enum statusReadNotification {
    UN_READ = 0,
    READ = 1,
}
export enum NotificationType {
    AUTO = 1,
    BIRTHDAY = 2,
    REGISTER = 3,
}
export enum NotificationStatus {
    AVAILABLE = 1,
    PUBLISHED = 2,
}
export const listScreenBackWhenPayment = [
    ORDER_ROUTE.MENU_EDIT_QR,
    ORDER_ROUTE.ORDER_QR_CODE,
    ORDER_ROUTE.CART_EDIT_QR,
    ORDER_ROUTE.DETAIL_MEAL,
];

export const tickTypeText = ['', '自動付与スタンプカード', '選択付与スタンプカード'];

export const CONFIG_KEYS = {
    WEB_PAGE: 'WEB_PAGE',
    NEWS_DISPLAY: 'NEWS_DISPLAY',
    POLICY: 'POLICY',
};

export const CRYPTO_DATA = {
    key: CryptoJS.enc.Hex.parse('0582d429663b1351e8992a435730a456'),
    iv: CryptoJS.enc.Hex.parse('a19f0214a81040a392aaec1e617bd51d'),
};

export const STAMP_NOTE = [
    {
        id: 1,
        content: 'stamp.contentFirst',
    },
    {
        id: 2,
        content: 'stamp.contentSecond',
    },
    {
        id: 3,
        content: 'stamp.contentThree',
    },
    {
        id: 4,
        content: 'stamp.contentLatest',
    },
];

export const RESTAURANT_NEW_ORDER = {
    id: '9212',
    name: 'Komorosoba',
};

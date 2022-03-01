import Images from 'assets/images';

export const staticValue = {
    DEFAULT: 1,
    TIME_IMAGE_LOAD: 500,
    DEFAULT_HIT_SLOP: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
    },
    COLUMNS_COUPON_EXCHANGE: 5,
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
    { url: 'common/listCoupon', key: 'listCoupon' },
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
export const notificationListFake = [
    {
        id: 1,
        content: 'text content',
        time: '20:20 Am',
        img: 'promotion',
    },
    {
        id: 2,
        content: 'text content',
        time: '20:20 Am',
        img: 'coupon',
    },
    {
        id: 3,
        content: 'text content',
        time: '20:20 Am',
        img: 'stampCard',
    },
    {
        id: 4,
        content: 'text content',
        time: '20:20 Am',
        img: 'other',
    },
];
export const imagesList: any = [
    {
        id: 1,
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 2,
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
];
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
export const listCouponFake = [
    {
        id: 1,
        name: '新年会クーポンt',
        time: '2022/03/01～2022/03/31',
        expired: true,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4km6pqiEE1QzzbLxzOOeHSqawgslw-wX5Q&usqp=CAU',
    },
    {
        id: 2,
        name: '新年会クーポンt',
        time: '2022/03/01～2022/03/31',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4km6pqiEE1QzzbLxzOOeHSqawgslw-wX5Q&usqp=CAU',
    },
    {
        id: 3,
        name: '新年会クーポンt',
        time: '2022/03/01～2022/03/31',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4km6pqiEE1QzzbLxzOOeHSqawgslw-wX5Q&usqp=CAU',
    },
];
export const coupon = [
    { id: 1, name: '80％割引' },
    { id: 2, name: '新年会クーポン' },
    { id: 3, name: '新年会クーポン' },
];
export const listCouponCanUse = [
    {
        id: 1,
        name: '新年会クーポンt',
        time: '2022/03/01～2022/03/31',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4km6pqiEE1QzzbLxzOOeHSqawgslw-wX5Q&usqp=CAU',
    },
    {
        id: 2,
        name: '新年会クーポンt',
        time: '2022/03/01～2022/03/31',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4km6pqiEE1QzzbLxzOOeHSqawgslw-wX5Q&usqp=CAU',
    },
    {
        id: 3,
        name: '新年会クーポンt',
        time: '2022/03/01～2022/03/31',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4km6pqiEE1QzzbLxzOOeHSqawgslw-wX5Q&usqp=CAU',
    },
];
export const listButton = [
    {
        id: 1,
        name: '注文履歴',
        img: Images.icons.history,
        key: 'history',
    },
    {
        id: 2,
        name: 'いつもの！注文',
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
        key: 'contact',
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

export const createStampItem = (rd = Math.random()) => {
    return {
        id: rd,
        name: `通常時ログイン用 ${Math.round(rd * 100)}`,
        price: Math.round(rd * 2),
        status: Math.round(rd),
        start: '02/01/2022',
        end: '04/04/2022',
        used: Boolean(Math.round(Math.random())),
        count: Math.round(rd * 5),
        url: 'https://kenh14cdn.com/203336854389633024/2021/9/1/photo-1-16304832141231584345047.jpg',
    };
};

export const STAMP_DATA = [
    createStampItem(),
    createStampItem(),
    createStampItem(),
    createStampItem(),
    createStampItem(),
    createStampItem(),
    createStampItem(),
    createStampItem(),
    createStampItem(),
];

export const MODAL_ID = {
    CHOOSE_STAMP: 50,
    GUIDE_STAMP: 51,
    HISTORY_STAMP: 52,
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
        name: 'きつね',
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 2,
        name: 'きつね',
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 3,
        name: 'きつね',
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 4,
        name: 'きつね',
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 5,
        name: 'きつね',
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 6,
        name: 'きつね',
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 7,
        name: 'きつね',
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 8,
        name: 'きつね',
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
];
export const statusUser = [
    {
        name: 'ブロンズメンバー',
        colors: ['#A46628', '#D7995B'],
        background: '#CE9E6D',
        crownColor: 'rgba(144, 89, 35, 0.4)',
        content1: '￥5000を支払う、',
        content2: '月に1回「新年おめでとう」クーポンを頂く',
    },
    {
        name: 'シルバーメンバー',
        colors: ['#CCCCCC', '#F2F2F2'],
        background: '#F2F2F2',
        crownColor: 'rgba(196, 196, 196, 0.4)',
        content1: '￥10000を支払う、',
        content2: '月に1回「新年おめでとう」クーポンを頂く',
    },
    {
        name: 'ブロンズメンバー',
        colors: ['#F8D156', '#FEECD2'],
        background: '#FEECD2',
        crownColor: 'rgba(249, 197, 33, 0.4)',
        content1: '￥10000を支払う、',
        content2: '月に1回「新年おめでとう」クーポンを頂く',
    },
    {
        name: 'ブロンズメンバー',
        colors: ['#A4F4F9', '#7B68EE'],
        background: '#DCFDFF',
        crownColor: 'rgba(172, 229, 238, 0.4)',
        content1: '￥20000を支払う、',
        content2: '月に1回「新年おめでとう」クーポンを頂く',
    },
];

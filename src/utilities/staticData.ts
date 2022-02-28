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
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 2,
        content: 'text content',
        time: '20:20 Am',
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 3,
        content: 'text content',
        time: '20:20 Am',
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
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
        img: Images.icons.facebook,
    },
    {
        id: 2,
        name: 'facebook',
        img: Images.icons.facebook,
    },
    {
        id: 3,
        name: 'line',
        img: Images.icons.facebook,
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
            { id: 2, name: 'いか天', price: 500 },
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
    { id: 1, name: '新年会クーポン' },
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
        img: Images.icons.facebook,
        key: 'history',
    },
    {
        id: 2,
        name: 'いつもの！注文',
        img: Images.icons.facebook,
        key: 'orderDefault',
    },
    {
        id: 3,
        name: '通知設定',
        img: Images.icons.facebook,
        key: 'notification',
    },
    {
        id: 4,
        name: 'お問い合わせ',
        img: Images.icons.facebook,
        key: 'contact',
    },
    {
        id: 5,
        name: 'ポリシー',
        img: Images.icons.facebook,
        key: 'contact',
    },
    {
        id: 6,
        name: 'ログアウト',
        img: Images.icons.facebook,
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

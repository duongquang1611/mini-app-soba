const COMMON_URL = {
    resources: 'common/resources',
    upload: 'common/upload',
};

const STAMP_URL = {
    list: 'stamp-list',
    detail: (id: string | number) => `stamp-list/${id}`,
    exchangeCoupon: 'exchange-coupon',
    exchangeCouponHistory: 'exchange-coupon-history',
};

const NOTIFICATION_URL = {
    list: 'notifications',
    coupon: (id: string | number) => `notifications/${id}`,
};
const MENU_URL = {
    menu: 'menu',
    dish: (id: string | number) => `menu/${id}`,
    cart: 'cart',
};
const HOME_URL = {
    listNews: 'news',
    newsDetail: (id: string | number) => `news/${id}`,
    checkIn: 'checkin-order',
    mobile: 'mobile-order',
    orderDefault: 'default-order',
};
const COUPON_URL = {
    list: 'coupon-list',
    coupon: (id: string | number) => `coupon-list/${id}`,
};

export { COMMON_URL, STAMP_URL, NOTIFICATION_URL, COUPON_URL, HOME_URL, MENU_URL };

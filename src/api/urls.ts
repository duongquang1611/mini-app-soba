const COMMON_URL = {
    resources: 'common/resources',
    upload: 'common/upload',
};

const STAMP_URL = {
    list: 'stamp',
    detailMemberStamp: (id: string | number) => `stamp/member-stamp/${id}`,
    exchangeCoupon: 'exchange-coupon',
    exchangeCouponHistory: 'exchange-coupon-history',
};

const NOTIFICATION_URL = {
    list: 'notifications',
    coupon: (id: string | number) => `notifications/${id}`,
    read: (id: string | number) => `notifications/${id}`,
};

const MENU_URL = {
    menu: 'menu',
    dish: (id: string | number) => `menu/${id}`,
    cart: 'cart',
};

const ORDER_URL = {
    saveOrder: 'order/save-order-options',
};

const HOME_URL = {
    listNews: 'news',
    newsDetail: (id: string | number) => `news/${id}`,
    checkIn: 'checkin-order',
    mobile: 'mobile-order',
    orderDefault: 'default-order',
};

const COUPON_URL = {
    list: 'coupon',
    coupon: (id: string | number) => `coupon/${id}`,
    memberCoupon: (id: string | number) => `coupon/member-coupon/${id}`,
};

export { COMMON_URL, STAMP_URL, NOTIFICATION_URL, COUPON_URL, HOME_URL, MENU_URL, ORDER_URL };

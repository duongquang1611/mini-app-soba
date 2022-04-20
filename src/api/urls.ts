const COMMON_URL = {
    resources: 'common/resources',
    upload: 'common/upload',
    sendTeams:
        'https://amelavn.webhook.office.com/webhookb2/0f1d53ff-37e7-4c18-881e-eb1cf697f9a5@94675deb-b6ed-4d28-8d46-e477fdb4a97d/IncomingWebhook/7c996d2c2e6e46b9a66ab416ce95988a/390f2b08-5bcb-41ab-80c3-bcfdd166b675',
};

const STAMP_URL = {
    list: 'stamp',
    detailMemberStamp: (id: string | number) => `stamp/member-stamp/${id}`,
    exchangeCoupon: (stampId: string | number, couponId: string | number) =>
        `stamp/${stampId}/exchange-coupon/${couponId}`,
    exchangeCouponHistory: (id: string | number) => `stamp/${id}/coupon-exchange-history`, // stamp.id
    tickStamp: `stamp/tick-stamp`,
};

const NOTIFICATION_URL = {
    list: 'notification',
    coupon: (id: string | number) => `notification/${id}`,
    read: (id: string | number) => `notification/read/${id}`,
    readAll: 'notification/read-all',
};

const MENU_URL = {
    menu: 'menu',
    dish: (id: string | number) => `menu/${id}`,
    cart: 'cart',
};

const ORDER_URL = {
    saveOrder: 'order/save-order-options',
    getOrder: (orderType: number) => `order?orderType=${orderType}`,
    listHistoryOrder: 'order/bill-history',
    detailHistoryOrder: (id: number) => `order/bill-history/${id}`,
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

const AUTH_URL = {
    editProfile: 'profile/edit',
    changePass: 'auth/change-password',
    checkOldPass: 'auth/check-old-password',
};

export { COMMON_URL, STAMP_URL, NOTIFICATION_URL, COUPON_URL, HOME_URL, MENU_URL, ORDER_URL, AUTH_URL };

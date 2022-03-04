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

export { COMMON_URL, STAMP_URL, NOTIFICATION_URL };

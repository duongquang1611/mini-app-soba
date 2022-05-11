// item.stamp.cardType
export enum StampCardType {
    EXCHANGE = 1,
    CUMULATIVE = 2,
}

// item.stamp.tickType
export enum StampTickType {
    AUTO = 1,
    PICK = 2,
}

// item.stamp.settingDuration: stamp have expiredDate or not
export enum StampSettingDuration {
    EXPIRED_DATE = 1,
    NO_EXPIRED_DATE = 2,
}

// item.stamp.settingBox: total box in detail stamp
export enum StampSettingBox {
    LIMIT = 1,
    NO_LIMIT = 2,
}

// item.coupon.status
export enum CouponStatus {
    AVAILABLE = 1,
    OUTDATE = 2,
    ADD_TO_STAMP = 3,
    ADD_TO_NOTI = 4,
    PUBLISHED = 5,
    BLOCK = 6,
}

// item.stamp.status
export enum StampStatus {
    AVAILABLE = 1,
    OUTDATE = 2,
    ADD_TO_NOTI = 3,
    PUBLISHED = 4,
    BLOCK = 5,
}

// coupon receive from notification or stamp: item.type
export enum MemberCouponType {
    STAMP = 1,
    NOTI = 2,
}

// type 3 tab QR in home screen
export enum QR_TAB_TYPE {
    ORDER_DEFAULT = 0,
    MOBILE_ORDER = 1,
    CHECK_IN = 2,
}

// coupon.type
export enum CouponType {
    COMPANY = 1, // isAccounted: 1
    RESTAURANT = 0, // isAccounted: 0
}

// coupon.couponDish[0].type
export enum CouponDishType {
    SETTING_DISCOUNT = 1,
    FREE = 2,
}

export enum CommonStatusBE {
    ACTIVE = 1,
    INACTIVE = 0,
}

// type category of notification
export enum NotificationCategory {
    PROMOTION = 1,
    COUPON = 2,
    STAMP = 3,
    OTHER = 4,
    SUCCESS_PAYMENT = 5,
    CANCEL_PAYMENT = 6,
}

// type check password matches
export enum CheckPasswordType {
    CHECK_CONFIRM_PASS = 1,
    CHECK_NEW_PASS = 2,
}

export enum CouponStatus {
    AVAILABLE = 1,
    OUTDATE = 0,
}

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

// item.stamp.status
export enum StampStatus {
    AVAILABLE = 1,
    OUTDATE = 0,
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

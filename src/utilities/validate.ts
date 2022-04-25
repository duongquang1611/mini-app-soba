export const REGEX_EMAIL =
    /^(([^<>()[\]\\x.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const REGEX_PHONE = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
export const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]*$/;
export const REGEX_KATAKANA = /^[\u30A0-\u30FF\u3005]+$/i;
export const SPECIAL_CHAR = /^([a-zA-Z0-9一-龯ぁ-んァ-ン]+\s*)*$/;

export const USERNAME_MIN_LENGTH = 1;
export const USERNAME_MAX_LENGTH = 15;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 20;

export const EMAIL_MAX_LENGTH = 80;
export const CONTACT_MAX_LENGTH = 50;

/* eslint-disable no-useless-escape */
export const NAME_PATTERN = /^[\.a-zA-Z\s ]*$/;
export const EMAIL_PATTERN =
  /^[_A-Za-z0-9-+]+(\.[_A-Za-z0-9-+]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z‌​]{2,})$/;
export const SPECIAL_CHARACTER_PATTERN =
  /(?=.*?[\!\"\-\@\#\$\%\&\*\(\)\'\^\`\.\,\/\:\;\_\+\=\<\>\?\{\}\[\\\]])/;
export const DIGITIZED_PATTERN = /(?=.*?[0-9])/;
export const NUMBER_PATTERN = /(^[0-9])/;
export const NEGATIVE_NUMBER_PATTERN = /^-?[1-9]/;
export const CHARACTER_PATTERN = /(?=.*?[a-zA-Z])/;
export const FORUM_PATTERN = /^[A-Za-z0-9-]*$/;
export const USERNAME_PATTERN = /^[A-Za-z0-9-]*$/;
export const TELEGRAM_PATTERN = /(^)@[A-Za-z0-9-\_]*$/;
export const ENTITY_PATTERN = /^[A-Za-z0-9-\s\.\_ ]*$/;
export const PASSWORD_PATTERN = new RegExp(
  `${CHARACTER_PATTERN.source}${DIGITIZED_PATTERN.source}${SPECIAL_CHARACTER_PATTERN.source}`
);

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Color = {
  TEXT_COLOR: 'white',
  HEADING_TEXT: '#5f9ea0',
  BACKGROUND: 'rgba(0,0,0,0.7)',
  BORDER_COLOR: 'white',//'#555',
  INPUT_BACKGROUND: 'rgba(0,0,0,0.8)',
  ERROR_TEXT: '#e83f3f',
  BUTTON_BACKGROUND: '#5f9ea0',
  DISABLED_BUTTON: '#8b9899',
  LINK_TEXT: '#4e89cc',
};

export const Font = {
  PRIMARY: hp('5%'),
  SECONDARY: hp('2%'),
  LARGE: hp('2.5%'),
};

export const Size = {
  FLEX: 1,
  ICON_SMALL: hp('2.25%'),
  ICON_MEDIUM: hp('2.5%'),
  ICON_LARGE: hp('3%'),
  TOPBAR_ICON: hp('5%'),
  EMPTY_ICON: hp('3%'),
  NOTE: hp('2.25%'),
};

export const Padding = {
  PRIMARY_PADDING: hp('1.25%'),
  SECONADARY_PADDING: hp('1%'),
  INPUT_LEFT_PADDING: wp('4%'),
  INPUT_RIGHT_PADDING: wp('10%'),
  BUTTON_PADDING: hp('1.5%'),
};

export const Border = {
  THICK_BORDER: hp('3%'),
  LIGHT_BORDER: hp('2%'),
  MEDIUM_BORDER: hp('0.15%'),
  BORDER_RADIUS: hp('1.5%'),
  ROUND_CORNER: hp('5%'),
};

export const Width = {
  IMG_WIDTH: wp('30%'),
  INPUT_WIDTH: wp('75%'),
  BTN_WIDTH: wp('35%'),
  SOCIAL_BTN_WIDTH: wp('55%'),
};

export const Height = {
  IMG_HEIGHT: hp('15%'),
  BTN_HEIGHT: hp('7%'),
  SOCIAL_BTN_HEIGHT: hp('8%'),
};

export const Margin = {
  IMG_TOP_MARGIN: hp('3%'),
  HEADER_TEXT_BOTTOM: hp('3%'),
  HEADER_TEXT_TOP: hp('2.25%'),
  INPUT_EMAIL_RIGHT: wp('4%'),
  INPUT_TOP: hp('1%'),
  INPUT_BOTTOM: hp('1%'),
  INPUT_ICONS: -wp('9%'),
  ERROR_TEXT: hp('0.25%'),
  BTN: hp('1.5%'),
  BODY_BTN_TEXT: hp('1.5%'),
  BODY_BUTTON_TOP: hp('1.5%'),
  SOCIAL_BTN: hp('2.5%'),
  BODY_TEXT_LEFT: hp('2%'),
};

import {StyleSheet} from 'react-native';
import {Color,Padding,Border,Width,Height, Margin, Size} from './Theme';

const pageStyles = StyleSheet.create({
  container: {
    backgroundColor: Color.BACKGROUND,
    flex: Size.FLEX,
  },
  body: {
    alignItems: 'center',
  },
  body_btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Margin.BODY_BUTTON_TOP,
  },
  social_btn_view: {
    alignItems: 'center',
  },
  social_btn: {
    padding: Padding.BUTTON_PADDING,
    margin: Margin.SOCIAL_BTN,
    borderRadius: Border.BORDER_RADIUS,
    width: Width.SOCIAL_BTN_WIDTH,
    height: Height.SOCIAL_BTN_HEIGHT,
  },
});

export default pageStyles;

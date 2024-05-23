// Packages
import {StyleSheet} from 'react-native';
// Theme
import {Colors, moderateScale, verticalScale, scale} from '@/theme';

const styles = StyleSheet.create({
  text: {
    color: Colors.primary,
    fontSize: moderateScale(18),
  },
  availabilityText: {
    color: Colors.secondary,
    fontSize: moderateScale(16),
  },
  containerStyle: {
    margin: moderateScale(20),
    marginBottom: verticalScale(10),
    alignItems: 'flex-start',
  },
  parentStyles: {
    backgroundColor: Colors.bgColor,
    marginTop: verticalScale(5),
    paddingRight: scale(10),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  innerContainer: {
    paddingLeft: scale(20),
  },
  chevronContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  childrenContainerStyles: {
    backgroundColor: Colors.bgColor,
    paddingRight: scale(10),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(5),
    alignItems: 'center',
    flexDirection: 'row',
  },
  renderContainer: {
    alignItems: 'flex-start',
  },
  iconView: {
    height: moderateScale(32),
    width: moderateScale(32),
    tintColor: Colors.primary,
  },
  childTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  selectedVariantsContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  selectedVariantsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selectedVariantText: {
    fontSize: 14,
    marginBottom: 3,
  },
});
export default styles;

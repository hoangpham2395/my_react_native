import {Dimensions, Platform} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const widthDesign = 750;
const ratio = width / widthDesign;
const ratioAndroidDefault = 1.8; // ~ 16/9
const ratioScreen = height / width;
const ratioSmall = (Platform.OS == 'android') && (ratioScreen < ratioAndroidDefault) ? (ratio * 3 / 4) : ratio;

export default {
    ratio,
    ratioSmall,
    ratioScreen,
    ratioAndroidDefault,
};
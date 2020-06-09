import {StyleSheet} from 'react-native';
import Ratio from "../../libraries/constants/Ratio";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewLogo: {

    },
    logo: {
        fontSize: Ratio.ratio * 50,
    },
    viewInput: {
        width: '100%',
        paddingHorizontal: Ratio.ratio * 40,
    },
});

export default styles;
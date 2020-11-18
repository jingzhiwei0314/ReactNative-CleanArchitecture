import {Alert} from "react-native";
function phoneNumCheck(phoneNum,needTips=true) {
    if(!(/^1[345789]\d{9}$/.test(phoneNum))){
        if(needTips){
            Alert.alert(
                '提示',
                '手机号码有误，请重填',
                [
                    // {},
                    {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                { cancelable: false }
            );
        }
        return false;
    }
    return true;
}
export {phoneNumCheck}

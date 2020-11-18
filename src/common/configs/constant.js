import {Platform} from 'react-native'

export default {

    VERSION: '1.0.0',
    DEVICE: 'ReactNativeCleanArchitecture',
    APP_NAME: '随你花',
    PLATFORM: Platform.OS == 'ios' ? 'iOS' : 'Android',
    defaultHeaders: {
        version: 'V1',
        'Content-Type': 'application/json;charset=UTF-8',
        platform: Platform.OS == 'ios' ? 'iOS' : 'Android',
        deviceId: 'suinijie',
    },
    defaultUploadHeaders: {
        version: 'V1',
        'Content-Type': 'multipart/form-data;charset=UTF-8',
        platform: Platform.OS == 'ios' ? 'iOS' : 'Android',
        deviceId: 'suinijie',
    },

}

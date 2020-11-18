import {Linking, Alert} from 'react-native';

export function openURL(url) {
    Linking.canOpenURL(url)
        .then((supported) => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
                Alert.alert(
                    '提示',
                    'Can\'t handle url: ' + url,
                    [
                        {
                            text: 'OK', onPress: () => {
                            }
                        }
                    ]
                );
            } else {
                return Linking.openURL(url);
            }
        })
        .catch((err) => {
            console.log('An error occurred', err);
            Alert.alert(
                '提示',
                'An error occurred: ' + err,
                [
                    {
                        text: 'OK', onPress: () => {
                        }
                    }
                ]
            );
        });
}


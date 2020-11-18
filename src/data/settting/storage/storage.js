import React from 'react'
import AsyncStorage from '@react-native-community/async-storage';

export function readStorage(tag) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(tag).then(value => {
            const data = JSON.parse(value);
            resolve(data);
        }).catch(error => {
            resolve(null);
        })
    })
}

export function writeStorage(tag, data) {
    AsyncStorage.setItem(tag, JSON.stringify(data)).then(readStorage(tag));
}

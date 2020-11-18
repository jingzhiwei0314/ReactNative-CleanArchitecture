import React, {Component} from 'react';
import ApiException from '../../../common/exception/ApiException'
import Config from "../../../common/Config";

let instance = null;
export default class HTTPClient {

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    /***
     * 获取单例对象
     */
    static HTTPClientInstance() {
        let singleton = new HTTPClient();
        return singleton;
    }

    async POST(url, formData, headers) {
        let _headers = CONSTANT.defaultHeaders;
        _headers.deviceId = Config.getInstance().getDeviceId();
        Log('HTTPClient POST deviceId -> ', _headers.deviceId);
        if (headers) {
            _headers = Object.assign(headers, _headers);
        }
        let response = await fetch(
            `${configs.postUrl}${url}`,
            {
                method: 'POST',
                headers: _headers,
                body: JSON.stringify(formData)
            }
        ).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.warn("POST status -> ", response.status);
                throw new ApiException(response.status, "POST API EXCEPTION")
            }
        }).then(async responseJson => {
            // console.log(responseJson)
            if (responseJson.code == 200) {
                // console.log(url , formData , headers , responseJson.data);
                console.log(` POST url-->${url} \n params-->${JSON.stringify(formData)} \n headers-->${JSON.stringify(headers)} \n successResponse-->${JSON.stringify(responseJson.data)}\n`, responseJson.data);
                return await responseJson;
            } else {
                console.warn(` POST url-->${url} \n params-->${JSON.stringify(formData)} \n headers-->${JSON.stringify(headers)} \n successResponse-->${JSON.stringify(responseJson)}\n`, responseJson.data);
                throw new ApiException(responseJson.code, responseJson.msg);
            }
        }).catch(e => {
            console.warn('HTTPClient e ->', e);
            throw e;
        })
        console.info("POST response -> " + response)
        return response;
    }

    async GET(_url, formData, headers) {
        let _headers = CONSTANT.defaultHeaders;
        _headers.deviceId = Config.getInstance().getDeviceId();
        Log('HTTPClient GET deviceId -> ', _headers.deviceId);
        if (headers) {
            _headers = Object.assign(headers, _headers);
        }
        let url = `${configs.postUrl}${_url}`
        if (formData) {
            let paramsArray = [];
            //拼接参数
            Object.keys(formData).forEach(key => paramsArray.push(key + '=' + formData[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        let response = await fetch(
            url,
            {
                method: 'GET',
                headers: _headers,
            }
        ).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.warn("GET status -> ", response.status);
                throw new ApiException(response.status, "POST API EXCEPTION")
            }
        })
            .then(async responseJson => {
                // console.log(responseJson)
                if (responseJson.code == 200) {
                    // console.log(url , formData , headers , responseJson.data);
                    console.log(` GET url-->${url} \n params-->${JSON.stringify(formData)} \n headers-->${JSON.stringify(headers)} \n successResponse-->${JSON.stringify(responseJson.data)}\n`, responseJson.data);
                    return await responseJson;
                } else {
                    console.warn(` POST url-->${url} \n params-->${JSON.stringify(formData)} \n headers-->${JSON.stringify(headers)} \n successResponse-->${JSON.stringify(responseJson)}\n`, responseJson.data);
                    throw new ApiException(responseJson.code, responseJson.msg);
                }
            })
            .catch(e => {
                throw e;
            });
        console.info("GET response -> " + response)
        return response;
    }


    /**
     * 上传图片
     * @param _url
     * @param params
     * @param headers
     * @returns {Promise<Response>}
     * @constructor
     */
    async UPLOAD_IMG(_url, params, headers) {
        let _headers = CONSTANT.defaultUploadHeaders;
        _headers.deviceId = Config.getInstance().getDeviceId();
        Log('HTTPClient POST deviceId -> ', _headers.deviceId);
        if (headers) {
            _headers = Object.assign(headers, _headers);
        }
        let formData = new FormData();
        for (var key in params) {
            formData.append(key, params[key]);
        }
        let file = {uri: params.path, type: 'application/octet-stream', name: params.name};
        formData.append("file", file);
        let response = await fetch(
            `${configs.postUrl}${_url}`,
            {
                method: 'POST',
                headers: _headers,
                body: formData
            }
        ).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.warn("POST status -> ", response.status);
                throw new ApiException(response.status, "POST API EXCEPTION")
            }
        }).then(async responseJson => {
            // console.log(responseJson)
            if (responseJson.code == 200) {
                // console.log(url , formData , headers , responseJson.data);
                console.log(` POST url-->${_url} \n params-->${JSON.stringify(formData)} \n headers-->${JSON.stringify(headers)} \n successResponse-->${JSON.stringify(responseJson.data)}\n`, responseJson.data);
                return await responseJson;
            } else {
                console.warn(` POST url-->${_url} \n params-->${JSON.stringify(formData)} \n headers-->${JSON.stringify(headers)} \n successResponse-->${JSON.stringify(responseJson)}\n`, responseJson.data);
                throw new ApiException(responseJson.code, responseJson.msg);
            }
        }).catch(e => {
            console.warn('HTTPClient e ->', e);
            throw e;
        })
        console.info("POST response -> " + response)
        return response;
    }
}

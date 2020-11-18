/**
 * 业务层Controller的基类，相同业务的提取封装
 */
import BaseResponse from '../../common/http/base/BaseResponse'
import ErrorHandler from '../../common/exception/ErrorHandler'
import CustomEvent from "../../common/events/CustomEvent";


export default class BaseController {


    /**
     * Domain层业务逻辑处理完成，回调通知
     * @param requestType           业务类型
     * @param data                  传递数据
     * @param finish
     * @returns {Promise<void>}
     */
    onFinish = async (requestType, data, eventType) => {
        CustomEvent.emit(eventType, new BaseResponse(requestType, data));
    }


    /**
     * Domain层业务处理失败
     * @param requestType
     * @param e
     * @param error
     * @returns {Promise<void>}
     */
    onError = async (requestType, e, eventType) => {
        let baseException = ErrorHandler.errorHandlerInstance()._handleError(requestType, e);
        CustomEvent.emit(eventType, baseException);
    }

    /**
     * Domain层业务处理失败
     * @param requestType
     * @param e
     * @param error
     * @returns {Promise<void>}
     */
    onErrorWithData = async (requestType, e, data, eventType) => {
        let baseException = ErrorHandler.errorHandlerInstance()._handleError(requestType, e);
        if (baseException != null) {
            baseException.setData(data);
            CustomEvent.emit(eventType, baseException);
        } else {
            console.warn("onErrorWithData baseException is err！")
        }
    }


}

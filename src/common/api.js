/**
 * Created by aries.chen on 2017/7/26.
 */
import wepy from 'wepy';
// var userInfo = wepy.getStorageSync('user');
// var token = wepy.getStorageSync('accessToken');
// var hostUrl = 'http://192.168.35.251:8080';
var hostUrl = 'http://218.76.53.227:9081/stg';
export default {
    popError(title, content) {
        wepy.showModal({
            title: title,
            showCancel: false,
            content: content,
            success: function(res) {
                if (res.confirm) {
                    wepy.navigateBack({
                        delta: 1
                    });
                }
            }
        });
    },
    application(type) {
        let me = this;
        let postData;
        if (type === 4) {
            postData = {
                oldStatus: wepy.getStorageSync('user').status,
                data: '',
                templateId: 0
            };
        } else {
            postData = {
                oldStatus: wepy.getStorageSync('user').status,
                data: '',
                employeeId: wepy.getStorageSync('user').id,
                templateId: 0
            };
        }
        wepy.request({
            url: `${hostUrl}/oa/process/apply/${type}`,
            method: 'POST',
            header: {'accessToken': wepy.getStorageSync('accessToken')},
            data: postData,
            success: function (res) {
                if (res.data.data === 0) {
                    wepy.navigateBack({
                        delta: 1
                    });
                    wepy.showToast({
                        title: '申请成功!',
                        icon: 'success',
                        duration: 2000
                    });
                } else if (res.data.data > 0)  {
                    me.getTemplate(res.data.data, type);
                } else {
                    me.popError('错误', res.data.error);
                }
            }
        });
    },
    getTemplate(templateId, processType) {
        let me = this;
        let templateData = {};
        let postData = {
            id: templateId,
            type: 1
        };
        wepy.request({
            url: `${hostUrl}/oa/template`,
            header: {'accessToken': wepy.getStorageSync('accessToken')},
            data: postData,
            success: function (res) {
                if (res.data.data) {
                    wepy.removeStorageSync('templateData');
                    templateData['employeeId'] = wepy.getStorageSync('user').id;
                    templateData['templateId'] = templateId;
                    templateData['type'] = processType;
                    templateData['name'] = res.data.data.name;
                    templateData['oldStatus'] = wepy.getStorageSync('user').status;
                    templateData['content'] = res.data.data.content;
                    wepy.setStorageSync('templateData', templateData);
                } else {
                    me.popError('错误', res.data.error);
                }
            }
        });
    },
    confirmApply(type, postData) {
        let me = this;
        wepy.request({
            url: `${hostUrl}/oa/process/apply/${type}`,
            method: 'POST',
            data: postData,
            header: {'accessToken': wepy.getStorageSync('accessToken')},
            success: function (res) {
                if (res.data.data === 0) {
                    this.renderList = [];;
                    wepy.showToast({
                        title: '申请成功!',
                        icon: 'success',
                        duration: 2000
                    });
                    wepy.navigateBack({
                        delta: 1
                    });
                } else {
                    me.popError('错误', res.data.error);
                }
            }
        });
    }
}
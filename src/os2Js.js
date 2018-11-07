import Store from './store';
window.store = new Store({
    state: {
        webkitCallbacks: {}
    },
    mutations: {
        setWebkitCallback: function (state, payload) {
            state.webkitCallbacks[payload.callbackName] = payload.callback;
        },
        removeWebkitCallback: function (state, payload) {
            delete state.webkitCallbacks[payload];
        }
    }
});
export const funOsApi = funName => {
    return function (data) {
        data = Object.assign({
            success: `store.state.webkitCallbacks.${funName}`,
            fail: `store.state.webkitCallbacks.${funName}_fail`
        }, data);
        try {
            window.webkit.messageHandlers[funName].postMessage(data);
        } catch (e) {
            return Promise.reject({
                errorCode: -1,
                failure: '请在蜂背客户端使用该功能'
            });
        }
        let _removeCallbacks = () => {
            store.commit('removeWebkitCallback', funName);
            store.commit('removeWebkitCallback', `${funName}_fail`);
        }
        return new Promise((resolve, reject) => {
            store.commit('setWebkitCallback', {
                callbackName: funName,
                callback: res => {
                    resolve(res);
                    _removeCallbacks();
                }
            });
            store.commit('setWebkitCallback', {
                callbackName: `${funName}_fail`,
                callback: res => {
                    reject(res);
                    _removeCallbacks();
                }
            });
        })
    };
}
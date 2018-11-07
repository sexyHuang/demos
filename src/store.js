export default class Store {
    constructor(config) {
        this.state = config.state || {};
        this.getters = config.getters || {};
        this.mutations = config.mutations || {};
    }
    commit(mutationName, payload) {
        this.mutations[mutationName](this.state, payload);
    };
}
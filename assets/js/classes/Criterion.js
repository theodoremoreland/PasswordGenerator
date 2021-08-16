export default class Criterion {
    accepted = false;

    constructor(description, defaultValue, type) {
        this.description = description;
        this.defaultValue = defaultValue;
        this.type = type;
    }
}
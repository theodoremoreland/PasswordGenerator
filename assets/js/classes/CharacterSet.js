export default class CharacterSet {
    constructor(name, characters, approved = true) {
        this.name = name;
        this.characters = characters;
        this.approved = approved;
    }
}
import CharacterSet from "../classes/CharacterSet.js";

describe("CharacterSet Class", () => {
    let lowercaseLetters;

    beforeEach(() => {
        lowercaseLetters = new CharacterSet(
            "lowercase letters",
            "abcdefghijklmnopqrstuvwxyz",
            true
        );
    });
    
    test('should set name from constructor', () => {
        expect(lowercaseLetters.name).toEqual("lowercase letters");
    });
      
    test('should set characters from constructor', () => {
        expect(lowercaseLetters.characters).toEqual("abcdefghijklmnopqrstuvwxyz");
    });
    
    test('cshould set approved from constructor', () => {
        expect(lowercaseLetters.approved).toEqual(true);
    });
});

import CharacterSet from "../classes/CharacterSet.js";

describe("CharacterSet Class constructor", () => {
    let lowercaseLetters;
    let uppercaseLetters;

    beforeAll(() => {
        lowercaseLetters = new CharacterSet(
            "lowercase letters",
            "abcdefghijklmnopqrstuvwxyz",
            true
        );

        uppercaseLetters = new CharacterSet(
            "uppercase letters",
            lowercaseLetters.characters.toUpperCase()
        );
    });
    
    test('should set name from constructor', () => {
        expect(lowercaseLetters.name).toEqual("lowercase letters");
    });
      
    test('should set characters from constructor', () => {
        expect(lowercaseLetters.characters).toEqual("abcdefghijklmnopqrstuvwxyz");
    });
    
    test('should set approved status from constructor', () => {
        expect(lowercaseLetters.approved).toEqual(true);
    });

    test('should assign default approved status if no argument was given', () => {
        expect(uppercaseLetters.approved).toEqual(true);
    });
});

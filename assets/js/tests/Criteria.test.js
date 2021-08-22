import CharacterSet from "../classes/CharacterSet.js";
import Criteria from "../classes/Criteria";

describe("Criteria class", () => {
    describe("Criteria class constructor", () => {
        let lowercaseLetters;
        let uppercaseLetters;
        let criteria;
    
        beforeAll(() => {
            lowercaseLetters = new CharacterSet(
                "lowercase letters",
                "abcdefghijklmnopqrstuvwxyz",
                true
            );
    
            uppercaseLetters = new CharacterSet(
                "uppercase letters",
                lowercaseLetters.characters.toUpperCase(),
                false
            );
    
            criteria = new Criteria(16, [lowercaseLetters, uppercaseLetters]);
        });
    
        test("should set length from constructor", () => {
            expect(criteria.length).toEqual(16);
        });
        
        test("should set characterSets from constructor", () => {
            expect(criteria.characterSets.length).toEqual(2);
            expect(criteria.characterSets[0]).toStrictEqual(lowercaseLetters);
            expect(criteria.characterSets[1]).toStrictEqual(uppercaseLetters);
        });
    });

    describe("Criteria class prompts", () => {

    });
});

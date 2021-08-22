/**
 * @jest-environment jsdom
 */
import CharacterSet from "../classes/CharacterSet.js";
import Criteria from "../classes/Criteria";

describe("Criteria class", () => {
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

    describe("Criteria class constructor", () => {    
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
        test("should set length after valid response from user", () => {
            const promptSpy = jest.spyOn(window, 'prompt').mockReturnValueOnce("19");

            criteria.promptUserForPasswordLength();

            expect(promptSpy).toHaveBeenCalledTimes(1);
            expect(criteria.length).toEqual(19);
        });

        test("should show alert after invalid response from user for password length", () => {
            const promptSpy = jest.spyOn(window, 'prompt').mockReturnValueOnce("Hi!");
            const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

            criteria.promptUserForPasswordLength();

            expect(promptSpy).toHaveBeenCalledTimes(1);
            expect(alertSpy).toHaveBeenCalledTimes(1);
            expect(criteria.length).toEqual(19);
        });
    });
});

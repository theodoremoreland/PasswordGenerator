/**
 * @jest-environment jsdom
 */
import CharacterSet from "../classes/CharacterSet.js";
import Criteria from "../classes/Criteria";

describe("Criteria class", () => {
    let lowercaseLetters;
    let uppercaseLetters;
    let criteria;
    let promptSpy;
    let alertSpy;

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

    beforeEach(() => {    
        promptSpy = jest.spyOn(window, "prompt");
        alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    });

    afterEach(() => {    
        promptSpy.mockRestore();
        alertSpy.mockRestore();
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

    describe("Criteria promptUserForPasswordLength", () => {        
        test("should set length after valid response from user", () => {
            promptSpy.mockImplementation(() => "19");

            criteria.promptUserForPasswordLength();

            expect(promptSpy).toHaveBeenCalledTimes(1);
            expect(criteria.length).toEqual(19);
        });

        test("should show alert if user response is not a number", () => {
            promptSpy
                .mockReturnValueOnce("This is invalid because it's not a number.")
                .mockReturnValueOnce("19");
            

            criteria.promptUserForPasswordLength();

            expect(promptSpy).toHaveBeenCalledTimes(2);
            expect(alertSpy).toHaveBeenCalledTimes(1);
        });

        test("should show alert if user response is number below allowed range", () => {
            promptSpy
                .mockReturnValueOnce("7")
                .mockReturnValueOnce("19");

            criteria.promptUserForPasswordLength();

            expect(promptSpy).toHaveBeenCalledTimes(2);
            expect(alertSpy).toHaveBeenCalledTimes(1);
        });

        test("should show alert if user response is number above allowed range", () => {
            promptSpy
                .mockReturnValueOnce("129")
                .mockReturnValueOnce("19");

            criteria.promptUserForPasswordLength();

            expect(promptSpy).toHaveBeenCalledTimes(2);
            expect(alertSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe("Criteria promptUserToApproveEachCharacterSet", () => {
        test("", () => {

        });
    });
});

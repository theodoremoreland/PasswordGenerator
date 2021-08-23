/**
 * @jest-environment jsdom
 */
import { generatePassword } from "../generatePassword.js";
import CharacterSet from "../classes/CharacterSet.js";
import Criteria from "../classes/Criteria";

describe("generatePassword function", () => {
    let lowercaseLetters;
    let uppercaseLetters;
    let numbers;
    let specialCharacters;
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

        numbers = new CharacterSet(
            "numbers",
            "0123456789",
            true
        );

        specialCharacters = new CharacterSet(
            "special characters",
            [" ", "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"],
        );

        criteria = new Criteria(16, [lowercaseLetters, uppercaseLetters, numbers, specialCharacters]);
    });

    beforeEach(() => {
        promptSpy = jest.spyOn(window, "prompt");
        alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    });

    afterEach(() => {    
        promptSpy.mockRestore();
        alertSpy.mockRestore();
    });

    test("should generate password with all lowercase letters", () => {
        promptSpy
        .mockReturnValueOnce("YES")
        .mockReturnValueOnce("0")
        .mockReturnValueOnce("0")
        .mockReturnValueOnce("0");

        criteria.promptUserToApproveEachCharacterSet();
        const approvedCharacterSets = criteria.extractApprovedChracterSets();
        const approvedCharacterSetsKeys = Object.keys(approvedCharacterSets);

        const password = generatePassword(16, "", approvedCharacterSets, approvedCharacterSetsKeys);
    });

    test("should generate password with all uppercase letters", () => {

        const password = generatePassword("", {}, []);
        
    });

    test("should generate password with all numbers", () => {

        const password = generatePassword("", {}, []);
        
    });

    test("should generate password with all special characters", () => {

        const password = generatePassword("", {}, []);
        
    });

    test("password has 4 character sets", () => {

        const password = generatePassword("", {}, []);
        
    });
});
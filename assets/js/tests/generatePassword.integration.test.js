/**
 * @jest-environment jsdom
 */
import { generatePassword } from "../scripts/generatePassword.js";
import CharacterSet from "../classes/CharacterSet.js";
import Criteria from "../classes/Criteria";

describe("generatePassword function", () => {
    let lowercaseLetters;
    let uppercaseLetters;
    let numbers;
    let specialCharacters;
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

    test("should generate password of desired length", () => {
        promptSpy
            .mockReturnValueOnce("yes")
            .mockReturnValueOnce("no")
            .mockReturnValueOnce("no")
            .mockReturnValueOnce("no");

        criteria.promptUserToApproveEachCharacterSet();
        const approvedCharacterSets = criteria.extractApprovedChracterSets();
        const approvedCharacterSetsKeys = Object.keys(approvedCharacterSets);

        const password = generatePassword(16, "", approvedCharacterSets, approvedCharacterSetsKeys);
        expect(password.length).toEqual(16);
    });

    test("should generate password with only lowercase letters", () => {
        promptSpy
            .mockReturnValueOnce("yES")
            .mockReturnValueOnce("no")
            .mockReturnValueOnce("no")
            .mockReturnValueOnce("no");

        criteria.promptUserToApproveEachCharacterSet();
        const approvedCharacterSets = criteria.extractApprovedChracterSets();
        const approvedCharacterSetsKeys = Object.keys(approvedCharacterSets);

        const password = generatePassword(16, "", approvedCharacterSets, approvedCharacterSetsKeys);

        for (const character of password) {
            const isLowercaseLetter = lowercaseLetters.characters.includes(character);
            
            expect(isLowercaseLetter).toBeTruthy();
        }
    });

    test("should generate password with only uppercase letters", () => {
        promptSpy
            .mockReturnValueOnce("no")
            .mockReturnValueOnce("yes")
            .mockReturnValueOnce("no")
            .mockReturnValueOnce("no");

        criteria.promptUserToApproveEachCharacterSet();
        const approvedCharacterSets = criteria.extractApprovedChracterSets();
        const approvedCharacterSetsKeys = Object.keys(approvedCharacterSets);

        const password = generatePassword(16, "", approvedCharacterSets, approvedCharacterSetsKeys);

        for (const character of password) {
            const isUppercaseLetter = uppercaseLetters.characters.includes(character);
            
            expect(isUppercaseLetter).toBeTruthy();
        }
    });

    test("should generate password with only numbers", () => {
        promptSpy
            .mockReturnValueOnce("no")
            .mockReturnValueOnce("no")
            .mockReturnValueOnce("yes")
            .mockReturnValueOnce("no");

        criteria.promptUserToApproveEachCharacterSet();
        const approvedCharacterSets = criteria.extractApprovedChracterSets();
        const approvedCharacterSetsKeys = Object.keys(approvedCharacterSets);

        const password = generatePassword(16, "", approvedCharacterSets, approvedCharacterSetsKeys);

        for (const character of password) {
            const isNumber = numbers.characters.includes(character);
            
            expect(isNumber).toBeTruthy();
        }  
    });

    test("should generate password with only special characters", () => {
        promptSpy
            .mockReturnValueOnce("no")
            .mockReturnValueOnce("no")
            .mockReturnValueOnce("no")
            .mockReturnValueOnce("yes");

        criteria.promptUserToApproveEachCharacterSet();
        const approvedCharacterSets = criteria.extractApprovedChracterSets();
        const approvedCharacterSetsKeys = Object.keys(approvedCharacterSets);

        const password = generatePassword(16, "", approvedCharacterSets, approvedCharacterSetsKeys);

        for (const character of password) {
            const isSpecialCharacter = specialCharacters.characters.includes(character);
            
            expect(isSpecialCharacter).toBeTruthy();
        } 
    });

    test("should generate password featuring 2 character sets", () => {
        promptSpy
            .mockReturnValueOnce("yes")
            .mockReturnValueOnce("yes")
            .mockReturnValueOnce("no")
            .mockReturnValueOnce("no");

        criteria.promptUserToApproveEachCharacterSet();
        const approvedCharacterSets = criteria.extractApprovedChracterSets();
        const approvedCharacterSetsKeys = Object.keys(approvedCharacterSets);

        const password = generatePassword(16, "", approvedCharacterSets, approvedCharacterSetsKeys);
        const charactersSetsInPassword = new Set();
        const expected = new Set([
            lowercaseLetters.name,
            uppercaseLetters.name
        ]);

        for (const character of password) {
            const isLowercaseLetter = lowercaseLetters.characters.includes(character);
            const isUppercaseLetter = uppercaseLetters.characters.includes(character);
            const isNumber = numbers.characters.includes(character);
            const isSpecialCharacter = specialCharacters.characters.includes(character);
            
            if (isLowercaseLetter) charactersSetsInPassword.add(lowercaseLetters.name);
            else if (isUppercaseLetter) charactersSetsInPassword.add(uppercaseLetters.name);
            else if (isNumber) charactersSetsInPassword.add(numbers.name);
            else if (isSpecialCharacter) charactersSetsInPassword.add(specialCharacters.name);
            else charactersSetsInPassword.add("unknown");
        }
        
        expect(charactersSetsInPassword).toEqual(expected);
    });

    test("should generate password featuring 3 character sets", () => {
        promptSpy
            .mockReturnValueOnce("yes")
            .mockReturnValueOnce("yes")
            .mockReturnValueOnce("yes")
            .mockReturnValueOnce("no");

        criteria.promptUserToApproveEachCharacterSet();
        const approvedCharacterSets = criteria.extractApprovedChracterSets();
        const approvedCharacterSetsKeys = Object.keys(approvedCharacterSets);

        const password = generatePassword(16, "", approvedCharacterSets, approvedCharacterSetsKeys);
        const charactersSetsInPassword = new Set();
        const expected = new Set([
            lowercaseLetters.name,
            uppercaseLetters.name,
            numbers.name
        ]);

        for (const character of password) {
            const isLowercaseLetter = lowercaseLetters.characters.includes(character);
            const isUppercaseLetter = uppercaseLetters.characters.includes(character);
            const isNumber = numbers.characters.includes(character);
            const isSpecialCharacter = specialCharacters.characters.includes(character);
            
            if (isLowercaseLetter) charactersSetsInPassword.add(lowercaseLetters.name);
            else if (isUppercaseLetter) charactersSetsInPassword.add(uppercaseLetters.name);
            else if (isNumber) charactersSetsInPassword.add(numbers.name);
            else if (isSpecialCharacter) charactersSetsInPassword.add(specialCharacters.name);
            else charactersSetsInPassword.add("unknown");
        }
        
        expect(charactersSetsInPassword).toEqual(expected);
    });

    test("should generate password featuring 4 character sets", () => {
        promptSpy
            .mockReturnValueOnce("yes")
            .mockReturnValueOnce("yes")
            .mockReturnValueOnce("yes")
            .mockReturnValueOnce("yes");

        criteria.promptUserToApproveEachCharacterSet();
        const approvedCharacterSets = criteria.extractApprovedChracterSets();
        const approvedCharacterSetsKeys = Object.keys(approvedCharacterSets);

        const password = generatePassword(16, "", approvedCharacterSets, approvedCharacterSetsKeys);
        const charactersSetsInPassword = new Set();
        const expected = new Set([
            lowercaseLetters.name,
            uppercaseLetters.name,
            numbers.name,
            specialCharacters.name
        ]);

        for (const character of password) {
            const isLowercaseLetter = lowercaseLetters.characters.includes(character);
            const isUppercaseLetter = uppercaseLetters.characters.includes(character);
            const isNumber = numbers.characters.includes(character);
            const isSpecialCharacter = specialCharacters.characters.includes(character);
            
            if (isLowercaseLetter) charactersSetsInPassword.add(lowercaseLetters.name);
            else if (isUppercaseLetter) charactersSetsInPassword.add(uppercaseLetters.name);
            else if (isNumber) charactersSetsInPassword.add(numbers.name);
            else if (isSpecialCharacter) charactersSetsInPassword.add(specialCharacters.name);
            else charactersSetsInPassword.add("unknown");
        }
        
        expect(charactersSetsInPassword).toEqual(expected);
    });
});
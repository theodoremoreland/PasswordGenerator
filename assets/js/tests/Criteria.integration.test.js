/**
 * @jest-environment jsdom
 */
import CharacterSet from "../classes/CharacterSet.js";
import Criteria from "../classes/Criteria";

describe("Criteria class integration test suite", () => {
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

    numbers = new CharacterSet("numbers", "0123456789", true);

    specialCharacters = new CharacterSet("special characters", [
      " ",
      "!",
      '"',
      "#",
      "$",
      "%",
      "&",
      "'",
      "(",
      ")",
      "*",
      "+",
      ",",
      "-",
      ".",
      "/",
      ":",
      ";",
      "<",
      "=",
      ">",
      "?",
      "@",
      "[",
      "\\",
      "]",
      "^",
      "_",
      "`",
      "{",
      "|",
      "}",
      "~",
    ]);

    criteria = new Criteria([
      lowercaseLetters,
      uppercaseLetters,
      numbers,
      specialCharacters,
    ]);
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
    test("should set characterSets from constructor", () => {
      expect(criteria.characterSets.length).toEqual(4);
      expect(criteria.characterSets[0]).toStrictEqual(lowercaseLetters);
      expect(criteria.characterSets[1]).toStrictEqual(uppercaseLetters);
      expect(criteria.characterSets[2]).toStrictEqual(numbers);
      expect(criteria.characterSets[3]).toStrictEqual(specialCharacters);
    });
  });

  describe("Criteria promptUserForPasswordLength", () => {
    test("should set length after valid response from user", () => {
      promptSpy.mockImplementation(() => "19");

      criteria.promptUserForPasswordLength(8, 128);

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

    test("should show alert if user response is number BELOW DEFAULT range", () => {
      promptSpy.mockReturnValueOnce("7").mockReturnValueOnce("19");

      criteria.promptUserForPasswordLength();

      expect(promptSpy).toHaveBeenCalledTimes(2);
      expect(alertSpy).toHaveBeenCalledTimes(1);
    });

    test("should show alert if user response is number ABOVE DEFAULT range", () => {
      promptSpy.mockReturnValueOnce("129").mockReturnValueOnce("19");

      criteria.promptUserForPasswordLength();

      expect(promptSpy).toHaveBeenCalledTimes(2);
      expect(alertSpy).toHaveBeenCalledTimes(1);
    });

    test("should show alert if user response is number BELOW CUSTOM range", () => {
      promptSpy.mockReturnValueOnce("4").mockReturnValueOnce("19");

      criteria.promptUserForPasswordLength(5, 200);

      expect(promptSpy).toHaveBeenCalledTimes(2);
      expect(alertSpy).toHaveBeenCalledTimes(1);
    });

    test("should show alert if user response is number ABOVE CUSTOM range", () => {
      promptSpy.mockReturnValueOnce("201").mockReturnValueOnce("19");

      criteria.promptUserForPasswordLength(8, 200);

      expect(promptSpy).toHaveBeenCalledTimes(2);
      expect(alertSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Criteria promptUserToApproveEachCharacterSet", () => {
    test("should call characterSetPrompt for each CharacterSet", () => {
      promptSpy
        .mockReturnValueOnce("yes")
        .mockReturnValueOnce("yes")
        .mockReturnValueOnce("yes")
        .mockReturnValueOnce("yes");

      criteria.promptUserToApproveEachCharacterSet();

      expect(promptSpy).toHaveBeenCalledTimes(4);
    });

    test("should accept all valid approvals", () => {
      promptSpy
        .mockReturnValueOnce("YES")
        .mockReturnValueOnce("yes")
        .mockReturnValueOnce("y")
        .mockReturnValueOnce("1");

      criteria.promptUserToApproveEachCharacterSet();

      expect(promptSpy).toHaveBeenCalledTimes(4);
      expect(alertSpy).toHaveBeenCalledTimes(0);
    });

    test("should accept all valid disapprovals", () => {
      promptSpy
        .mockReturnValueOnce("NO")
        .mockReturnValueOnce("no")
        .mockReturnValueOnce("n")
        .mockReturnValueOnce("0");

      criteria.promptUserToApproveEachCharacterSet();

      expect(promptSpy).toHaveBeenCalledTimes(4);
      expect(alertSpy).toHaveBeenCalledTimes(0);
    });

    test("should reassign approval status for each CharacterSet to true when given valid approvals", () => {
      promptSpy
        .mockReturnValueOnce("YES")
        .mockReturnValueOnce("yes")
        .mockReturnValueOnce("y")
        .mockReturnValueOnce("1");

      criteria.promptUserToApproveEachCharacterSet();

      for (const characterSet of criteria.characterSets) {
        expect(characterSet.approved).toEqual(true);
      }
    });

    test("should reassign approval status for each CharacterSet to false when given valid disapprovals", () => {
      promptSpy
        .mockReturnValueOnce("NO")
        .mockReturnValueOnce("no")
        .mockReturnValueOnce("n")
        .mockReturnValueOnce("0");

      criteria.promptUserToApproveEachCharacterSet();

      for (const characterSet of criteria.characterSets) {
        expect(characterSet.approved).toEqual(false);
      }
    });

    test("should NOT accept INVALID response and INVALID response invokes alert", () => {
      promptSpy
        .mockReturnValueOnce("yeet")
        .mockReturnValueOnce("SHAZAM!")
        .mockReturnValueOnce("intredasting")
        .mockReturnValueOnce("yes")
        .mockReturnValueOnce("yes")
        .mockReturnValueOnce("yes")
        .mockReturnValueOnce("yes");

      criteria.promptUserToApproveEachCharacterSet();

      expect(promptSpy).toHaveBeenCalledTimes(7);
      expect(alertSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe("Criteria extractApprovedCharacterSets", () => {
    test("should return empty object if no CharacterSet was approved", () => {
      promptSpy
        .mockReturnValueOnce("NO")
        .mockReturnValueOnce("no")
        .mockReturnValueOnce("n")
        .mockReturnValueOnce("0");

      criteria.promptUserToApproveEachCharacterSet();

      const approvedCharacterSets = criteria.extractApprovedCharacterSets();
      const approvedCharacterSetsKeys = Object.keys(approvedCharacterSets);

      expect(approvedCharacterSetsKeys.length).toEqual(0);
    });

    test("should return object with two key/values if two CharacterSets were approved", () => {
      promptSpy
        .mockReturnValueOnce("NO")
        .mockReturnValueOnce("no")
        .mockReturnValueOnce("y")
        .mockReturnValueOnce("1");

      criteria.promptUserToApproveEachCharacterSet();

      const approvedCharacterSets = criteria.extractApprovedCharacterSets();
      const approvedCharacterSetsKeys = Object.keys(approvedCharacterSets);

      expect(approvedCharacterSetsKeys.length).toEqual(2);
    });

    test("should return object with the names of each CharacterSet that was approved", () => {
      promptSpy
        .mockReturnValueOnce("YES")
        .mockReturnValueOnce("yes")
        .mockReturnValueOnce("y")
        .mockReturnValueOnce("1");

      criteria.promptUserToApproveEachCharacterSet();

      const approvedCharacterSets = criteria.extractApprovedCharacterSets();
      const approvedCharacterSetsKeys = Object.keys(approvedCharacterSets);

      expect(approvedCharacterSetsKeys[0]).toEqual("lowercase letters");
      expect(approvedCharacterSetsKeys[1]).toEqual("uppercase letters");
      expect(approvedCharacterSetsKeys[2]).toEqual("numbers");
      expect(approvedCharacterSetsKeys[3]).toEqual("special characters");
    });

    test("should return object values containing the characters of each CharacterSet that was approved", () => {
      promptSpy
        .mockReturnValueOnce("YES")
        .mockReturnValueOnce("yes")
        .mockReturnValueOnce("y")
        .mockReturnValueOnce("1");

      criteria.promptUserToApproveEachCharacterSet();

      const approvedCharacterSets = criteria.extractApprovedCharacterSets();
      const approvedCharacterSetsValues = Object.values(approvedCharacterSets);

      expect(approvedCharacterSetsValues[0]).toEqual(
        lowercaseLetters.characters
      );
      expect(approvedCharacterSetsValues[1]).toEqual(
        uppercaseLetters.characters
      );
      expect(approvedCharacterSetsValues[2]).toEqual(numbers.characters);
      expect(approvedCharacterSetsValues[3]).toEqual(
        specialCharacters.characters
      );
    });
  });
});

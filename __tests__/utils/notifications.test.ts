import {InternalErrorRepository, isValidNotificationCallbackSuffix, splitCallbackIdSuffix} from "@/utils";
import {faker} from "@faker-js/faker";

describe("isValid_InternalNotificationCallbackSuffix", () => {
    it("should pass for \"-p\" and \"-s\"", () => {
        expect(isValidNotificationCallbackSuffix("-p")).toBe(true);
        expect(isValidNotificationCallbackSuffix("-s")).toBe(true);
    });
});

describe("splitNotificationIdSuffix", () => {
    it("should split notification id into \"shared id\" and \"suffix\"", () => {
        const sharedId = "000000";
        const suffix = "-p";
        const [id, suffixFromNotificationId] = splitCallbackIdSuffix(`${sharedId}${suffix}`);
        expect(id).toEqual(sharedId);
        expect(suffixFromNotificationId).toEqual(suffix);
    });
    it("should throw an error when id+suffix is two characters or fewer", () => {
        const sharedId = "";
        const suffix = "-p";
        const id = `${sharedId}${suffix}`;
        expect(() => {
            splitCallbackIdSuffix(id);
        }).toThrowError(InternalErrorRepository.util.splitNotificationIdSuffix.idTooShort(id));
    });
    it("should not throw an error when id+suffix is three characters or greater", () => {
        const sharedId = "";
        const suffix = "-p";
        //add 1 character to id
        const newId = `${sharedId}${faker.string.alphanumeric({length: 1})}`;
        expect(() => {
            splitCallbackIdSuffix(`${newId}${suffix}`);
        }).not.toThrow();
    });
});
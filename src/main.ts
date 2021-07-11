class Utils {
    name: string | undefined;

    constructor(name: string) {
        this.name = name;
    }

    static log(value: string) {
        console.log(value);
    }
}

export const getName = () => {};

export default Utils;

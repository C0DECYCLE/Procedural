/*
    Palto Studio
    Developed by Noah Bussinger
    2023
*/

const log = console.log;

const PHI: float = (1.0 + 5.0 ** 0.5) / 2.0;

function UUIDv4(): string {

    return (`${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`).replace(/[018]/g, (c: any) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}

interface Number {

    between(a: int | float, b: int | float): boolean;

    dotit(): string;

    clamp(min: int | float, max: int | float): float;
}

Number.prototype.between = function (a: int | float, b: int | float): boolean {

    return this.valueOf() > Math.min(a, b) && this.valueOf() < Math.max(a, b);
};

Number.prototype.dotit = function (): string {

    return Math.round(this.valueOf()).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

Number.prototype.clamp = function (min: int | float, max: int | float): float {

    return Math.min(Math.max(this.valueOf(), min), max);
};

interface String {

    firstLetterUppercase(): string;

    replaceAt(index: int, replacement: string): string;
}

String.prototype.firstLetterUppercase = function (): string {

    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.replaceAt = function (index: int, replacement: string): string {

    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
};

interface Array<T> {

    clear(): void;
}

Array.prototype.clear = function (): void {

    this.length = 0;
};
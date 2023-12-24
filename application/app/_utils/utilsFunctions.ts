export function removeSpecialChars(str: string): string {
    return str.replaceAll(/[^a-zA-Z0-9]/g, '_');
}

export function preventEnterSubmitting(event: React.KeyboardEvent): void {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
}

export function compareArray(array1: number[], array2: number[]): boolean {
    if (array1.length !== array2.length) {
        return false;
    }

    const set1: Set<number> = new Set(array1);
    const set2: Set<number> = new Set(array2);

    let result: boolean = true;
    set1.forEach((value: number) => {
        if (!set2.has(value)) {
            result = false;
            return;
        }
    });

    return result;
}
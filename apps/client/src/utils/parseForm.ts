export function formDataToJson(formData: FormData): Record<string, any> {
    const result: Record<string, any> = {};

    for (const [fullKey, value] of formData.entries()) {
        const keys = parseKeys(fullKey);
        assignNestedValue(result, keys, value);
    }

    return result;
}

// Parse keys like 'data.value[]' => ['data', 'value', '[]']
function parseKeys(key: string): string[] {
    const keys: string[] = [];
    const pattern = /([^[.\]]+)|\[\]/g;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(key))) {
        if (match[0] === '[]') {
            keys.push('[]');
        } else {
            keys.push(match[0]);
        }
    }

    return keys;
}

// Assign nested values based on parsed keys
function assignNestedValue(obj: Record<string, any>, keys: string[], value: any): void {
    let current: any = obj;

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const isLast = i === keys.length - 1;

        if (key === '[]') {
            if (!Array.isArray(current)) {
                throw new Error("Invalid structure: '[]' used without an array context.");
            }
            current.push(value);
            return;
        }

        if (isLast) {
            if (current[key] === undefined) {
                current[key] = value;
            } else if (Array.isArray(current[key])) {
                current[key].push(value);
            } else {
                current[key] = [current[key], value];
            }
        } else {
            const nextKey = keys[i + 1];
            if (nextKey === '[]') {
                if (!current[key]) current[key] = [];
                current = current[key];
            } else {
                if (!current[key] || typeof current[key] !== 'object') {
                    current[key] = {};
                }
                current = current[key];
            }
        }
    }
}

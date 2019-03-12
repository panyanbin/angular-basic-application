export function DateCompare(date1: Date, date2: Date, accuracy: 'date' | 'month' | 'year' | 'second' = 'date'): -1 | 0 | 1 {
    if (date1 === null) {
        return date2 === null ? 0 : -1;
    }
    if (date2 === null) {
        return 1;
    } else {
        //    两者都不为空
        switch (accuracy) {
            case 'second':
                return NumberCompare(Math.floor(date1.getTime() / 1000), Math.floor(date2.getTime() / 1000));
            case 'date':
                return NumberCompare(date1.getFullYear(), date2.getFullYear()) === 0 ?
                    NumberCompare(date1.getMonth(), date2.getMonth()) === 0 ?
                        NumberCompare(date1.getDate(), date2.getDate()) :
                        NumberCompare(date1.getMonth(), date2.getMonth()) :
                    NumberCompare(date1.getFullYear(), date2.getFullYear());
            case 'month':
                return NumberCompare(date1.getFullYear(), date2.getFullYear()) === 0 ?
                    NumberCompare(date1.getMonth(), date2.getMonth()) :
                    NumberCompare(date1.getFullYear(), date2.getFullYear());
            case 'year':
                return NumberCompare(date1.getFullYear(), date2.getFullYear());
        }
    }
}

export function NumberCompare(num1: number, num2: number): -1 | 0 | 1 {
    if (num1 === num2) {
        return 0;
    } else {
        return num1 > num2 ? 1 : -1;
    }
}

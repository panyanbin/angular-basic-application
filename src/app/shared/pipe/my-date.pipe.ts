import {Pipe, PipeTransform} from '@angular/core';

/***
 * 日期转换
 * value: 输入值为数字，日期Date对象，日期字符串
 * args: 参数为
 *      字符串'object'--输出值为Date对象；
 *      字符串‘dateTime’-输出日期和时间；
 *      字符串‘date’-输出日期；
 *      字符串‘time’-输出时间；
 */
@Pipe({
    name: 'myDatePipe',
})
export class MyDatePipe implements PipeTransform {

    transform(value: number | string | Date, args?: any): any {
        if (value === null) {
            return null;
        }
        switch (typeof value) {
            case 'number':
                if (+value === 0) {
                    return '';
                }
                if (args && args === 'object') {
                    return this.decode2DateObj(value);
                } else {
                    return this.obj2str(value, args);
                }
            case 'string':
                if (value === '') {
                    return '';
                }
                if (args && args === 'object') {
                    return this.decode2DateObj(value);
                } else {
                    return this.obj2str(value, args);
                }
            case 'undefined':
                return '';
            default:
                return this.dateObj2Str(value, args);
        }
    }


    obj2str(value: number | string | any, format: string) {
        const date = this.decode2DateObj(value);
        return this.dateObj2Str(date, format);
    }

    dateObj2Str(value: Date | any, format: string): string {
        let str = '';
        switch (format) {
            case 'dateTime':
                str += value.getFullYear() + '-' + this.addZero(value.getMonth() + 1) + '-' + this.addZero(value.getDate()) + ' ';
                str += this.addZero(value.getHours()) + ':' + this.addZero(value.getMinutes()) + ':' + this.addZero(value.getSeconds());
                break;
            case 'date':
                str = value.getFullYear() + '-' + this.addZero(value.getMonth() + 1) + '-' + this.addZero(value.getDate());
                break;
            case 'time':
                str += this.addZero(value.getHours()) + ':' + this.addZero(value.getMinutes()) + ':' + this.addZero(value.getSeconds());
                break;
            default:
                str += value.getFullYear() + '-' + this.addZero(value.getMonth() + 1) + '-' + this.addZero(value.getDate());
                break;
        }
        return str;
    }

    decode2DateObj(value: any): Date {
        return new Date(value);
    }

    addZero(value) {
        return (value <= 9 ? '0' : '') + value;
    }
}

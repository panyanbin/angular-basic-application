export interface User {
    userName?: string;
    headImgUrl?: string;
    email?: string;

    // tslint:disable-next-line:no-any
    [key: string]: any;
}

export interface Layout {
    /** 是否固定顶部菜单 */
    fixed: boolean;
    /** 是否折叠右边菜单 */
    collapsed: boolean;
    /** 是否固定宽度 */
    boxed: boolean;
    /** 语言环境 */
    lang: string;
    /** 当前主题 */
    theme: string;

    // tslint:disable-next-line:no-any
    [key: string]: any;
}

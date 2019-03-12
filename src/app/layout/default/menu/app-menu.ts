export class AppMenu {
    /**
     * 是否是分组名称
     */
    group?: boolean;
    text: string;
    textClass?: string;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 子项
     */
    children?: AppMenu[];
    /**
     * 路由地址
     */
    link?: string;

    /**
     * 是否在菜单中隐藏，用户无法在菜单中看到导航
     */
    hide?: boolean;

    /**
     * 是否禁用，禁用后是用户无权限访问，但是可以在菜单中看到
     */
    disable?: boolean;

    /**
     * 包含子项的菜单是否展开
     */
    open?: boolean;
    /**
     * 菜单是否为当前选中的祖先菜单
     */
    selected?: boolean;

    /**
     * 是否可选中的菜单项
     */
    selectable?: boolean;

    /**
     * 是否有红点徽标
     */
    badgeDot?: boolean;
    /**
     * 是否有红点数字徽标
     */
    badgeCount?: number;
    /**
     * 徽标的样式
     */
    badgeStatus?: string;

    [key: string]: any;
}

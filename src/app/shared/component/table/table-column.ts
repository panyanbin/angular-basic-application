export class TableColumn {
    /**
     * 是否是复选框列
     */
    checkBox?: boolean;
    /**
     * 列标题
     */
    title?: string;
    /**
     * 该列自定义模板渲染的头名称，如:
     *  <app-table>
     *       <ng-template appTableRowRef="age" type='title'>
     *           这个是自定义的表头，所在列为age列
     *       </ng-template>
     *   </app-table>
     * 该列的titleRender值为age
     *
     */
    titleRender?: string;
    /**
     * 设置列的定宽
     */
    width?: string;

    /**
     * 配置该列的相关属性
     * 如style:{
     *     'min-width': '200px',
     *     'height':'200px'
     * }
     *
     */
    style?: { [key: string]: any };

    /**
     * 配置了onClick项，则表示该项作为可点击事件按钮
     * 若是用render模板生成，则onClick无效
     *
     * row  当前该行的数据
     * index 当前所在行的索引
     * data   整个表格的所有数据
     * key     当前所在位置的key值
     *
     */
    onClick?: (row: any, index: number, data: any, key: any) => void = null;
    /**
     * 该列所在数据列表中的字段名，若是多层对象，可用逗号隔开
     * 如: data.user.name
     */
    key?: string;

    /**
     * 字符串模板或函数格式化该列的值
     *
     * 格式化为字符串模板，可用${}来占位数据，参数为row和index
     * 如："该字段为格式化的内容，姓名为${row.name}，年龄为：${row.age}，所在第${index}行"；
     *
     * 格式化为函数时，则显示该函数的返回值，参数分别为
     * row  当前该行的数据
     * index 当前所在行的索引
     * data   整个表格的所有数据
     * key     当前所在位置的key值
     *
     *
     * 如需更复杂的处理，可以render来处理
     *
     */
    format?: string | ((row: any, index: number, data: any, key: any) => string | number);

    /**
     * 该列自定义模板渲染的名称，如:
     *  <app-table>
     *       <ng-template appTableRowRef="age" let-item="item" let-index="index">
     *           {{item.age}}
     *       </ng-template>
     *   </app-table>
     * 该列的render值为age
     *
     */
    render?: string;
}

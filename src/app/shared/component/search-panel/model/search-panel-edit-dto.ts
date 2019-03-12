export class SearchPanelEditDto {
    type: 'data' | 'insertItem' | 'removeItem';
    data: { [name: string]: any };
}

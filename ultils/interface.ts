export interface headerOptionsData {
    id: number,
    title: string,
    children: headerOptionChildrenData[]
}

export interface headerOptionChildrenData {
    path: string | number | readonly string[] | undefined
    id: number,
    title: string
}
/**
 * Request
 */
export interface ResponseData<T> {
    code: number;
    data: T;
    msg: string;
    [property: string]: any;
}

export interface BlogTagItem {
    createDate: string;
    editorType: number;
    enable: boolean;
    id: string;
    tagDesc: string;
    tagImg: string;
    tagName: string;
    updateDate: string;
    [property: string]: any;
}

export interface PageData<T> {
    list: T;
    total: number;
    [property: string]: any;
}

export interface BlogItem {
    blogDesc: string;
    blogTitle: string;
    coverUrl: string;
    createDate: string;
    discussCount: number;
    editorType: number;
    enable: boolean;
    id: string;
    tagsList: BlogTagItem[];
    updateDate: string;
    blogContent?: string,
    [property: string]: any;
}
export interface _Menu {
    title:    string;
    icon:     string;
    target:   string;
    url?:     string;
    submenu?: _Submenu[];
}

export interface _Submenu {
    title: string;
    url:   string;
}
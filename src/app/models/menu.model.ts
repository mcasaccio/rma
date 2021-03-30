export class Menu {
  constructor(
    public title: string,
    public icon: string,
    public target: string,
    public url?: string,
    public submenu?: Submenu[]
  ) {}
}
export class Submenu {
  constructor(
    public title: string,
    public url?: string,
  ) {}
}
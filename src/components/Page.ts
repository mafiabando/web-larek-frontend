import { Component } from "./base/Component";
import { IEvents } from "./base/events";
import { ensureElement } from "../utils/utils";
import { IPage } from "../types";

export class Page extends Component<IPage> {
    protected _basketCounter: HTMLElement;
    protected _gallery: HTMLElement
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this._basketCounter = ensureElement<HTMLElement>('.header__basket-counter', this.container)
        this._gallery = ensureElement<HTMLElement>('.gallery', this.container)
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper', this.container)
        this._basket = ensureElement<HTMLElement>('.header__basket', this.container)
    
        this._basket.addEventListener('click', () => {
            this.events.emit('basket:open')
        });
    }

    set basketCounter(value: number) {
        this.setText(this._basketCounter, value)
    }

    set gallery(items: HTMLElement[]) {
        this._gallery.replaceChildren(...items);
    }

    set locked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('page__wrapper_locked')
        } else {
            this._wrapper.classList.remove('page__wrapper_locked')
        }
    }
}
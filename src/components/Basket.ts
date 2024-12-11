import { Component } from "./base/Component";
import { cloneTemplate, createElement, ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { IBasket } from "../types";

export class Basket extends Component<IBasket> {
    static template = ensureElement<HTMLTemplateElement>('#basket');

    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;


    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.events = events;

        this._list = this.container.querySelector('.basket__list')
        this._total = this.container.querySelector('.basket__price')
        this._button = this.container.querySelector('.basket__button')

        if (this._button) {
            this._button.addEventListener('click', () => {
                this.events.emit('order:open');
            });
        }
    
        this.items = [];
    }
    toggleButtonState(state: boolean) {
        this.setDisabled(this._button, state)
    }

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
            this.toggleButtonState(false)
		} else {
			this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
			})); 
            this.toggleButtonState(true)
		}
	}

    set total(total: number) {
		this.setText(this._total, `${total} синапсов`);
	}

}
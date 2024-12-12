import { Form } from "./common/Form";
import { IEvents } from "./base/events";
import { TOrderDeliveryDataForm, TPayment} from "../types";
import { ensureElement } from "../utils/utils";

export class OrderDelivery extends Form<TOrderDeliveryDataForm> {
    protected _address: HTMLInputElement;
    protected _payMethod: TPayment;
    protected _buttonCard: HTMLButtonElement;
	protected _buttonCash: HTMLButtonElement;
    protected _buttonPay: HTMLButtonElement;
    
    constructor (container: HTMLFormElement, events: IEvents) {
        super(container, events)
        
        this._buttonCard = ensureElement<HTMLButtonElement>('.button_alt[name=card]', this.container);
        this._buttonCash = ensureElement<HTMLButtonElement>('.button_alt[name=cash]', this.container);
        this._buttonPay = this.container.querySelector('.order__button');
        this._address = ensureElement<HTMLInputElement>('.form__input[name=address]', this.container);
        
        this._buttonCard.addEventListener('click', () => {
            events.emit('order:changed', {
                payment: this._buttonCard.name,
                button: this._buttonCard
            });
        });
        
        this._buttonCash.addEventListener('click', () => {
            events.emit('order:changed', {
                payment: this._buttonCash.name,
                button: this._buttonCash
            });
        });
    }

    set address(value:string) {
        this._address.value = value;
    } 

    toggleButtonPay(value: HTMLElement) {
        this.toggleClass(this._buttonCard, 'button_alt-active', value === this._buttonCard);
        this.toggleClass(this._buttonCash, 'button_alt-active', value === this._buttonCash);
        if (value) {
            this._buttonPay.disabled = false
        } else {
            this._buttonPay.disabled = true
        }
    }
}

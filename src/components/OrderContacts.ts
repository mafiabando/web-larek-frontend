import { Form } from "./common/Form";
import { IEvents } from "./base/events";
import { TOrderUserDataForm } from "../types";
import { ensureElement } from "../utils/utils";

export  class OrderContacts extends Form<TOrderUserDataForm> {
    protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;
    protected _buttonPay: HTMLButtonElement;
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);


        this._phone = ensureElement<HTMLInputElement>('.form__input[name=phone]', this.container);
        this._email = ensureElement<HTMLInputElement>('.form__input[name=email]', this.container);
        this._buttonPay = this.container.querySelector('.button');

        this._email.addEventListener('input', () => this.checkFormValidity());
        this._phone.addEventListener('input', () => this.checkFormValidity());
    }

    set phoneNumber(value: string) {
        this._phone.value = value;
        this.checkFormValidity()
    }

    set email(value: string) {
        this._email.value = value;
        this.checkFormValidity()
    }


    private checkFormValidity() {
        const isEmailFilled = this._email.value.trim() !== '';
        const isPhoneFilled = this._phone.value.trim() !== '';
        this.toggleButtonPay(isEmailFilled && isPhoneFilled);
    }

    private toggleButtonPay(isEnabled: boolean) {
        this._buttonPay.disabled = !isEnabled;
    }
}



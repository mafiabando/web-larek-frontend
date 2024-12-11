import { Component } from "./base/Component";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { TModalSuccess } from "../types";

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<TModalSuccess> {
    protected _total: HTMLElement;
    protected _closeButton: HTMLButtonElement;

    constructor (container: HTMLElement, events: IEvents, actions: ISuccessActions) {
        super(container, events);

        this._total = ensureElement<HTMLElement>('.order-success__description', this.container);
        this._closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        this._closeButton.addEventListener('click', actions.onClick);
    }

    set total(value: number) {
        this.setText(this._total, `Списано ${value} синапсов`);
    }
}
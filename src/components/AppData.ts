import { IBasket, IProduct, TPayment, TOrder } from "../types";
import { IEvents } from "./base/events";
import { TformErrors } from "../types";

export class AppState {
    items: IProduct[] = [];
    preview: IProduct | null = null;
    basket: IBasket = {
        items: [],
        total: 0
    };
    order: TOrder = {
        payMethod: null,
        address: '',
        email: '',
        phoneNumber: ''
    };
    formErrors: TformErrors = {};

    constructor(protected events: IEvents) {}

    setProducts(items: IProduct[]) {
        this.items = items;
        this.events.emit('products:changed', this.items);
    }

    setPreview(item: IProduct) {
        this.preview = item;
        this.events.emit('preview:changed', this.preview);
    }

    addProduct(item: IProduct) {
        this.basket.items.push(item.id);
        this.basket.total += item.price;
        this.events.emit('basket:changed', this.basket);
    }

    deleteProduct(item: IProduct) {
        this.basket.items = this.basket.items.filter((productId) => productId !== item.id);
        this.basket.total -= item.price;
        this.events.emit('basket:changed', this.basket);
    }

    isInBasket(item: IProduct) {
        return this.basket.items.includes(item.id)
    }

    clearBasket() {
        this.basket.items = [];
        this.basket.total = 0;
        this.events.emit('basket:changed', this.basket);
    }

    setPayMethod(value: TPayment) {
        this.order.payMethod = value;
    }

    setOrderField(field: keyof TOrder, value: string) {
        if (field === "payMethod") {
        this.setPayMethod(value as TPayment)
        } else {
            this.order[field] = value
        }
    }

    validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phoneNumber) {
            errors.phoneNumber = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    clearOrder() {
        this.order.payMethod = null,
        this.order.address = '',
        this.order.email = '',
        this.order.phoneNumber = ''
    }
}

export interface IPage {
    container: HTMLElement[];
    basketCounter: number | null;
    locked: boolean;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IOrder {
    payMethod: TPayment;
    address: string;
    email: string;
    phoneNumber: string;
    total: number;
    items: string[];
}

export interface IOrderResult {
    id: string;
}

export interface IBasket {
    items: string[];
    total: number;
    selected?: string[];
}

export type TformErrors = Partial<Record<keyof TOrder, string>>
export type TPayment = 'card' | 'cash'
export type TOrderDeliveryDataForm = Pick<IOrder, 'payMethod' | 'address' | null>
export type TOrderUserDataForm = Pick<IOrder, 'email' | 'phoneNumber' | null>
export type TOrder = Omit<IOrder, 'items' | 'total'>
export type TModalSuccess = Pick<IBasket, 'total'>


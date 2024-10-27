interface IPage {
    container: HTMLElement[];
    basket: number | null;
}

interface IProduct {
    _id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: Number;
}

interface IProductData {
    products: IProduct[];
    preview: string | null;
    getProduct(id: string): IProduct;
}

interface IOrder {
    payMethod: TPayment;
    address: string;
    email: string;
    phoneNumber: string;
    total: number;
    items: string[];
}

interface IOrderData{
    paymentData: TOrderDeliveryDataForm;
    userData: TOrderUserDataForm;
    setOrderData(order: IOrder): void;
    CheckValidationDeliveryData(data: Record<keyof TOrderDeliveryDataForm, string>):boolean;
    CheckValidationUserData(data: Record<keyof TOrderUserDataForm, string>):boolean;
}

interface IBasket {
    items: IProduct[];
    total: number;
}

interface IBasketData {
    basketData: TBasketModal;
    addProduct(product: IProduct): void;
    deleteProduct(id: string): void;
    getTotalPrice(): number;
    clear(): void;
}

type TPayment = 'Online' | 'Offline' | null
type TOrderDeliveryDataForm = Pick<IOrder, 'payMethod' | 'address' | null>
type TOrderUserDataForm = Pick<IOrder, 'email' | 'phoneNumber' | null>
type TProductDataModal = Pick<IProduct, 'description'| 'image'| 'title'| 'category' | 'price'>
type TBasketModal = Pick<IBasket, 'total' | 'items'>
type TModalSuccess = Pick<IBasket, 'total'>


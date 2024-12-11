import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { ensureElement, cloneTemplate } from './utils/utils';
import { API_URL, CDN_URL } from './utils/constants';
import { LarekAPI } from './components/LarekApi';
import { AppState } from './components/AppData';
import { Modal } from './components/common/Modal';
import { Page } from './components/Page';
import { Card } from './components/Card';
import { Basket } from './components/Basket';
import { OrderDelivery } from './components/OrderDelivery';
import { OrderContacts } from './components/OrderContacts';
import { Success } from './components/SuccessModal';
import { IProduct, TOrder, TPayment } from './types';

const events = new EventEmitter()
const api = new LarekAPI(CDN_URL, API_URL)

events.onAll(({eventName, data}) => {
    console.log(eventName, data);
})

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const modalCardTemplate = ensureElement<HTMLTemplateElement>('#modal-container');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const appData = new AppState(events)

const page = new Page(document.body, events)
const modal = new Modal(modalCardTemplate, events)
const basket = new Basket(cloneTemplate(Basket.template), events)
const orderDelivery = new OrderDelivery(cloneTemplate(orderTemplate), events)
const orderContacts = new OrderContacts(cloneTemplate(contactsTemplate), events)
const success = new Success(cloneTemplate(successTemplate), events, {
    onClick: () => {
        modal.close();
    }
})

api.getProductList().then(appData.setProducts.bind(appData)).catch(console.error)


events.on('modal:open', () => {
    page.locked = true;
});

events.on('modal:close', () => {
    page.locked = false;
});

events.on('card:select', (item: IProduct) => {
    appData.setPreview(item);
})

events.on('products:changed', (items: IProduct[]) => {
    page.gallery = items.map(item => {
        const card = new Card(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item)
        });
        return card.render(item);
    });
});

events.on('preview:changed', (item: IProduct) => {
	const card: Card = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			if (!appData.isInBasket(item)) {
				appData.addProduct(item);
			}
        },
	});
	modal.render({ content: card.render(item) });
});

events.on('basket:changed', (item: IProduct) => {
    page.basketCounter = appData.basket.items.length
	basket.items = appData.basket.items.map((id) => {
		const item = appData.items.find((item) => item.id === id);
		const card = new Card(cloneTemplate(cardBasketTemplate), {
			onClick: () => appData.deleteProduct(item),
			});
		return card.render(item);
	});
    basket.total = appData.basket.total
});

events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

events.on('order:open', () => {
    appData.clearOrder();
    modal.render({
        content: orderDelivery.render({
            payMethod: 'card',
            address: '',
            valid: false,
            errors: ''
        })
    });
})

events.on('order:changed', (data: {payment: TPayment, button: HTMLElement}) => {
    appData.setPayMethod(data.payment);
    orderDelivery.toggleButtonPay(data.button);
})

events.on(
	/^order:change$/,
	(data: { field: keyof TOrder; value: string }) => {
		appData.setOrderField(data.field, data.value);
		appData.validateOrder();
	}
);

events.on('orderFormErrors:change', (errors: Partial<TOrder>) => {
    const { payMethod, address } = errors;
    orderDelivery.valid = !payMethod && !address;
    orderDelivery.errors = Object.values({payMethod, address}).filter(i => !!i).join('; ');
});

events.on('order:submit', () => {
    modal.render({
        content: orderContacts.render({
            email: '',
            phoneNumber: '',
            valid: false,
            errors: ''
        })
    });
})

events.on('contacts:submit', () => {
    modal.render({
        content: success.render({
            total: basket.total 

        })
    });

    events.on('contactsFormErrors:change', (errors: Partial<TOrder>) => {
        const { email, phoneNumber } = errors;
        orderContacts.valid = !email && !phoneNumber;
        orderContacts.errors = Object.values({phoneNumber, email}).filter(i => !!i).join('; ');
    });
})

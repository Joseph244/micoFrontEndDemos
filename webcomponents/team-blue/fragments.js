/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window, CustomEvent */

// 生命周期回调
// connectedCallback: 当自定义元素第一次被连接到文档DOM时被调用。
// disconnectedCallback: 当自定义元素与文档DOM断开连接时被调用。
// adoptedCallback: 当自定义元素被移动到新文档时被调用。
// attributeChangedCallback: 当自定义元素的一个属性被增加、移除或更改时被调用。
(function fragments() {
  const prices = {
    t_porsche: '66,00 €',
    t_fendt: '54,00 €',
    t_eicher: '58,00 €',
  };

  const state = {
    count: 0,
  };

  class BlueBasket extends HTMLElement {
    // 自定义元素第一次被连接到文档DOM时被调用
    connectedCallback() {
      this.refresh = this.refresh.bind(this);
      this.log('connected');
      this.render();
      window.addEventListener('blue:basket:changed', this.refresh);
    }
    refresh() {
      this.log('event recieved "blue:basket:changed"');
      this.render();
    }
    render() {
      const classname = state.count === 0 ? 'empty' : 'filled';
      this.innerHTML = `
        <div class="${classname}">basket: ${state.count} item(s)</div>
      `;
    }
    // 当自定义元素与文档DOM断开连接时被调用
    disconnectedCallback() {
      window.removeEventListener('blue:basket:changed', this.refresh);
      this.log('disconnected');
    }
    log(...args) {
      console.log('🛒 blue-basket', ...args);
    }
  }
  window.customElements.define('blue-basket', BlueBasket);


  class BlueBuy extends HTMLElement {
    static get observedAttributes() {
      return ['sku'];
    }
    connectedCallback() {
      this.addToCart = this.addToCart.bind(this);
      const sku = this.getAttribute('sku');
      this.log('connected', sku);
      this.render();
      this.firstChild.addEventListener('click', this.addToCart);
    }
    addToCart() {
      state.count += 1;
      this.log('event sent "blue:basket:changed"');
      this.dispatchEvent(new CustomEvent('blue:basket:changed', {
        bubbles: true,
      }));
    }
    render() {
      const sku = this.getAttribute('sku');
      const price = prices[sku];
      this.innerHTML = `<button type="button">buy for ${price}</button>`;
    }
    // 当自定义元素的一个属性被增加、移除或更改时被调用。
    attributeChangedCallback(attr, oldValue, newValue) {
      this.log('attributeChanged', attr, oldValue, newValue);
      this.render();
    }
    disconnectedCallback() {
      this.firstChild.removeEventListener('click', this.addToCart);
      const sku = this.getAttribute('sku');
      this.log('disconnected', sku);
    }
    log(...args) {
      console.log('🔘 blue-buy', ...args);
    }
  }
  window.customElements.define('blue-buy', BlueBuy);
}());

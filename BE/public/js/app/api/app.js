//singleton

class AppApi {
  user;
  category;
  product;
  productInfo;
  home;
  cart;
  order;

  get Order() {
    if (this.order === undefined) this.order = new OrderApi();
    return this.order;
  }

  get Cart() {
    if (this.cart === undefined) this.cart = new CartApi();
    return this.cart;
  }
  get User() {
    if (this.user === undefined) this.user = new UserApi();
    return this.user;
  }
  get Product() {
    if (this.product === undefined) this.product = new ProductApi();
    return this.product;
  }

  get ProductInfo() {
    if (this.productInfo === undefined) this.productInfo = new ProductInfoApi();
    return this.productInfo;
  }

  get Category() {
    if (this.category === undefined) this.category = new CategoryApi();
    return this.category;
  }
  get Home() {
    if (this.home === undefined) this.home = new HomeApi();
    return this.home;
  }
}

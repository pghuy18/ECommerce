class HomeApi extends BaseApi {
  url;
  constructor() {
    super();
    this.url = "";
  }
  COVID() {
    return this.client.get(`http://168.63.133.155/api/Covid/GetCityList`);
  }
  VIETNAM() {
    return this.client.get(`/vietnam`);
  }
  GET(params = "") {
    return this.client.get(`/detail/${params}`);
  }
  PAGE(params = 1) {
    return this.client.get(`/page/$w{params}`);
  }
}

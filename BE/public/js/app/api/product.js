class ProductApi extends BaseApi {
  url;
  constructor() {
    super();
    this.url = "/product";
  }
  PAGE(p) {
    return this.client.get(`/page/${p}`);
  }
  SEARCH(frm) {
    return this.client.post(`/search`, frm);
  }
  DELETE(params = "") {
    return this.client.delete(`${this.url}/${params}`);
  }
  PUT(frm) {
    return this.client.put(this.url, frm);
  }
  POST(frm) {
    //console.log("body", body);
    return this.client.post(this.url, frm);
  }
  GET(params = "") {
    // console.log(this.baseURL);
    return params ? this.client.get(`${this.url}/${params}`) : this.client.get(this.url);
  }
}

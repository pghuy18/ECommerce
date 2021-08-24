class UserApi extends BaseApi {
  url;
  constructor() {
    super();
    this.url = "/user";
  }
  CHANGE_PASSWORD(frm) {
    return this.client.patch(`/profile`, frm);
  }
  UPDATE_PROFILE(frm) {
    return this.client.put(`/profile`, frm);
  }
  PROFILE() {
    return this.client.get(`/profile`);
  }
  LOGOUT() {
    return this.client.post("/logout");
  }
  LOGIN(frm) {
    return this.client.post("/login", frm);
  }
  REGISTER(frm) {
    return this.client.post("/register", frm);
  }
  DELETE(params = "") {
    return this.client.delete(`${this.url}/${params}`);
  }
  PATCH(frm) {
    return this.client.patch(this.url, frm);
  }
  PUT(frm) {
    return this.client.put(this.url, frm);
  }
  POST(frm) {
    return this.client.post(this.url, frm);
  }
  GET() {
    return this.client.get(`${this.url}`);
  }
}

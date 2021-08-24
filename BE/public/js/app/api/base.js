class BaseApi {
  client;
  constructor() {
    let href = document.location.href;
    this.client = axios.create({
      baseURL: href.substr(0, href.indexOf("/", href.indexOf("//") + 3)) + "/api",
      headers: {
        "content-type": "application/json",
        // "Content-Security-Policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",
      },
      paramsSerializer: (params) => Qs.stringify(params),
    });
    this.client.interceptors.request.use(async (config) => {
      // console.log("Axios request", config);
      //handle token here
      return config;
    });

    this.client.interceptors.response.use(
      (res) => {
        //console.log("Axios respone", res);
        //console.log("check res client axios ", res);
        if (res && res.data) {
          //console.log("data res", res.data);
          return res.data;
        }
      },
      (error) => {
        // console.log("respone error 1", error.config);
        // console.log("respone error 2", error.message);
        // console.log("respone error 3", error.response.data);
        if (error.response.data) return error.response.data;
        //throw new Error(error.config);
      }
    );
  }
}

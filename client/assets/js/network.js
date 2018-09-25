import Store from '../../store/index';

const Network = {
  lifeUrl: Store.state.httpServer,
  exitUrl: Store.state.exitHttpServer,
  lifeAppend : {
    token : 'vh8K9VeQn3W',
    mode : 'androidmode'
  },
  action: {
    empty: '',
    login: 'api/user/login',
    logout: 'api/user/logout',
    leadContacts: 'api/contact/GetContactList',
    updateContact: 'api/contact/SaveMainContactInfo',
    leadContactsDetail: '/api/contact/GetContactDetail',
    listings: '/api/property/GetPropertyList',
    listingDetails: '/api/property/GetPropertyDetail',
    GetLastLoginCounts: '/API/Home/GetLastLoginCounts',
    documents: 'API/Documents/AllActive', 
    marketplace: 'API/SupplierOffer/GetSupplierOfferList',
    WebAPI_DeleteContactMethod: 'API/Contact/WebAPI_DeleteContactMethod',
    WebAPI_InsUpdContactMethod: 'API/Contact/WebAPI_InsUpdContactMethod',
    GetDocuments: 'API/Documents/GetDocuments',
    GetToDoGridList: 'API/Home/GetToDoGridList',
    AddToDoItem: 'API/Home/AddToDoItem?hubType=User',
    CheckToDoItem: 'API/Home/CheckToDoItem',
    GetOfficesByUserName: 'API/Property/GetOfficesByUserName',
    GetAgentsByUserNameAndOffice: 'API/Property/GetAgentsByUserNameAndOffice',
    getUserNotificationList: 'API/Notifications/GetUserNotificationList',
    GetUserPermissionList: 'API/User/GetUserPermissionList',
    GetAgentMLSIDs: 'API/User/GetAgentMLSIDs',
    removeNotification: 'API/Notifications/RemoveNotification'
    
  },
  responseType: {
    text: "",
    arrayBuffer: "arraybuffer",
    blob: "blob",
    document: "document",
    json: "json",
    xml: "xml"
  },
  requestType: {
    json: "application/json",
    xml: "application/xml",
    form: "multipart/form-data",
    formUrlEncoded: "application/x-www-form-urlencoded"
  },
  requestMethod: {
    post: "POST",
    get: "GET",
    put: "PUT",
    delete: "DELETE"
  },
  prepareParameters(data)
  {
    var returnQuery = "";
    for(var index in data)
    {
      returnQuery += `&${index}=${encodeURIComponent(data[index])}`;
    }
    return '?' + returnQuery.substring(1);
  },
  createCordovaHttp(url, action, method, options, sendData)
  {
    if(this.action.login == action)
    {
      cordova.plugin.http.useBasicAuth(sendData.roster, sendData.password);
    }
    else if (Store.getters.getUserToken != null)
    {
      cordova.plugin.http.setHeader('Authorization', "Bearer " + Store.getters.getUserToken);
    }

    var dataToSend = method == 'GET' ? {} : sendData;

   

    cordova.plugin.http[method.toLowerCase()](url + action,
      dataToSend,
      {'Content-type': 'application/json'},
      (response) => {
        try {
          if (response.status == 200)
          {
            return options.successCallback(JSON.parse(response.data));
          }
          else if (response.status == 401) // NOT AUTHOTIZED DELETE USER SESSION and send to login
          {
            if(this.action.login == action)
            {
              options.errorCallback(JSON.parse(response.data));
            }
            else
            {
              Store.dispatch('logOutUser');
            }
            return;
          }
          options.errorCallback(response.error);
        }
        catch (e)
        {
          alert("catch");
          alert(JSON.stringify(e));
        }

      }, (response) => {
        if (response.status == 401) // NOT AUTHOTIZED DELETE USER SESSION and send to login
        {
          if(this.action.login == action)
          {
            options.errorCallback(response.error);
          }
          else
          {
            Store.dispatch('logOutUser');
          }
          return;
        }
        options.errorCallback(response.error);
      }
    );

  },
  createConnection(url, action, method, options, sendData)
  {
    if (isPhoneGap()) {
      if (Store.state.internetOnline == false && Store.state.deviceReady == true) {
        return null;
      }
      else {
      }
    }

    var xhr = new XMLHttpRequest();

    if (options.hasOwnProperty('successCallback')) {
      xhr.addEventListener("load", () => {
        if (xhr.status == 200) {

          if(options.responseType == 'xml')
          {
            options.successCallback(xhr.responseXML);
          }
          else
          {
            options.successCallback(xhr.response);
          }

          return;
        }
        else if (xhr.status == 401) // NOT AUTHOTIZED DELETE USER SESSION and send to login
        {
          if(this.action.login == action)
          {
            options.errorCallback(xhr.statusText);
          }
          else
          {
            Store.dispatch('logOutUser');
          }
          return;
        }
        options.errorCallback(xhr.response);
      });
    }

    if (options.hasOwnProperty('progressCallback')) {
      xhr.addEventListener("progress", event => {
        if (event.lengthComputable) {
          options.progressCallback(Math.round((event.loaded / event.total) * 100));
        }
      });

      xhr.addEventListener("load", () => {
        options.progressCallback(100);
      });

      xhr.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          options.progressCallback(Math.round((event.loaded / event.total) * 100));
        }
      });

      xhr.upload.addEventListener("load", () => {
        options.progressCallback(100);
      });
    }


    if (options.hasOwnProperty('errorCallback')) {
      xhr.upload.addEventListener("error", () => {
        options.errorCallback(xhr.response);
      });

      xhr.addEventListener("error", () => {
        options.errorCallback(xhr.response);
      });
    }

    //============================================================================//

    xhr.open(method, url + action, true);
    //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    if(this.action.login == action)
    {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(sendData.roster + ':' + sendData.password));
    }
    else if (Store.getters.getUserToken != null)
    {
      xhr.setRequestHeader("Authorization", "Bearer " + Store.getters.getUserToken);
    }

    if (options.hasOwnProperty('requestType'))
    {
      if (options.requestType != this.requestType.form)
      xhr.setRequestHeader("Content-type", options.requestType);
    }
    else
    {
      xhr.setRequestHeader("Content-type", this.requestType.json);
    }

    if (options.hasOwnProperty('responseType'))
    {
      xhr.responseType = options.responseType;
    }
    else
    {
      xhr.responseType = this.responseType.json;
    }

    return xhr;
  },
  prepareData(sendData, options)
  {
    var preparedData = sendData;
    if (!(sendData instanceof FormData) && typeof sendData === 'object')
    {
      preparedData = JSON.stringify(preparedData);
    }
    return preparedData;
  },
  get(url, action, sendData, options)
  {

    if(this.action.login != action && sendData != null)
    {
      action += this.prepareParameters(sendData);
    }

    if(this.lifeUrl == url)
    {
      action += this.prepareParameters(this.lifeAppend).replace('?','&');
    }

    if(Store.state.deviceReady == true && this.exitUrl == url)
    {
      return this.createCordovaHttp(url, action, this.requestMethod.get, options, sendData);
    }


    let xhr = this.createConnection(url, action, this.requestMethod.get, options, sendData);
    if (xhr != null)
    xhr.send(null);
  },
  post(url, action, sendData, options)
  {
    if(Store.state.deviceReady == true  && this.exitUrl == url)
    {
      return this.createCordovaHttp(url, action, this.requestMethod.post, options, sendData);
    }

    var preparedData = this.prepareData(sendData, options);
    let xhr = this.createConnection(url, action, this.requestMethod.post, options, sendData);
    if (xhr != null)
    xhr.send(preparedData);
  },
  put(url, action, sendData, options)
  {
    if(Store.state.deviceReady == true  && this.exitUrl == url)
    {
      return this.createCordovaHttp(url, action, this.requestMethod.put, options, sendData);
    }

    var preparedData = this.prepareData(sendData, options);
    let xhr = this.createConnection(url, action, this.requestMethod.put, options, sendData);
    if (xhr != null)
    xhr.send(preparedData);
  },
  delete(url, action, sendData, options)
  {
    if(Store.state.deviceReady == true  && this.exitUrl == url)
    {
      return this.createCordovaHttp(url, action, this.requestMethod.delete, options, sendData);
    }

    var preparedData = this.prepareData(sendData, options);
    let xhr = this.createConnection(url, action, this.requestMethod.delete, options, sendData);
    if (xhr != null)
    xhr.send(preparedData);
  }
}

export default Network

const createRequest = (options = {}) => {
    let xhr = new XMLHttpRequest,     
        formData = new FormData;
        optionsData = options.data,
        url = options.url,
        method = options.method;

    xhr.withCredentials = true;
    xhr.responseType = options.responseType;

    if(options.method === 'GET'){
      url += '?';      
      for (let key in optionsData) {        
        url += `${key}=${optionsData[key]}&`;
      };
      url = url.substring(0, url.length - 1);
    } else {
      for (let key in optionsData) {
        formData.append(key, optionsData[key]);
      }
    }    

    xhr.open(method, url);

    try {
      if(method === 'GET'){      
        xhr.send();
      } else {
        xhr.send(formData);
      };

      xhr.addEventListener('load', () => {
        options.callback(xhr.response.error, xhr.response);    
      });
    } catch (error) {
      options.callback(error);    
    }
    
    return xhr
  };
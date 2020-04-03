const createRequest = (options = {}) => {
    let xhr = new XMLHttpRequest,     
        formData = new FormData;
        data = options.data,
        url = options.url,
        method = options.method,
        headers = options.headers;        

    xhr.withCredentials = true;
    xhr.responseType = options.responseType;

    if(options.method === 'GET'){
      url += '?';      
      for (let key in data) {        
        url += `${key}=${data[key]}&`;
      };
    } else {
      for (let key in data) {
        formData.append(`${key}`, `${data[key]}`);
      }
    }
    
    xhr.open(method, url);

    let xhrHeaderKey,
        xhrHeader;

    for (let key in headers) {
      xhrHeaderKey = key;
      xhrHeader = headers[key];
    }

    xhr.setRequestHeader(`${xhrHeaderKey}`, `${xhrHeader}`);

    try {
      if(method === 'GET'){      
        xhr.send();
      } else {
        xhr.send(formData);
      };

      xhr.addEventListener('load', () => {        
        options.callback(null, xhr.response);            
      });
    } catch (error) {
      options.callback(error);    
    }

    return xhr
  };

  const xhr = createRequest({
    url: 'http://localhost:8000', // адрес
    headers: { // произвольные заголовки, могут отсутствовать
      'Content-type': 'application/json' 
    },
    data: { // произвольные данные, могут отсутствовать
      username: 'demo@demo',
      password: 'demo'
    },
    // responseType: 'json', // формат, в котором необходимо выдать результат
    method: 'GET', // метод запроса
    /*
      Функция, которая сработает после запроса.
      Если в процессе запроса произойдёт ошибка, её объект
      должен быть в параметре err.
      Если в запросе есть данные, они должны быть переданы в response.
    */
    callback: (err, response) => {
      console.log( 'Ошибка, если есть', err );
      console.log( 'Данные, если нет ошибки', response );
    }
  });
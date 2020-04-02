const createRequest = (options = {}) => {
    let responseType = options.responseType,
        callback = options.callback,
        headers = options.headers,
        method = options.method,
        url = options.url,
        xhrHeaderKey,
        xhrHeaderType,
        userPassword,
        userMail;
        
    for (const header in headers) {
        xhrHeaderKey = `${header}`;
        xhrHeaderType = options.headers[xhrHeaderKey];        
    }

    if(options.data != undefined){      
      userMail = options.data.mail,
      userPassword = options.data.password;
    }

    console.log(
      ' Mail         - ' + userMail + '\n',
      'Password     - ' + userPassword + '\n',
      'Method       - ' + method + '\n',
      'Url          - ' + url + '\n',
      'Heders       - ' + headers + '\n',
      'ResponseType - ' + responseType + '\n',
      'HeaderKey    - ' + xhrHeaderKey + '\n',
      'HeaderType   - ' + xhrHeaderType + '\n',
      'Callback     - ' + callback + '\n'
      );

    const xhr = new XMLHttpRequest;

    xhr.withCredentials = true;

    if(responseType != undefined){       
      xhr.responseType = `${responseType}`;
    }

    if(method === 'GET'){
        if(userMail === undefined && userPassword === undefined){
            xhr.open(`${method}`, `${url}`);
            return
          } else {             
              xhr.open(`${method}`, `${url}?mail=${userMail}&password=${userPassword}`);              
          }
        setHeader(xhr, xhrHeaderKey, xhrHeaderType);
        xhr.send(); 
    } else { 
        xhr.open(`${method}`, `${url}`);    
        let formData = new FormData;

        formData.append('mail', `${userMail}`);
        formData.append('password', `${userPassword}`);

        setHeader(xhr, xhrHeaderKey, xhrHeaderType);
        xhr.send(formData);             
    }

    xhr.addEventListener('load', () => {
        console.log(xhr);
        if(xhr.status != 200){
            console.log(`${xhr.status}: ${xhr.statusText}`);                  
        } else {
            options.callback(null, xhr.response); 
        }
    });  
    
    return xhr
}

function setHeader(request, key, type){
  if(key === undefined || type === undefined){
    return
  } else { 
    console.log('setHeader                  ' + `${key}`, `${type}`);  
    request.setRequestHeader(`${key}`, `${type}`);
  }
}

/////////////////////////////////

// const xhr = createRequest({
//     url: 'http://localhost:8000', // адрес
//     headers: { // произвольные заголовки, могут отсутствовать
//       'Content-type': 'application/json' 
//     },
//     data: { // произвольные данные, могут отсутствовать
//       mail: 'demo@demo',
//       password: 'demo'
//     },
//     responseType: 'json', // формат, в котором необходимо выдать результат
//     method: 'GET', // метод запроса
//     /*
//       Функция, которая сработает после запроса.
//       Если в процессе запроса произойдёт ошибка, её объект
//       должен быть в параметре err.
//       Если в запросе есть данные, они должны быть переданы в response.
//     */
//     callback: (err, response) => {
//       console.log( 'Ошибка, если есть', err );
//       console.log( 'Данные, если нет ошибки', response );
//     }
//   });
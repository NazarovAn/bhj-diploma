/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let userMail,
        userPassword,
        method = options.method,
        url = options.url,
        headers = options.headers,
        responseType = options.responseType,
        xhrHeaderKey,
        xhrHeaderType;
        
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
      'HeaderType   - ' + xhrHeaderType + '\n'
      );

    const xhr = new XMLHttpRequest;

    xhr.withCredentials = true;
    if(responseType != undefined){       
      xhr.responseType = `${responseType}`;
    }

    if(method === 'GET'){
        requestOpen(xhr, method, url, userMail, userPassword);
        setHeader(xhr, xhrHeaderKey, xhrHeaderType);
        xhr.send(); 
    } else {        
        let formData = new FormData;

        formData.append('mail', `${userMail}`);
        formData.append('password', `${userPassword}`);
        
        requestOpen(xhr, method, url);
        setHeader(xhr, xhrHeaderKey, xhrHeaderType);
        xhr.send(formData);             
    }

    xhr.addEventListener('load', () => {
        if(xhr.status === 200){
            options.callback(null, xhr.response);         
        } else {
            options.callback(`${xhr.status}: ${xhr.statusText}`); 
        }
    });

    console.log(xhr);
    
    return xhr
}

function setHeader(request, key, type){
  if(key === undefined || type === undefined){
    return
  } else {
    request.setRequestHeader(`${key}`, `${type}`);
  }
}

function requestOpen(request, requestMethod, requestUrl, mail, password){
  if(mail === undefined || password === undefined){
    request.open(`${requestMethod}`, `${requestUrl}`);
    return
  } else {
    request.open(`${requestMethod}`, `${requestUrl}?mail=${mail}&password=${password}`)
  }
}

// const xhr = createRequest({
//     url: 'http://localhost:8000', // адрес
//     headers: { // произвольные заголовки, могут отсутствовать
//       'Content-type': 'application/json' 
//     },
//     data: { // произвольные данные, могут отсутствовать
//       mail: 'ivan@poselok.ru',
//       password: 'odinodin'
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
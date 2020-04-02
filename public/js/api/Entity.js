/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diplom.letsdocode.ru'.
 * */
class Entity {

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    return createRequest({
      data,
      method: 'GET',
      url: Entity.HOST + Entity.URL,
      responseType: 'json',
      callback
    })
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    let modifiedData = Object.assign( data, { _method: 'PUT' });

    createRequest({
      data: modifiedData,
      method: 'POST',
      url: Entity.HOST + Entity.URL,
      responseType: 'json',
      callback
    })
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    let modifiedData = Object.assign(data, {id: `${id}`});

    createRequest({
      data: modifiedData,
      method: 'GET',
      url: Entity.HOST + Entity.URL,
      responseType: 'json',
      callback
    })

  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    let modifiedData = Object.assign(data, {id: `${id}`, _method: 'DELETE'});
    console.log(modifiedData);
    

    createRequest({
      data: modifiedData,
      method: 'POST',
      url: Entity.HOST + Entity.URL,
      responseType: 'json',
      callback
    })
  }
}

Entity.URL = '';
Entity.HOST = 'http://localhost:8000';
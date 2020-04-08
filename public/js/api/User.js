/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    let currentUser = localStorage.getItem('user');
    return currentUser != null? JSON.parse(currentUser) : undefined
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    createRequest({
      data,
      method: 'GET',
      url: this.HOST + this.URL + '/current',
      responseType: 'json',
      callback: (err, response) => {
        if(err){
          console.error(err);
          this.unsetCurrent();
          return
        }
        this.setCurrent(response.user);
        callback(err, response);
      }
    })
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    createRequest({
      data: data.data,
      method: 'POST',
      url: this.HOST + this.URL + '/login',
      responseType: 'json',
      callback: (err, response) => {
        if(err){
          console.log(err);
          return         
        }

        callback(err, response);

        this.setCurrent(response.user);
      }
    })
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    createRequest({
      data: data.data,
      method: 'POST',
      url: this.HOST + this.URL + '/register',
      responseType: 'json',
      callback: (err, response) => {
        if(err){          
          console.error(err);
          return          
        }

        let newUser = {
          id:   response.user.id,
          name: data.data.name,
          email: data.data.email
        }

        callback(err, response);

        this.setCurrent(newUser);
      }
    })
    
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    createRequest({
      data,
      method: 'POST',
      url: this.HOST + this.URL + '/logout',
      responseType: 'json',
      callback: (err, response) => {
        if(response.success){
          callback(err, response);
          this.unsetCurrent();   
          return
        } else {
          console.error(err);
        }
      }
    })
  }
}

User.HOST = 'http://localhost:8000';
User.URL = '/user';
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
    let currentUser = JSON.parse(localStorage.getItem('user'));
    
    if(currentUser === null){
      return undefined
    } else {
      return currentUser
    }
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
          console.log(err, response);          
          return
        }

        
        this.setCurrent(data);                                                                              //////////////////////////////////////////////
         
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    createRequest({
      data,
      method: 'POST',
      url: this.HOST + this.URL + '/login',
      responseType: 'json',
      callback: (err, response) => {
        if(err){
          console.log(err);
          return
        } 

        let newUser = {
          id:   `${response.id}`,
          name: `${response.name}`
        }        
        this.setCurrent(newUser);
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
      data,
      method: 'POST',
      url: `${this.HOST}` + `${this.URL}` + '/register',
      responseType: 'json',
      callback: (err, response) => {
        if(err){          
          console.log(err);
          return          
        }        

        let newUser = {
          id:   `${response.id}`,
          name: `${response.name}`
        }        
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
        if(err){
          callback(err, response);
          return
        }   
        
        this.unsetCurrent();                                         ///////////////////////
        
      }
    })

  }
}

User.HOST = 'http://localhost:8000';
User.URL = '/user';

// const data = {
//   email: 'test@test.ru',
//   password: 'abracadabra'
// }

// User.login( data, ( err, response ) => {});

// const data = {
//   name: 'Vlad',
//   email: 'test@test.ru',
//   password: 'abracadabra'
// }

// User.register( data, ( err, response ) => {});

// const data = {
//     id: 'q2dmw450k8k9vuak'
//   }


// User.logout(data, ( err, response ) => {})
/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const button = document.querySelector('.sidebar-toggle'),
          sidebar = document.querySelector('.sidebar-mini');
    
    button.addEventListener('click', (elem) => {
      elem.preventDefault();
      sidebar.classList.toggle('sidebar-open');
      sidebar.classList.toggle('sidebar-collapse');
      
      //Исправил тут на toggle, но в таком случае sidebar получает оба класса.
      //Я подумал, что 'sidebar-collapse' - закрытое состояние, а 'sidebar-open' - закрытое, 
      //поэтому и сделал так, как в комментарии ниже.

      // if(!sidebar.classList.contains('sidebar-open')){
      //   sidebar.classList.add('sidebar-open');
      //   sidebar.classList.remove('sidebar-collapse');
      // } else {
      //   sidebar.classList.remove('sidebar-open');
      //   sidebar.classList.add('sidebar-collapse');        
      // }
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    let loginForm = App.getModal('login'),
        registerForm = App.getModal('register'),
        loginButton = document.querySelector('.menu-item_login'),
        registerButton = document.querySelector('.menu-item_register'),
        logoutButton = document.querySelector('.menu-item_logout');

        loginButton.addEventListener('click', () => loginForm.open());
        registerButton.addEventListener('click', () => registerForm.open());
        logoutButton.addEventListener('click', () => {
          User.logout({}, (err, response) => {
            if(response.success){
              App.setState('init');
            } else {
              console.error(err);
            }            
          })
        })
  }
}

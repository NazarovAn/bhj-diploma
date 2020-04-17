/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if(!element){
      throw new Error('Элемент не существует');
    }

    this.element = element;
    this.registerEvents();
  }

  /**options
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);     
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const removeAccountButton = this.element.querySelector('.remove-account');

    removeAccountButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.removeAccount();
    })

    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      let closeButtonsList = this.element.querySelectorAll('.transaction__remove');
      
      for (let button of closeButtonsList) {
        console.log(button.dataset.id + ' id счета в data-id кнопки удаления');
        
        if (button === e.target || button.querySelector('.fa') === e.target) {
          this.removeTransaction(button.dataset.id);
        }
      }
    })
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if(this.lastOptions) {    
      if (confirm('Вы действительно хотите удалить счёт?')) {
        this.clear();
        
      let id = document.querySelector('.active').dataset.id;

      Account.remove( id, {}, () => App.update());
      }
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    if (confirm('Вы действительно хотите удалить счёт?')) {
      Transaction.remove(id, {}, (err, response) => {
        if(!response.success){
          console.log(err);
          return
        }        

        App.update();
      })
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if (options) {
      this.lastOptions = options;     

      Account.get(options.account_id, {}, (err, response) => {
        if(err){
          console.error(err);
        }        
        
        this.renderTitle(response.account.name);
      })

      Transaction.list(options, (err, response) => {
        if (err) {
          console.error(err);
          return
        }

        this.renderTransactions(response.data);
        console.log(response.data);
        
      })
    }
  }
  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = '';
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    document.querySelector('.content-title').textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */  
   formatDate( date ) {
    let year = date.slice(0, 4),
        monthIndex = parseInt(date.slice(5, 7)) - 1,
        day = date.slice(8, 10),
        time = date.slice(11, 16),
        monthsArray = [
          'января',
          'февраля',
          'марта',
          'апреля',
          'мая',
          'июня',
          'июля',
          'августа',
          'сентября',
          'октября',
          'ноября',
          'декабря'
        ]

    return `${day} ${monthsArray[monthIndex]} ${year} г. в ${time}`
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    return `<div class="transaction transaction_${item.type.toLowerCase()} row">
              <div class="col-md-7 transaction__details">
                <div class="transaction__icon">
                    <span class="fa fa-money fa-2x"></span>
                </div>
                <div class="transaction__info">
                    <h4 class="transaction__title">${item.name}</h4>
                    <div class="transaction__date">${this.formatDate(item.created_at)}</div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="transaction__summ">
                ${item.sum} <span class="currency">₽</span>
                </div>
              </div>
              <div class="col-md-2 transaction__controls">
                  <button class="btn btn-danger transaction__remove" data-id="${item.id}">  
                      <i class="fa fa-trash"></i>  
                  </button>
              </div>
          </div>`
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    let contentBox = this.element.querySelector('.content');

    contentBox.innerHTML = '';

    data.forEach((e) => {
      contentBox.insertAdjacentHTML('beforeEnd', this.getTransactionHTML(e));  
    })
  }
}

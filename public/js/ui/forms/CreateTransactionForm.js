/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountsSelect = this.element.querySelector('.accounts-select');

    Account.list(User.current(), (err, response) => {
      if(err){
        console.log(err);          
      return
      }

      let accountsList = response.data;

      accountsList.forEach((item) => {
        accountsSelect.insertAdjacentHTML('beforeEnd', `<option value="${item.id}">${item.name}</option>`);
      })
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options.data, (err, response) => {
      if (err) {
        console.log(err);
        return
      }
      this.element.reset();

      if(App.getModal('newIncome')){
        App.getModal('newIncome').close();
      }

      if(App.getModal('newExpense')){
        App.getModal('newExpense').close();
      }
      App.update();
    });
  }
}

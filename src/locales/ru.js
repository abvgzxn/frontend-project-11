export default {
  translation: {
    title: 'RSS агрегатор',
    form: {
      label: 'Ссылка RSS',
      placeholder: 'Введите URL RSS',
      submit: 'Добавить',
    },
    sections: {
      feeds: 'Фиды',
      posts: 'Посты',
    },
    errors: {
      required: 'Не должно быть пустым',
      url: 'Ссылка должна быть валидным URL',
      duplicate: 'RSS уже существует',
      unknown: 'Неизвестная ошибка',
      network: 'Ошибка сети',            
      parsing: 'Ресурс не содержит валидный RSS', 
    },
    buttons: {
      preview: 'Просмотр',
    },
    success: {
      feedAdded: 'RSS успешно загружен',
    },
  },
};
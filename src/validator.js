import * as yup from 'yup';

const urlShema = yup.string()
.required('Не должно быть пустым')
.url('Ссылка должна быть валидным URL');

export const validateUrl = (url) => {
  return urlShema.validate(url);
}

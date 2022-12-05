const httpStatusCodes = {
  ok: {
    code: 200,
  },
  created: {
    code: 201,
  },
  badRequest: {
    code: 400,
    message: 'Переданы некорректные данные',
  },
  unauthorized: {
    code: 401,
    message: 'Неправильные почта или пароль',
  },
  notFound: {
    code: 404,
    messageUser: 'Пользователь не найден',
    messageCard: 'Карточка не найдена',
    messagePage: 'Страница не найдена',
  },
  internalServerError: {
    code: 500,
    message: 'Произошла внутренняя ошибка сервера',
  },
};

module.exports = httpStatusCodes;

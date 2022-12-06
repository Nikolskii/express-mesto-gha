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
    messages: {
      incorrectUserData: 'Неправильные почта или пароль',
      incorrectToken: 'Необходима авторизация',
    },
  },
  notFound: {
    code: 404,
    messages: {
      user: 'Пользователь не найден',
      card: 'Карточка не найдена',
      page: 'Страница не найдена',
    },
    messageUser: 'Пользователь не найден',
    messageCard: 'Карточка не найдена',
    messagePage: 'Страница не найдена',
  },
  conflict: {
    code: 409,
    message: 'Пользователь с указанными данными уже зарегистрирован',
  },
  internalServerError: {
    code: 500,
    message: 'Произошла внутренняя ошибка сервера',
  },
};

module.exports = httpStatusCodes;

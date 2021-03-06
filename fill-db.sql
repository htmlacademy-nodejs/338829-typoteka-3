-- Add users
INSERT INTO "users" ("email", "name", "surname", "password", "avatar", "createdAt", "updatedAt") VALUES
('ivanov@example.com', 'Ivan', 'Ivanov', '5f4dcc3b5aa765d61d8327deb882cf99', 'avatar-2.png', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('petrov@example.com', 'Пётр', 'Петров', '5f4dcc3b5aa765d61d8327deb882cf99', 'avatar-3.png', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z');

-- Add categories
INSERT INTO "categories" ("name", "createdAt", "updatedAt") VALUES
('Без рамки', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Авиация', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('IT', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Музыка', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('За жизнь', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Деревья', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Сделай сам', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Графика', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Книги', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Спорт', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Железо', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Разное', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Интернет', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Автомобили', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Программирование', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Ремонт', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Домашние животные', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Фантастика', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Кино', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Фотография', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z');

-- Add articles
ALTER TABLE "articles" DISABLE TRIGGER ALL;

INSERT INTO "articles" ("title", "announce", "fullText", "picture", "createdAt", "updatedAt") VALUES
('Будущее началось', 'Достичь успеха помогут ежедневные повторения. Он написал больше 30 хитов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Из под его пера вышло 8 платиновых альбомов. Ёлки — это не просто красивое дерево. Это прочная древесина.', 'Как начать действовать? Для начала просто соберитесь. Как говорится, утром деньги – вечером стулья. Собственно это то, за чем обычно приходит основная масса пользователей в интернет. Точность, как говорится, вежливость королей и… снайперов. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Собрать камни бесконечности легко если вы прирожденный герой. Всё, что ни делается – к лучшему. Просто не всегда к вашему. Всё меньше глупостей я делаю с годами, но качество при этом их растёт. Программировать не настолько сложно как об этом говорят. Игры и программирование разные вещи. Не стоит идти в программисты если вам нравятся только игры. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.', 'sea@1x.jpg', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Будущее началось', 'Ёлки — это не просто красивое дерево. Это прочная древесина. Он написал больше 30 хитов. Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете. Всё меньше глупостей я делаю с годами, но качество при этом их растёт. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.', 'Прислушайся к себе. Хороший человек плохого не посоветует. Простые ежедневные упражнения помогут достичь успеха. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Точность, как говорится, вежливость королей и… снайперов. Достичь успеха помогут ежедневные повторения. Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете. Из под его пера вышло 8 платиновых альбомов. Золотое сечение — соотношение двух величин гармоническая пропорция. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Как начать действовать? Для начала просто соберитесь. Как говорится, утром деньги – вечером стулья. Ёлки — это не просто красивое дерево. Это прочная древесина.', 'skyscraper@1x.jpg', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Борьба с прокрастинацией', 'Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Первая большая ёлка была установлена только в 1938 году. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. В любой непонятной ситуации ложись спать. Собрать камни бесконечности легко если вы прирожденный герой.', 'Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Помните небольшое количество ежедневных упражнений лучше чем один раз но много. Простые ежедневные упражнения помогут достичь успеха. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Из под его пера вышло 8 платиновых альбомов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. В любой непонятной ситуации ложись спать. Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Первая большая ёлка была установлена только в 1938 году. Он написал больше 30 хитов. Всё меньше глупостей я делаю с годами, но качество при этом их растёт. Золотое сечение — соотношение двух величин гармоническая пропорция. Как говорится, утром деньги – вечером стулья. Это один из лучших рок-музыкантов.', 'sea@1x.jpg', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Сколько раз вы пробовали и у вас не вышло?', 'Прислушайся к себе. Хороший человек плохого не посоветует. Первая большая ёлка была установлена только в 1938 году. Ёлки — это не просто красивое дерево. Это прочная древесина. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Золотое сечение — соотношение двух величин гармоническая пропорция.', 'Первая большая ёлка была установлена только в 1938 году. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Собрать камни бесконечности легко если вы прирожденный герой. Всё, что ни делается – к лучшему. Просто не всегда к вашему. Как начать действовать? Для начала просто соберитесь. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. В любой непонятной ситуации ложись спать. Из под его пера вышло 8 платиновых альбомов. Золотое сечение — соотношение двух величин гармоническая пропорция. Программировать не настолько сложно как об этом говорят. Простые ежедневные упражнения помогут достичь успеха. Помните небольшое количество ежедневных упражнений лучше чем один раз но много. Всё меньше глупостей я делаю с годами, но качество при этом их растёт. Собственно это то, за чем обычно приходит основная масса пользователей в интернет. Это один из лучших рок-музыкантов. Как говорится, утром деньги – вечером стулья. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.', 'forest@1x.jpg', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z'),
('Пять советов по оказанию помощи', 'Это один из лучших рок-музыкантов. Всё, что ни делается – к лучшему. Просто не всегда к вашему. Первая большая ёлка была установлена только в 1938 году. Помните небольшое количество ежедневных упражнений лучше чем один раз но много. В любой непонятной ситуации ложись спать.', 'Ёлки — это не просто красивое дерево. Это прочная древесина. Как говорится, утром деньги – вечером стулья. В любой непонятной ситуации ложись спать. Как начать действовать? Для начала просто соберитесь. Золотое сечение — соотношение двух величин гармоническая пропорция. Всё меньше глупостей я делаю с годами, но качество при этом их растёт. Всё, что ни делается – к лучшему. Просто не всегда к вашему. Простые ежедневные упражнения помогут достичь успеха. Первая большая ёлка была установлена только в 1938 году. Достичь успеха помогут ежедневные повторения. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Это один из лучших рок-музыкантов. Собственно это то, за чем обычно приходит основная масса пользователей в интернет. Из под его пера вышло 8 платиновых альбомов. Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете. Игры и программирование разные вещи. Не стоит идти в программисты если вам нравятся только игры. Забавным примером использования нейронной сети является генерация слов. Программировать не настолько сложно как об этом говорят.', 'skyscraper@1x.jpg', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z');

ALTER TABLE "articles" ENABLE TRIGGER ALL;

-- Add article categories
ALTER TABLE "articleCategories" DISABLE TRIGGER ALL;

INSERT INTO "articleCategories" ("createdAt", "updatedAt", "ArticleId", "CategoryId") VALUES
('2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 1, 18),
('2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 2, 11),
('2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 2, 12),
('2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 3, 15),
('2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 3, 19),
('2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 4, 10),
('2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 4, 3),
('2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 5, 1),
('2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 5, 2),
('2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 5, 3);

ALTER TABLE "articleCategories" ENABLE TRIGGER ALL;

-- Add comments
ALTER TABLE "comments" DISABLE TRIGGER ALL;

INSERT INTO "comments" ("text", "createdAt", "updatedAt", "articleId", "userId") VALUES
('Мне кажется или я уже читал это где-то?', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 1, 2),
('Это где ж такие красоты? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему?', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 1, 1),
('Согласен с автором! Плюсую, но слишком много буквы! Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 1, 1),
('Это где ж такие красоты? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Согласен с автором! Хочу такую же футболку :-)', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 1, 1),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы! Совсем немного...', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 1, 1),
('Планируете записать видосик на эту тему?', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 1, 2),
('Плюсую, но слишком много буквы!', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 1, 2),
('Совсем немного... Согласен с автором! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 1, 1),
('Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Это где ж такие красоты? Планируете записать видосик на эту тему?', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 2, 1),
('Планируете записать видосик на эту тему? Хочу такую же футболку :-)', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 2, 1),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то? Это где ж такие красоты? Планируете записать видосик на эту тему?', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 2, 1),
('Планируете записать видосик на эту тему? Это где ж такие красоты? Плюсую, но слишком много буквы!', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 2, 1),
('Совсем немного...', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 2, 1),
('Мне кажется или я уже читал это где-то? Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 2, 2),
('Хочу такую же футболку :-)', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 2, 2),
('Согласен с автором! Совсем немного...', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 3, 2),
('Это где ж такие красоты? Хочу такую же футболку :-)', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 3, 1),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы! Совсем немного...', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 3, 2),
('Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 4, 1),
('Это где ж такие красоты? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 4, 1),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему?', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 4, 1),
('Согласен с автором! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 5, 2),
('Хочу такую же футболку :-)', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 5, 2),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы!', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 5, 2),
('Плюсую, но слишком много буквы! Планируете записать видосик на эту тему?', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 5, 2),
('Мне кажется или я уже читал это где-то? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', '2021-06-03T21:24:56.639Z', '2021-06-03T21:24:56.639Z', 5, 2);

ALTER TABLE "comments" ENABLE TRIGGER ALL;
-- end
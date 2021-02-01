-- Add users
INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
('admin@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Super', 'Admin', 'avatar-5.png'),
('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Пётр', 'Петров', 'avatar-1.png');

-- Add categories
INSERT INTO categories(name) VALUES
('Фотография'),
('Кино'),
('Без рамки'),
('Книги'),
('За жизнь'),
('Автомобили'),
('Авиация'),
('Домашние животные'),
('IT'),
('Спорт'),
('Графика'),
('Музыка'),
('Сделай сам'),
('Фантастика'),
('Деревья'),
('Железо'),
('Программирование'),
('Разное'),
('Интернет'),
('Ремонт');

-- Add articles
ALTER TABLE articles DISABLE TRIGGER ALL;

INSERT INTO articles(title, announce, full_text, picture, user_id) VALUES
('Рок — это протест', 'Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Забавным примером использования нейронной сети является генерация слов. Простые ежедневные упражнения помогут достичь успеха. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Это один из лучших рок-музыкантов.', 'Всё меньше глупостей я делаю с годами, но качество при этом их растёт. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Достичь успеха помогут ежедневные повторения. Помните небольшое количество ежедневных упражнений лучше чем один раз но много. Ёлки — это не просто красивое дерево. Это прочная древесина. Точность, как говорится, вежливость королей и… снайперов. Как начать действовать? Для начала просто соберитесь. Забавным примером использования нейронной сети является генерация слов. Собрать камни бесконечности легко если вы прирожденный герой. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.', 'skyscraper@1x.jpg', 1),
('Пять советов по оказанию помощи', 'Как начать действовать? Для начала просто соберитесь. Первая большая ёлка была установлена только в 1938 году. Всё, что ни делается – к лучшему. Просто не всегда к вашему. Ёлки — это не просто красивое дерево. Это прочная древесина. Он написал больше 30 хитов.', 'Золотое сечение — соотношение двух величин гармоническая пропорция. Из под его пера вышло 8 платиновых альбомов. Это один из лучших рок-музыкантов. Прислушайся к себе. Хороший человек плохого не посоветует. Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете.', 'skyscraper@1x.jpg', 2),
('Невозможное возможно', 'Как начать действовать? Для начала просто соберитесь. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Игры и программирование разные вещи. Не стоит идти в программисты если вам нравятся только игры. Всё меньше глупостей я делаю с годами, но качество при этом их растёт. Он написал больше 30 хитов.', 'Из под его пера вышло 8 платиновых альбомов. Всё меньше глупостей я делаю с годами, но качество при этом их растёт. Собрать камни бесконечности легко если вы прирожденный герой. Это один из лучших рок-музыкантов. Прислушайся к себе. Хороший человек плохого не посоветует.', 'forest@1x.jpg', 2);

ALTER TABLE articles ENABLE TRIGGER ALL;

-- Add article categories
ALTER TABLE article_categories DISABLE TRIGGER ALL;

INSERT INTO article_categories(article_id, category_id) VALUES
(1, 10),
(1, 9),
(2, 7),
(3, 0),
(3, 1),
(3, 2),
(3, 3);

ALTER TABLE article_categories ENABLE TRIGGER ALL;

-- Add comments
ALTER TABLE comments DISABLE TRIGGER ALL;

INSERT INTO COMMENTS(text, article_id, user_id) VALUES
('Согласен с автором!', 1, 2),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Совсем немного... Плюсую, но слишком много буквы! Планируете записать видосик на эту тему?', 1, 2),
('Хочу такую же футболку :-) Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то?', 1, 1),
('Плюсую, но слишком много буквы! Согласен с автором!', 2, 1),
('Мне кажется или я уже читал это где-то? Планируете записать видосик на эту тему? Это где ж такие красоты?', 2, 2),
('Планируете записать видосик на эту тему? Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', 2, 2),
('Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Это где ж такие красоты? Мне кажется или я уже читал это где-то?', 2, 1),
('Совсем немного... Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', 2, 2),
('Планируете записать видосик на эту тему?', 2, 1),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Согласен с автором!', 3, 2),
('Хочу такую же футболку :-) Планируете записать видосик на эту тему?', 3, 1),
('Плюсую, но слишком много буквы!', 3, 2);

ALTER TABLE comments ENABLE TRIGGER ALL;
-- end
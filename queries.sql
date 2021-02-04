-- all categories
SELECT *
FROM categories;

-- all categories has article
SELECT
  categories.id,
  categories.name
FROM categories
  JOIN article_categories ON categories.id = article_categories.category_id
  GROUP BY categories.id;

-- all categories with article count
SELECT
  categories.id,
  categories.name,
  COUNT(DISTINCT article_categories.article_id) as articles_count
FROM categories
  LEFT JOIN article_categories
  ON categories.id = article_categories.category_id
  GROUP BY categories.id;

-- select last articles
SELECT
  articles.id,
  articles.title,
  articles.announce,
  articles.created_at,
  users.first_name,
  users.last_name,
  users.email,
  COUNT(DISTINCT comments.id) as comments_count,
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list
FROM articles
  JOIN article_categories ON articles.id = article_categories.article_id
  JOIN categories ON categories.id = article_categories.category_id
  LEFT JOIN comments ON comments.article_id = articles.id
  JOIN users ON users.id = articles.user_id
  GROUP BY articles.id, users.id
  ORDER BY articles.created_at DESC;

-- select article id = 1
select
  articles.id,
  articles.title,
  articles.announce,
  articles.full_text,
  articles.created_at,
  articles.picture,
  users.first_name,
  users.last_name,
  users.email,
  COUNT(DISTINCT comments.id) AS comments_count,
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list
FROM articles
  RIGHT JOIN article_categories ON articles.id = article_categories.article_id
  JOIN categories ON article_categories.category_id = categories.id
  LEFT JOIN comments ON comments.article_id = articles.id
  JOIN users ON users.id = articles.user_id
WHERE articles.id = 1
  GROUP BY articles.id, users.id;

-- select 5 last comments
SELECT
  comments.id,
  comments.article_id,
  users.first_name,
  users.last_name,
  comments.text
FROM comments
  JOIN users ON users.id = comments.user_id
  ORDER BY comments.created_at DESC
  LIMIT 5;

-- select article's comment
SELECT
  comments.id,
  comments.article_id,
  users.first_name,
  users.last_name,
  comments.text
FROM comments
  JOIN users ON users.id = comments.user_id
WHERE comments.article_id = 1
  ORDER BY comments.created_at DESC;

-- update title article id = 1
UPDATE articles
SET title = 'Как я встретил Новый год'
WHERE id = 1;

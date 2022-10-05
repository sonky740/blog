---
title: SQL Fundamentals
date: '2022-10-05'
# description: ''
keywords: [sql, postgresql, sql fundamentals]
---

최근 공부 중인 SQL 기본 문법에 대해 정리하고자 한다.  
postgreSQL 기준으로 작성하였다.  
DB는 <a href="https://www.udemy.com/course/best-sql-2022/" target="_blank" rel="noreferrer" title="udemy SQL 강좌 새창 열기">udemy</a>에서 가져왔다.

- **데이터 유형**  
  <a href="https://www.postgresql.org/docs/current/datatype.html" target="_blank" rel="noreferrer" title="데이터 유형 Document 새창 열기">Document</a> 참고
- **DISTINCT**  
  고유하거나 중복되지 않는 값 조회
  ```sql
  SELECT DISTINCT(필드명) FROM 테이블;
  SELECT DISTINCT 필드명 FROM 테이블;
  ```
- **WHERE**  
  열에 조건을 지정하여 맞는 행 도출.  
  집계함수 사용 불가
  - IN: OR 여러개
  - BETWEEN: 값 범위 지정 (NOT 가능)
  - LIKE, ILIKE: 문자열 내의 패턴 매칭 (NOT 가능)
  ```sql
  SELECT * FROM 필드명 WHERE 조건;
  SELECT * from customer WHERE first_name = 'Jared';
  SELECT COUNT(title) FROM film WHERE rental_rate > 4 AND replacement_cost >= 19.99 AND rating = 'R';
  SELECT COUNT(*) FROM film WHERE rating != 'R';
  SELECT email FROM customer WHERE first_name = 'Nancy' AND last_name = 'Thomas';
  SELECT * FROM customer WHERE first_name IN ('John', 'Jake', 'Julie');
  SELECT * FROM payment WHERE payment_date BETWEEN '2007-02-01' AND '2007-02-15';
  SELECT * FROM customer WHERE first_name ILIKE 'j%' AND last_name LIKE 'S%';
  SELECT * FROM customer WHERE first_name LIKE 'A%' AND last_name NOT LIKE 'B%' ORDER BY last_name;
  ```
- **집계 함수**  
  SELECT, HAVING절에서만 호출 가능
  ```sql
  SELECT MIN(필드명) FROM 테이블;
  SELECT MAX(필드명) FROM 테이블;
  SELECT MAX(필드명), MIN(필드명) FROM 테이블;
  SELECT ROUND(AVG(필드명), 2) FROM 테이블;
  SELECT SUM(필드명) FROM 테이블;
  ```
- **GROUP BY**  
  카테고리별로 열을 집계  
   FROM 바로 뒤 or WHERE 바로 뒤에 있어야함.
  ```sql
  SELECT 필드명 FROM 테이블 GROUP BY 필드명;
  SELECT staff_id, customer_id, SUM(amount) FROM payment GROUP BY staff_id, customer_id ORDER BY staff_id, customer_id;
  SELECT DATE(payment_date), SUM(amount) FROM payment GROUP BY DATE(payment_date) ORDER BY SUM(amount) DESC;
  SELECT staff_id, COUNT(amount) FROM payment GROUP BY staff_id;
  SELECT rating, AVG(replacement_cost) FROM film GROUP BY rating;
  SELECT customer_id, SUM(amount) FROM payment GROUP BY customer_id ORDER BY SUM(amount) DESC LIMIT 5;
  ```
- **HAVING**  
  집계가 이미 수행된 "이후에" 자료 필터링.  
  WHERE절에서 집계함수를 못쓰므로 HAVING절에서 사용.
  ```sql
  SELECT 필드명 FROM 테이블 HAVING 조건;
  SELECT customer_id, SUM(amount) FROM payment GROUP BY customer_id HAVING SUM(amount) > 100;
  SELECT store_id, COUNT(customer_id) FROM customer GROUP BY store_id HAVING COUNT(customer_id) > 300;
  SELECT customer_id, COUNT(amount) FROM payment GROUP BY customer_id HAVING COUNT(amount) >= 40 ORDER BY COUNT(amount) DESC;
  SELECT customer_id, SUM(amount) FROM payment WHERE staff_id = 2 GROUP BY customer_id HAVING SUM(amount) > 100;
  ```
- **AS**  
  열이나 결과에 별칭을 부여  
  순전히 가독성을 위함. 쿼리의 맨 마지막에 실행되므로, WHERE절이나 GROUP BY 호출에 사용 불가.  
  ORDER BY에는 가능.
  ```sql
  SELECT 필드명 AS 별칭 FROM 테이블;
  SELECT customer_id, SUM(amount) AS amount_sum FROM payment GROUP BY customer_id ORDER BY amount_sum DESC;
  ```
- **INNER JOIN (JOIN)**  
  결합되는 테이블을 모두 충족 (교집합)
  ```sql
  SELECT 필드명 FROM 테이블1 INNER JOIN 테이블2 ON 조인될 조건;
  SELECT payment_id, payment.customer_id, first_name FROM payment INNER JOIN customer ON payment.customer_id = customer.customer_id;
  SELECT district, email FROM address INNER JOIN customer ON customer.address_id = address.address_id WHERE district LIKE 'California';
  SELECT title, first_name, last_name FROM film INNER JOIN film_actor ON film_actor.film_id = film.film_id INNER JOIN actor ON actor.actor_id = film_actor.actor_id WHERE first_name = 'Nick' AND last_name = 'Wahlberg';
  ```
- **OUTER JOIN**  
  한쪽에만 데이터가 있어도 결과 도출
  - FULL: 왼쪽, 오른쪽 모든 값 출력
  - LEFT: 왼쪽 테이블의 값만 출력 (비대칭이므로 순서 중요)
  - RIGHT: 오른쪽 테이블의 값만 출력 (비대칭이므로 순서 중요)
  ```sql
  SELECT * FROM customer FULL JOIN payment ON customer.customer_id = payment.customer_id WHERE customer.customer_id IS null OR payment.payment_id IS null;
  SELECT film.film_id, film.title, inventory_id, store_id FROM film LEFT JOIN inventory ON inventory.film_id = film.film_id WHERE inventory.film_id IS null; -- film에 속한것만 가져옴.
  SELECT film.film_id, film.title, inventory_id, store_id FROM inventory RIGHT JOIN film ON inventory.film_id = film.film_id WHERE inventory.film_id IS null; -- film에 속한것만 가져옴.
  ```
- **SELF JOIN**  
  표 자기 자신과 조인.
  ```sql
  SELECT 필드명 FROM 테이블 AS 별칭1 INNER JOIN 테이블 AS 별칭2 ON 조인될 조건;
  SELECT f1.title, f2.title, f1.length FROM film AS f1 INNER JOIN film AS f2 ON f1.film_id != f2.film_id AND f1.length = f2.length;
  ```
- **UNION**  
  2개 이상의 SELECT문의 결과를 결합.  
  JOIN과는 다르게 그냥 그대로 갖다 붙임.  
  같은 수의 컬럼과 자료 구조가 동일 해야함.
  ```sql
  SELECT 필드명 FROM 테이블1 UNION SELECT 필드명 FROM 테이블2;
  SELECT * FROM film_actor UNION SELECT * FROM film_category;
  ```
- **TIMESTAMP**  
  시간, 날짜에 대한 쿼리  
  INSERT에서 유용함.
  ```sql
  SELECT NOW();
  SELECT TIMEOFDAY();
  SELECT CURRENT_DATE;
  ```
- **EXTRACT**  
  년, 월, 일, 주, 분기별로 추출  
  <a href="https://www.postgresql.org/docs/12/functions-formatting.html" target="_blank" rel="noreferrer" title="functions-formatting document 새창 열기">Document</a> 참고.
  ```sql
  SELECT EXTRACT(MONTH FROM payment_date) AS pay_month FROM payment;
  SELECT EXTRACT(QUARTER FROM payment_date) FROM payment;
  SELECT AGE(payment_date) FROM payment;
  SELECT to_char(payment_date, 'yyyy-MM-dd') FROM payment;
  SELECT DISTINCT(to_char(payment_date, 'MONTH')) FROM payment;
  SELECT COUNT(*) FROM payment WHERE EXTRACT(dow FROM payment_date) = 1;
  ```
- **Math**  
  수리 함수  
  <a href="https://www.postgresql.org/docs/12/functions-string.html" target="_blank" rel="noreferrer" title="functions-string document 새창 열기">Document</a> 참고
  ```sql
  SELECT LENGTH(first_name) FROM customer;
  SELECT upper(first_name || ' ' || last_name) AS full_name FROM customer;
  SELECT LOWER(LEFT(first_name, 1)) || LOWER(last_name) || '@gmail.com' AS customer_email FROM customer;
  ```
- **SUBQUERY**  
  더 복잡한 쿼리 실행  
  EXISTS: 서브 쿼리의 결과가 한건이라도 존재하면 TRUE, FALSE 반환
  ```sql
  SELECT title, rental_rate FROM film WHERE rental_rate > (SELECT AVG(rental_rate) FROM film);
  SELECT film_id, title FROM film WHERE film_id IN (SELECT inventory.film_id FROM rental INNER JOIN inventory ON inventory.inventory_id = rental.inventory_id WHERE return_date BETWEEN '2005-05-29' AND '2005-05-30') ORDER BY title;
  SELECT first_name, last_name FROM customer AS c WHERE EXISTS (SELECT * FROM payment AS p WHERE p.customer_id = c.customer_id AND amount > 11)
  ```
- **제약 조건**  
  테이블에 문제있는 데이터가 입력되지 않도록 미리 지정하는 조건  
  제약 조건을 위반하면 삽입을 막음.
  - NOT NULL: null이 입력될 수 없음.
  - UNIQUE: 열에 있는 모든 값이 달라야함.
  - PRIMARY Key: 자료나 각 행을 고유하게 식별.
  - FOREIGN Key: 세로단이나 다른 표의 데이터에 제약 조건을 검.
  - CHECK: 행의 모든 값이 특정한 조건을 만족.
  - EXCLUSION: 특정 오퍼레이터를 사용한 특정 열이나 식에서 어떤 두 열이 비교될 때, 모든 비교 값이 참으로 판명되지 않아야 함.
- **CREATE**  
  테이블 생성
  ```sql
  CREATE TABLE 테이블명 (컬럼명1, 컬럼명2);
  CREATE TABLE
    account (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(50) NOT NULL,
      email VARCHAR(250) UNIQUE NOT NULL,
      created_on TIMESTAMP NOT NULL,
      last_login TIMESTAMP
    );
  CREATE TABLE
    job (
      job_id SERIAL PRIMARY KEY,
      job_name VARCHAR(200) UNIQUE NOT NULL
    );
  CREATE TABLE
    account_job (
      user_id INTEGER REFERENCES account (user_id),
      job_id INTEGER REFERENCES job (job_id),
      hire_date TIMESTAMP
    );
  ```
- **INSERT**  
  데이터 삽입
  ```sql
  INSERT INTO 테이블 (컬럼명1, 컬럼명2) VALUES (데이터1, 데이터2);
  INSERT INTO account (username, password, email, created_on) VALUES ('Jose', 'password', 'jose@mail.com', CURRENT_TIMESTAMP);
  INSERT INTO job(job_name) VALUES ('Astronaut');
  INSERT INTO account_job(user_id, job_id, hire_date) VALUES (1, 1, CURRENT_TIMESTAMP);
  ```
- **UPDATE**  
  데이터 수정  
  RETURNING: 실행 결과 리턴
  ```sql
  UPDATE 테이블 SET 컬럼 = '변경할 값' WHERE 변경될 데이터의 조건;
  UPDATE account SET last_login = CURRENT_TIMESTAMP;
  UPDATE account SET last_login = created_on
  UPDATE account_job SET hire_date = account.created_on FROM account WHERE account_job.user_id = account.user_id;
  UPDATE account SET last_login = CURRENT_TIMESTAMP RETURNING email, created_on, last_login;
  ```
- **DELETE, DROP**  
  데이터 열 삭제  
  USING: 다른 테이블에 존재하는지 확인  
  DROP: 조건 없이 그냥 삭제 TABLE, DATABASE
  ```sql
  DELETE FROM 테이블 WHERE 삭제될 데이터의 조건;
  DELETE FROM job WHERE job_name = 'Cowboy';
  DROP TABLE 테이블명
  DROP DATABASE 데이터베이스명
  ```
- **ALTER**
  테이블 수정
  - ADD COLUMN ~, DROP COLUMN ~, ALTER COLUMN ~ SET ~
  - ADD CONSTRAINT ~: 제약 조건을 더함.
  - CASCADE: 연관 관계 삭제
  - IF EXISTS: 해당 데이터가 있을때만 삭제
  ```sql
  ALTER TABLE information RENAME TO new_info;
  ALTER TABLE new_info RENAME COLUMN person TO people;
  ALTER TABLE new_info ALTER COLUMN people DROP NOT NULL;
  ```
- **CHECK**  
  조건 부여
  ```sql
  CREATE TABLE
    employees (
      emp_id SERIAL PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      birthdate DATE CHECK (birthdate > '1900-01-01'),
      hire_date DATE CHECK (hire_date > birthdate),
      salary INTEGER CHECK (salary > 0)
    )
  INSERT INTO employees(first_name, last_name, birthdate, hire_date, salary) VALUES ('Sammy', 'Smith', '1899-11-03', '2010-01-01', 100) -- birthdate 제약 조건 위반으로 에러 발생
  ```
- **CASE**  
  특정 조건이 충족되었을 때 실행
  ```sql
  CASE 컬럼명 WHEN 조건 THEN O 값 ELSE X 값 END
  SELECT
    customer_id,
    CASE
      WHEN (customer_id <= 100) THEN 'Premium'
      WHEN (customer_id BETWEEN 100 AND 200) THEN 'Plus'
      ELSE 'Normal'
    END AS customer_class
  FROM
    customer;
  SELECT
    customer_id,
    CASE
      customer_id
      WHEN 2 THEN 'Winner'
      WHEN 5 THEN 'Second Place'
      ELSE 'Normal'
    END AS raffle_results
  FROM
    customer;
  /* 갯수 파악을 위함 */
  SELECT
    SUM(
      CASE
        rental_rate
        WHEN 0.99 THEN 1
        ELSE 0
      END
    ) AS bargains
  FROM
    film;
  ```
- **COALESCE**  
  무한한 수의 arguments를 쓸 수 있는 기능, null이 아닌 첫 argument를 도출.  
  보통 null값을 0으로 치환할 때 씀.
  ```sql
  SELECT COALESCE(컬럼1, 컬럼2) FROM 테이블;
  SELECT item, (price - COALESCE(discount, 0)) AS final FROM table;
  ```
- **CAST**  
  데이터 유형을 바꿔줌.
  ```sql
  SELECT CAST(컬럼 AS 타입) FROM 테이블;
  SELECT CAST('5' AS INTEGER) AS new_int;
  SELECT '5'::INTEGER AS new_int; -- postgreSQL에서만 가능
  SELECT CHAR_LENGTH(CAST(inventory_id AS VARCHAR)) FROM rental;
  ```
- **NULLIF**  
  표현식 1과 표현식 2가 같으면 null, 다르면 표현식 1 도출.  
  특정값을 null로 변경해야 할 때 유용.
  ```sql
  /* 해당 식은 0으로 나누면 에러가 나니까, 0이면 null로 바꾸기 위하여 씀. */
  SELECT
    (
      SUM(
        CASE
          WHEN department = 'A' THEN 1
          ELSE 0
        END
      ) / NULLIF(SUM(
        CASE
          WHEN department = 'B' THEN 1
          ELSE 0
        END
      ), 0)
    ) AS department_ratio
  FROM
    depts;
  ```
- **VIEW**  
  특정 query를 저장해둠. (물리적X)
  ```sql
  CREATE VIEW 별칭 AS query;
  CREATE VIEW customer_info AS SELECT first_name, last_name, address FROM customer INNER JOIN address ON customer.address_id = address.address_id;
  CREATE OR REPLACE VIEW customer_info AS SELECT first_name, last_name, address, district FROM customer INNER JOIN address ON customer.address_id = address.address_id;
  ALTER VIEW customer_info RENAME TO customer_info2;
  DROP VIEW IF EXISTS customer_info2;
  ```

추가해야 할게 있거나 정리해야 할게 있으면 언제든 수정할 예정이다.

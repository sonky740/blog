---
title: Regex 정규 표현식
date: '2023-01-10'
# description: ''
keywords: [regex, 정규 표현식]
---

알고리즘을 풀면서 다른 사람들이 풀이를 보면 정규 표현식을 쓰는 경우가 있는데 나도 필요성을 느껴서 공부한 걸 정리하고자 한다.  
아래의 코드는 <a href="https://regexr.com/" target="_blank" rel="noreferrer" title="regexr 새창 열기">regexr</a>에서 테스트해볼 수 있다. 아니면 콘솔창에 긁어서 쓰면 된다.

### [] 문자열의 집합

- `[]` : 안에 있는 문자들은 모두 문자열의 집합이다.
- `[abc]` : a, b, c 중 하나의 문자와 매치된다.
- `[^abc]` : a, b, c가 아닌 문자와 매치된다.

```js
const p = `
삼성카드(1234)승인 손*연 3,700원
신한카드(1234)승인 손*연 3,700원
일성카드(1234)승인 손*연 3,700원
이성카드(1234)승인 손*연 3,700원
`;

p.match(/[^삼]성카드/g); // ['일성카드', '이성카드']
p.match(/[삼신][한성]카드/g); // ['삼성카드', '신한카드']
p.match(/..../g); // ['삼성카드', '(123', '4)승인', ...] // 4글자씩
```

### 문자, 숫자, 공백을 나타내는 표현식

- `\d` : 숫자(digit)와 매치, [0-9]와 동일한 표현식이다.
- `\D` : 숫자(digit)가 아닌 것과 매치, [^0-9]와 동일한 표현식이다.
- `\w` : 문자+숫자(word === alphanumeric)와 매치, [a-zA-Z0-9_]와 동일한 표현식이다. // 한글 안됨.
- `\W` : 문자+숫자(word === alphanumeric)가 아닌 문자와 매치, [^a-za-z0-9_]와 동일한 표현식이다. // 한글 안됨.
- `\s` : 공백(whitespace)과 매치, [ \t\n\r\f\v]와 동일한 표현식이다. // space, tab, line break
- `\S` : 공백(whitespace)이 아닌 것과 매치, [^ \t\n\r\f\v]와 동일한 표현식이다. // space, tab, line break

```js
const p = `
010-1234-5678
010-1234-_678
abc-defg-hijk
   -    -    
			-				-				
`;

p.match(/\d\d\d-\d\d\d\d-\d\d\d\d/g); // ['010-1234-5678']
p.match(/\D\D\D-\D\D\D\D-\D\D\D\D/g); // ['abc-defg-hijk', ' - - ', '\t\t\t-\t\t\t\t-\t\t\t\t']
p.match(/\w\w\w-\w\w\w\w-\w\w\w\w/g); // ['010-1234-5678', '010-1234-_678', 'abc-defg-hijk']
p.match(/\W\W\W-\W\W\W\W-\W\W\W\W/g); // [' - - ', '\t\t\t-\t\t\t\t-\t\t\t\t']
p.match(/\s\s\s-\s\s\s\s-\s\s\s\s/g); // [' - - ', '\t\t\t-\t\t\t\t-\t\t\t\t']
```

### 문자 범위 지정하기

- `[a-z]` : a부터 z까지의 소문자 범위를 의미한다.
- `[a-zA-Z]` : a부터 Z까지의 소문자, 대문자 범위를 의미한다. (중간에 특수문자가 포함되어 따로 표시, ASCII 코드 참조)
- `[0-9]` : 0부터 9까지의 문자 범위를 의미한다.
- `[가-힣]` : 가부터 힣까지의 문자 범위를 의미한다.

```js
const p = `
010-1234-5678
010-1234-_678
abc-defg-hijkAZ
안녕하세요
`;
p.match(/[가-힣]/g); // ['안', '녕', '하', '세', '요']
p.match(/[a-z]/g); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']
p.match(/[a-zA-Z]/g); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'A', 'Z']
```

### quantifier 수량자 (바로 앞에 있는 문자를 n번 반복)

- `{n}` : n번 반복
- `{n,}` : n번 이상 반복
- `{n,m}` : n번 이상 m번 이하 반복
- `*` : 0번 이상 반복 (있어도 되고 없어도 된다.) 클레이니 스타
- `+` : 1번 이상 반복 (있어야 한다.) 클레이니 플러스
- `?` : 있어도 되고 없어도 된다. (있으면 1번만) ex) 전화번호에서 씀 010-1234-5678

```js
const p = `
010-0101-0101
01001010101
010--0101--0101
02-0101-0101
031-010-0101
asdfasdwwwfelkawf
<p>asdfasdfadsfasdf</p>
sonky.co.kr?qwer
`;

p.match(/\d{2,3}-?\d{3,4}-?\d{4}/g); // ['010-0101-0101', '01001010101', '02-0101-0101', '031-010-0101']
p.match(/(.)\1{2}/g); // ['www'] // \1은 첫번째 그룹을 의미 (.)\1{2}는 같은 문자가 3번 연속으로 반복되는 문자열을 찾는다.
p.match(/<p>.*<\/p>/g); // ['<p>asdfasdfadsfasdf</p>']
p.match(/\w+\.\w+\.\w+/g); // ['sonky.co.kr']
```

### anchor 앵커 (문자열의 시작과 끝을 의미)

- `^` : 텍스트의 시작
- `$` : 텍스트의 끝
- `\b` : 단어의 경계 (거의 안 씀)

```js
const p = `ab abc
sonky740.github.io`;

p.match(/^[a-z]{2}/g); // ['ab']
p.match(/.[a-z]{2,3}$/g); // ['io']
/^\d{3}-\d{4}-\d{4}$/.test('제 번호는 010-1234-5678 입니다.'); // false
/\d{3}-\d{4}-\d{4}/.test('제 번호는 010-1234-5678 입니다.'); // true
```

### flag 플래그 (정규식의 옵션)

- `i` : ignore case 대소문자 구분 안 함
- `g` : global 전역 - 한번 매칭이 되었더라도, 매칭을 끝내지 않고 계속 찾음.
- `m` : multiline 여러 줄 - begin(^)과 end($)가 각 줄마다 적용 => ^, $는 각 줄의 처음과 끝으로 인식

↓ 잘 안씀

- `u` : unicode로 인식
- `y` : sticky 주어진 위치에서부터 찾음
- `s` : single line .이 줄바꿈 문자를 포함

```js
const p = `ab ABC
이번 달 총 결제 금액은 100,000원 입니다. 잔액은 20,000원 입니다.
`;

p.match(/ab/gi); // ['ab', 'AB']
p.match(/[\d,]+원/g); // ['100,000원', '20,000원']

const log = `[로그] 123 사용자가 로그인함
[로그] 서버 결제 트랜잭션 에러
[로그] Timeout 에러`;

log.match(/^\[로그\]\s.+에러$/gm); // ['[로그] 서버 결제 트랜잭션 에러', '[로그] Timeout 에러']
```

### group capture 그룹 캡쳐 (정규식의 옵션)

- `( )` : 여러개의 문자를 하나의 그룹으로 묶어서 처리할 수 있다.

그룹으로 묶은 문자열을 추출할 수 있다.

- `\1, \2, \3, ...` : 그룹으로 묶은 문자열을 정규식에서 가져올 수 있다.
- `$1, $2, $3, ...` : 그룹으로 묶은 문자열을 문자열에서 가져올 수 있다.
- `?` : 그룹으로 묶지만, capture 하지 않는다.

```js
const p = `import export ixport emport hellohello`;

p.match(/(im|ex)port/g); // ['import', 'export']
p.match(/(hello){2}/g); // ['hellohello']

// 같은 문자가 반복되는 부분 찾기
const p2 = 'abcabcdde';

p2.match(/([a-z])\1/g); // ['aa', 'bb', 'dd']
p2.replace(/.+([a-z])\1.+/, '반복된 문자는 $1입니다.'); // '반복된 문자는 d입니다.'

// url 모두 가져오기
const url = `http://google.com
https://google.com
google.com
ftp://google.com`;

url.match(/(https:\/\/|http:\/\/|ftp:\/\/)?\w+\.\w+/g); // ['http://google.com', 'https://google.com', 'google.com', 'ftp://google.com']

// 모듈 분석
const p3 = `import React from 'react'
import format from 'date-fns/format'
import mylib from 'node_modules/mylib/dist/index.ts'`;

p3.replace(
  /import\s(.+)\sfrom\s'(.+)'/g,
  '모듈 경로는 $2이고 모듈 이름은 $1입니다.'
); // '모듈 경로는 react이고 모듈 이름은 React입니다.모듈 경로는 date-fns/format이고 모듈 이름은 format입니다.모듈 경로는 node_modules/mylib/dist/index.ts이고 모듈 이름은 mylib입니다.'
```

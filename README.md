<<<<<<< HEAD
 
=======
### 🤖 설치 및 실행방법 
```javasciprt
1. git remote를 사용해 해당 원격저장소와 자신의 로컬 저장소를 연결합니다.

2. 연결되었다면 git pull main을 통해 자신의 로컬에 파일을 다운받습니다.
  
3. 모두 다운받았다면 npm install을 입력해 패키지들을 다운받습니다.

4. 모두 다운받았다면 npm run dev를 통해 개발서버를 실행시키면 해당 프로젝트가 실행됩니다.
```

### 🔨 사용 기술
- Frontend : react 19.0.0, next 15.1.0, tailwindcss 3.4.1, typscript, axios 1.7.9
- Backend : next 15.1.0, firebase 11.1.0
</br>

### 🌳 주요 구현 기능
#### (1) 로그인
- firebase에 등록되어 있는 이메일과 비밀번호를 이용해 로그인
#### 동작 방식
- 메인 페이지 입장후 로그인 버튼을 클릭
- 이후 열린 로그인 모달창에 firebase에 이미 사용자 등록을 해둔 이메일/비밀번호를 입력해 로그인을 시도
- auth와 입력한 이메일/비밀번호를 signInWithEmailAndPassword에 전달하며 호출
- firebase는 입력된 이메일과 비밀번호를 데이터베이스의 허용시킨 이메일, 비밀번호와 비교
- 로그인 성공시 로컬스토리지에 로그인이 성공했다는 key,value값 등록
- 책 목록 페이지로 이동

#### (2) 책 데이터 호출
- firebase에 저장한 책 데이터를 호출하여 시각화
#### 동작 방식
- 로그인 성공 후 책 목록 페이지 입장
- 책 데이터를 요청하는 fetchBooks함수호출 api/books에 책 데이터 요청
- 요청 성공 후 해당 데이터를 bookData라는 이름의 상태의 저장
- 저장한 데이터 렌더링

#### (3) 책 데이터 수정
- 기존 책 데이터에 고유값을 이용해 잔여수량, 판매수량 값 수정
#### 동작 방식
- 개별마다 존재하는 수정버튼 클릭
- 열린 수정 모달에 기존 잔여수량, 판매수량 값 시각화
- 변경값 적용 후 확인 버튼 클릭 -> handleModifySave함수 호출
- 수정완료한 책 데이터의 isbn13값을 api/books/[isbn13]에 수정 요청
- firebase에 isbn13값과 일치하는 데이터에 값에 새로운 값으로 변경
- 변경사항 적용후 렌더링

#### (4) 책 데이터 삭제
- 수정과 마찬가지로 고유값을 이용한 책 데이터 삭제
#### 동작 방식
- 개별마다 존재하는 삭제버튼 클릭
- handleDeleteClick함수 호출
- 삭제 선택한 책 데이터의 isbn13값을 api/books/[isbn13]에 삭제 요청
- firebase에 isbn13값과 일치하는 데이터를 데이터베이스에서 삭제
- 변경사항 적용후 렌더링

#### (5) 책 데이터 추가
- 새 책 등록에 필요한 데이터 값을 입력받아 기존 데이터베이스에 값 추가
#### 동작 방식
- 새 책 버튼 클릭 -> 새로운 책을 등록하는 모달 열림
- 이미지링크, 제목, 저자, isbn13...등의 필수 데이터 입력
- 값 모두 입력 후 확인 버튼 클릭 -> handleAddBook 함수 호출
- 빈 값 체크 후 모두 입력했다면 api/books에 새로운 책 데이터 전송
- 데이터베이스의 새로운 책 등록
- 새로고침 후 변경사항 적용

#### (6) 책 데이터 검색
- 제목 / 작가명 입력을 통한 책 검색 기능
#### 동작 방식
- 제목 / 작가명을 검색바에 입력
- 입력한 value값은 useDebouce에 전달되어 0.5초후 모인 결과값을 검색
- 검색명와 일차하는 제목 혹은 작가명을 가진 책들을 필터하여 시각화
- 존재하지 않는 책을 검색할 경우 "일치하는 검색 결화
>>>>>>> 162b4694184787d4eb2939bc80ddca6d9c785370

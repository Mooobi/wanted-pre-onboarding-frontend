## 프로젝트 소개

이 프로젝트는 원티드 프리온보딩 프론트엔드 12기 과정의 사전과제로,  
간단한 회원가입 및 로그인 기능과 투두리스트 생성,조회,수정,삭제 기능이 구현되어있습니다.

참여자: 박무생

[배포링크](https://wanted-pre-onboarding-frontend-blond.vercel.app)

## 폴더 구조

```
root
└── src/
    ├── common/
    │   ├── apis/
    │   │   ├── api
    │   │   └── util
    │   ├── components
    │   ├── util/
    │   │   └── constants.js
    │   └── styles.js
    ├── papes/
    │   ├── signIn
    │   ├── signUp
    │   └── todo
    ├── App.tsx
    ├── main.tsx
    └── router.tsx
```

## 실행 방법

위 배포 링크를 클릭하여 배포환경에서 실행하거나,
로컬 환경의 터미널에서 clone 후 npm install, npm start 순으로 입력하여 로컬환경에서 실행할 수 있습니다.

```
git clone https://github.com/Mooobi/wanted-pre-onboarding-frontend.git
npm install
npm start
```

## 사용 스택

<img src='https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white' alt='html5' />
<img src='https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white' alt='css3' />
<img src='https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white' alt='js' />
<img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' alt='react' />
<img src='https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white' alt='styled_components' />
<img src='https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white' alt='eslint' />
<img src='https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E' alt='prettier' />

## 요구사항
필수 요구사항은 아래와 같습니다.

### 회원가입 / 로그인
- 경로: 회원가입은 /signup, 로그인은 /signin
- 이메일 input
- 패스워드 input
- 제출 button
- 유효성 검사
  - 이메일 : @ 포함
  - 비밀번호: 8 자 이상
  - 검사 통과하지 못할 시 button에 disabled 속성 추가
- 회원가입 완료 시 /signin 경로로 이동
- 로그인 완료 시 /todo 경로로 이동
- 로그인 완료 시 응답받은 JWT 로컬 스토리지에 저장
- 로그인 여부에 따른 리다이렉트 처리
  - 토큰 있을 때 /signin 또는 /signup 페이지 접속 시 /todo 경로로 리다이렉트
  - 토큰 없을 때 /todo 페이지 접속 시 /signin 경로로 리다이렉트

### Todo List
- /todo 경로 접속 시 투두 리스트 목록 출력
Todo의 내용과 완료 여부 표시
완료여부는 input의 type을 checkbox로 설정하여 표현
Todo는 <li> 태그를 사용
Todo를 추가할 수 있는 input과 추가 button
추가 button 클릭 시 input의 내용을 새로운 Todo로 추가
Todo를 추가한 뒤 새로고침을 해도 추가한 Todo가 보여야 함
체크박스를 통해 Todo의 완료 여부 수정
Todo 우측에 수정 및 삭제 버튼
Todo 삭제 기능
- Todo 수정 기능
  - 수정 버튼 클릭 시 수정 모드 활성화
  - 수정 모드에서는 Todo의 내용이 input에 입력된 형태
  - 수정모드에서 Todo의 우측에 제출, 취소 버튼
  - 제출 버튼 클릭 시 수정모드 해제 및 내용 업데이트
  - 취소 버튼 클릭 시 수정 내용 초기화 및 수정모드 해제

## 구현 화면
![img](https://github.com/Mooobi/wanted-pre-onboarding-frontend/assets/124570875/554a1219-53b7-47f3-b6b5-6bc00373c606)

## 개발 과정

### 라우팅
react-router-dom을 사용하여 페이지 라우팅을 구현하였습니다. index.js에서 App 컴포넌트를 BrowserRouter로 감싸 라우팅 영역을 지정해 주고 Router 컴포넌트에 Route들을 넣어주었습니다.

```ts
// indext.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);

// Router.js
import { Route, Routes } from 'react-router-dom';
import Todo from './pages/todo/view/Todo';
import SignUp from './pages/signUp/view/SignUp';
import SignIn from './pages/signIn/view/SignIn';

export default function Router() {
  return (
    <Routes>
      <Route path='/todo' element={<Todo />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
    </Routes>
  );
}
```

### API
api 요청은 여러 곳에서 사용하기 때문에 재사용성이 높아야 한다고 생각했습니다. 그리고 공통 로직은 모듈화 내부에서 처리하는 게 효율적이라 판단했습니다. 따라서 모듈화 하여 함수 팩토리를 만들어 응답 body에 토큰이 있다면 로컬 스토리지에 저장하였고 instance와 interceptor를 사용하여 요청 시에 로컬 스토리지에 토큰이 있다면 headers에 토큰을 추가하여 보내도록 하였습니다.

```ts
// defaultApi.js
import { instance } from '../util/instance';

// 요청 및 후속처리하는 로직을 담고있는 함수 팩토리
async function makeRequest(method, url, data) {
  try {
    let res;

    switch (method) {
      case 'GET':
        res = await instance.get(url);
        break;
      case 'POST':
        res = await instance.post(url, data);
        break;
      case 'PUT':
        res = await instance.put(url, data);
        break;
      case 'DELETE':
        res = await instance.delete(url);
        break;
      default:
        throw new Error('Unsupported HTTP method');
    }

    // 응답 바디에 토큰이 있다면 로컬 스토리지에 토큰 저장
    if (res.data.access_token) {
      localStorage.setItem('access_token', res.data.access_token);
    }

    return res;
  } catch (err) {
    console.error(err);
  }
}

// 메서드별로 api 요청 기능을 하는 함수 export
export async function getData(url) {
  return makeRequest('GET', url);
}

export async function postData(url, data) {
  return makeRequest('POST', url, data);
}

export async function putData(url, data) {
  return makeRequest('PUT', url, data);
}

export async function deleteData(url) {
  return makeRequest('DELETE', url);
}
```
이후에 생각해 보니 응답 interceptor에서 후속처리도 같이 해주는 것이 더 깔끔하지 않았을까 하는 아쉬움이 남습니다.

### 회원가입, 로그인
회원가입과 로그인에서 요구하는 UI와 기능이 경로명, api를 제외하면 모두 동일하기 때문에 Form 컴포넌트를 만들어 두 페이지의 경로명에 따라 분기하여 사용해 주었습니다. 회원가입, 로그인이 성공하면 요구하는 페이지로 리다이렉트 해주었습니다. 

```ts
//SignUp.js
export default function SignUp() { // SignIn 컴포넌트는 컴포넌트명만 다름
  return (
    <Box>
      <Form />
    </Box>
  );
}

//Form.js
export default function Form() {

  ...

  const path = window.location.pathname; // 현재 경로 변수로 할당

  const navigate = useNavigate();

  ...
  
  const handleSubmit = async () => {
    // 현재 경로가 회원가입이라면 회원가입 api로 POST 요청
    const res = await postData(`/auth/${path === '/signup' ? 'signup' : 'signin'}`, {
      email: email,
      password: password,
    });

    // 요청 성공 시 결과에 따라 알맞은 페이지로 리다이렉트
    if (path === '/signup' && res.status === 201) {
      navigate('/signin');
    }
    
    if (path === '/signin' && res.status === 200) {
      navigate('/todo');
    }
    
    // 로그인 실패 시 alert
    if (path === '/signin' && res.status === 404) {
      alert('해당 사용자가 존재하지 않습니다.');
    }
    
    ...
    
  };

  // 경로 명에 따라 버튼, 링크 텍스트 변경
  return (
    <Wrapper>
    
	  ...
      
      <button
        data-testid={path === '/signup' ? 'signup-button' : 'signin-button'}
        disabled={!isButtonEnabled}
        onClick={handleSubmit}
      >
        {path === '/signup' ? '회원가입' : '로그인'}
      </button>
      <a href={path === '/signup' ? '/signin' : '/signup'}>
        {path === '/signup' ? '로그인 하기' : '회원가입 하기'}
      </a>
    </Wrapper>
  );
}
```

유효성 검사 함수를 만들고 이메일, 비밀번호 input의 onChange 함수 내에서 호출하여 유효성 검사를 하였습니다. 유효성 검사 함수의 isValid는 email, password 상태에 의존하고, 상태가 변하면 컴포넌트가 리렌더링 되어 isValid 값도 재설정되기 때문에 상태로 만들 필요가 없었습니다.

```ts
import { useState } from 'react';
import { styled } from 'styled-components';
import { postData } from '../apis/api/defaultApi';
import { useNavigate } from 'react-router-dom';

export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  ...
  
  // 이메일, 패스워드가 바뀔 때마다 boolean 값으로 유효성 검사 및 버튼 활성화 여부 설정
  const updateButtonState = (newEmail, newPassword) => {
    const isValidEmail = newEmail.includes('@');
    const isValidPassword = newPassword.length >= 8;
    setIsButtonEnabled(isValidEmail && isValidPassword);
  };
  
  // input 입력에 따라 email, password 상태 변경 및 유효성 검사 실행
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    updateButtonState(e.target.value, password);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    updateButtonState(email, e.target.value);
  };

  ...
  
  // onCange 속성에 이벤트 핸들러 등록
  return (
    <Wrapper>
      <label htmlFor='email'>Email</label>
      <input data-testid='email-input' id='email' value={email} onChange={handleEmailChange} />
      <label htmlFor='password'>Password</label>
      <input
        data-testid='password-input'
        id='password'
        type='password'
        value={password}
        onChange={handlePasswordChange}
      />
	  ...
    </Wrapper>
  );
}
```

### Todo List
TodoProvider로 Todo 페이지 컴포넌트를 감싸 Todo 페이지가 마운트 되었을 때 Todo 목록이 자동으로 GET 요청되고, 상태로 저장됩니다. 그리고 props로 내려주어 화면에 렌더링 되게 만들었습니다.

```ts
// Todo.js
export default function Todo() {
  const [todos, setTodos] = useState([]);

  return (
    <Box>
      <TodoProvider setTodos={setTodos}>
        <TodoInput setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </TodoProvider>
    </Box>
  );
}

// TodoProvider.js
export default function TodoProvider(props) {
  // 첫 렌더링 시 Todo 목록 GET 요청 후 상태로 저장
  useEffect(() => {
    const fetchData = async () => {
      const res = await getData('/todos');
      props.setTodos(res?.data);
    };

    fetchData();
  }, []);

  return props.children;
}
```

Todo Input 컴포넌트에서 Todo를 추가하는 기능과 UI를 담당하였습니다. 제출 후 응답으로 온 데이터를 기존 Todos 배열에 추가하여 화면에 출력되도록 하였습니다.

```ts
export default function TodoInput({ setTodos }) {
  const [newTodo, setNewTodo] = useState('');

  // 입력 시 newTodo 상태로 저장
  const handleTodoChange = (e) => {
    setNewTodo(e.target.value);
  };
  
  // 제출 버튼 클릭 시 POST 요청 및 기존 Todos 배열에 새로운 Todo 추가하여 화면에 출력
  const handleSubmit = async () => {
    if (newTodo !== '') {
      const res = await postData('/todos', { todo: newTodo });
      setTodos((prevTodos) => [...prevTodos, res.data]);
      setNewTodo('');
    }
  };
  
  // enter 키로로 제출 가능하도록 설정
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Wrapper>
      <input
        type='text'
        data-testid='new-todo-input'
        value={newTodo}
        onChange={handleTodoChange}
        onKeyUp={handleKeyUp}
      />
      <button data-testid='new-todo-add-button' onClick={handleSubmit}>
        추가
      </button>
    </Wrapper>
  );
}
```

TodoList 컴포넌트에서 Todo의 조회, 수정, 삭제가 가능하도록 구현하였습니다. props로 받아온 todos를 map 메서드로 처리하여 화면에 렌더링되게 만들었습니다. 

```ts
export default function TodoList({ todos, setTodos }) { // todos와 setTodos를 props로 받습니다.

  ...

  return (
    <List>
      {todos?.map((todo) => (
        <li key={todo.id}>
          {isEditing !== todo.id ? (
            <>
              <ContentSection>
                <input
                  type='checkbox'
                  defaultChecked={todo.isCompleted}
                  onChange={() => handleUpdateTodo(todo.id, todo.todo, !todo.isCompleted)}
                />
                <span>{todo.todo}</span>
              </ContentSection>
              <EditSection>
                <button
                  data-testid='modify-button'
                  onClick={() => handleEditClick(todo.id, todo.todo)}
                >
                  수정
                </button>
                <button data-testid='delete-button' onClick={() => handleDeleteTodo(todo.id)}>
                  삭제
                </button>
              </EditSection>
            </>
          ) : (
            
            ...
            
          )}
        </li>
      ))}
    </List>
  );
}
```

수정 버튼을 클릭하면 수정 상태로 변경하고 수정 상태가 되면 수정모드의 UI를 출력되게 하였습니다.

```ts
export default function TodoList({ todos, setTodos }) {
  const [isEditing, setIsEditing] = useState(null);

  ...

  const handleEditClick = (id, todo) => {
    setIsEditing(id);
    setEditedTodo(todo);
  };

  ...
  
  return (
    <List>
      {todos?.map((todo) => (
        <li key={todo.id}>
          {isEditing !== todo.id ? (
            <>
              // 조회 모드
            </>
          ) : (
            <>
              // 수정 모드
            </>
          )}
        </li>
      ))}
    </List>
  );
}
```

삭제 버튼 클릭 시 delete 이벤트 핸들러를 실행하도록 하였습니다. 삭제한 todo를 제외한 나머지 todo를 filtering 하여 삭제 후 변경된 상태를 출력하도록 하였습니다.

```ts
const handleDeleteTodo = (id) => {
  deleteData(`/todos/${id}`);

  const updatedTodos = todos.filter((todo) => todo.id !== id);

  setTodos(updatedTodos);
};
 

수정 화면에서 제출 시 수정된 todo를 POST 하고 현재 todos 배열 상태에서 id가 같은 todo를 찾아 변경된 todo로 교체하여 화면에 렌더링 되게 만들었습니다.

const handleUpdateTodo = async (id, todo, isCompleted) => {
  if (editedTodo !== '') {
    const updatedTodo = {
      todo: todo,
      isCompleted: isCompleted,
    };
    const res = await putData(`/todos/${id}`, updatedTodo);
     
    const updatedTodos = todos.map((todo) => (todo.id === id ? res.data : todo));
     
    setTodos(updatedTodos);
    setIsEditing(null);
  }
};
```
 
### 리다이렉트
AuthGaurd 컴포넌트에서 토큰 여부를 검사하여 요구사항과 부적합한 페이지 접근 시 리다이렉트 되도록 하고, App 최상단에서 감싸주어 제일 먼저 접근을 차단하도록 구현하였습니다.

```ts
// AuthGuard.js
export default function AuthGuard(props) {
  const navigate = useNavigate();
  const access_token = localStorage.getItem('access_token');
  const path = window.location.pathname;

  useEffect(() => {
    if ((path === '/' || path === '/signup' || path === '/signin') && access_token) {
      navigate('/todo');
    }

    if ((path === '/' || path === '/todo') && !access_token) {
      navigate('/signin');
    }
  }, [path, access_token]);

  return props.children;
}

// App.js
export default function App() {
  return (
    <>
      <AuthGuard>
        <GlobalStyle />
        <Wrapper>
          <Router />
        </Wrapper>
      </AuthGuard>
    </>
  );
}
```

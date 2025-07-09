# 전체 구조

- public/
  - {version}/
    - object/ : svg asset
    - img/ : image asset
    - asset.svg : sysbol icon
- src/

  - app/
    - ...pages/ : folder base routing
      - root.tsx
      - page.tsx
      - layout.tsx
    - feature/ : feature 개발을 테스트하기 위한 공간, feature 와 이름을 같게해서 사용하는 것이 컨벤션
  - common/
    - [...category domain](#category%20domain)/ : 종속성이 순수한 애들 > dom , browser , library , utils
  - design/ : design System
    - {version}/
      - ...token.scss
      - asset.tsx
  - feature/ : 요구 사항 기반의 개발 (task) > feature flag 가 존재하는 것은 해당 위치에 유지하고 그렇지 않은 것은 서비스로 병합
  - global/
    - logger
    - error 수집기
    - i18n
  - domain/: 도메인이 확실한 것들의 정의 , 확실하게 만들어서 붙이기
  - services/
    - 다양한 api 에 대한 스펙 타입 관리와 에러 처리 방식 표준화
    - 비즈니스 로직 붙은 프로덕트 서비스들 프론트[주체에 의한 정의 (채택)](<#주체에%20의한%20정의%20(채택)>)

- scripts/: 배포/빌드/유틸 스크립트
- tests/: 테스트 코드 설정 파일
- docs/: 문서
- template/: .hbs 파일

# 주체에 의한 정의법

정의는 그냥 있는게 없기 때문에 단일 책임 원칙을 지키고  
그 책임을 도메인으로 삼는다  
그리고 조합은 로직에 의해 결정되는 것이기 때문에 로직의 인터페이스를 가져온다

즉 로직이 주체가 된다  
합성 제약은 없고, 로직의 목적을 기반으로 응집성을 찾는다

# 응됩된 기능 내에서 파일 분할 하는 방법

## ui 구성 방법

action , view, widget , logic, eventMap(registry), hook , model 로 전체 구성을 정의함

action은 view를 제어하기 위한 로직으로 view state를 제어하는 action에 대한 정의임

- view State 는 따로 정의 해야 함
  view가 변경되는 패턴을 몇가지 상태로 표준화 하고 그 상태 값을 기반으로 view를 변환함
- 이는 피그마의 디자인 패턴과 비슷한 방식으로 관리되는 view state임
- 특정 입력 값을 기반으로 action를 통해 view State를 반환함
- view 는 view state에 의해 시각적 요소가 제어 됨

eventMap(registry)은 view에 트리거를 붙이기 위해 사용하는 요소 분할하는 역할

- onClick , onBlur 등에 어떤 action을 넣을 것인가
- 어떤 요소에 어떤 이벤트들을 넣을 것인가에 대한 결정
  view 는 순수 view의 형태로 정의

hook 은 model, action, logic 등을 연계해서 만들어짐

widget은 훅과 기타 등등으로 구성함

logic은 action은 아니지만 model이나 기타 연산이 되는 로직임
model은 store 나 context api, entity 같은 데이터 원천과 이를 위한 dto로 구성됨

### view state

view 자체를 고유한 컴포넌트 개념으로 구현
내부에는 컨텐츠들이 있고 view variant가 있음
view variant와 컨텐츠는 서로 분리되어 있어야 함

컨텐츠에 따라 view variant가 직접적으로 변경되는 것은 그 데이터에 의한 종속성이 심하기 때문에 분리해서 관리함

## function

ui 요소를 뺀 로직은 view, widget, eventMap(registry) , hook , action을 제외한
model, logic,

# 확장 방법

common ← global ← services ← shared ← domain ← feature ← ui ← pages(routes)

## common

다른 코드에서도 사용가능한 유틸들의 모음

## global

전역에서 사용 가능하고
프로젝트에 연관되어 커스텀되는 코드 들의 모음

- theme
- constant
- auth
- i18n
- policies
  - 법이나 정책, 세금 등의 값들의 설정 값, 정책적인 기준 정의

## services

(외부 서비스 통합)
api, database 같은 외부 서비스를 내부 로직과 결합하기 위한 레이어
외부 스펙과 프로젝트 내 에러와 로깅에 대한 통합을 구현

- /http
  - client.ts # HTTP 클라이언트
  - interceptors.ts # 요청/응답 인터셉터
  - type.ts # 해당 api의 타입
  - index.ts
- /jsonPlaceholder
  - client.ts # HTTP 클라이언트
  - interceptors.ts # 요청/응답 인터셉터
  - openapi.ts # 요청/응답 스펙 타입
  - type.ts # 내부 타입
  - action.ts # 몇가지 실행 가능한 액션들
  - constants.ts
  - index.ts # public

## shared

global과 비슷한데 프로젝트 내 공유 자원의 개념
상위 레이어와 결합할 수 있음

- ...category/
  - component
  - hook
  - types

## domain

비즈니스 도메인 기반, services 의 세부 타입들이 사용될 수도 있음
도메인 기준으로 구현

- user/
  - component/ : 도메인 관련 ui 컴포넌트
  - widget/ : 기능이 엮인 컴포넌트
    - hooks : 내부에서 action과 store 들을 연결함
    - action : 트리거를 표준화 함
  - store/ : context api 또는 store 객체
  - types/ : 도메인의 타입
  - utils/ : validation , helpers,
  - dto/ : 다른 도메인 데이터 또는 서비스 타입을 연결하는 인터페이스
  - docs/ : domain 에 대한 문서

## feature

기능 플래그, A/B 테스트, 태스크 정의, 분석 등 기능 관리
일단 이슈 단위로 정의하거나 실험적인 기능들, 개발 중인 것을 폴더 분할해서 작업

## ui

기능들과 도메인을 결합해서 page 로 정의한 것
경로에 대한 종속성 없이 페이지에 대한 정의

## pages , app, routes 중 하나

경로 라우팅 하는 레이어로 최종 아웃풋으로 정의할 수 있다
mobile, window resize, route params , metadata , ceo, server request, user agent, browser 이벤트에 대한 관리를 주로 함

# 결합 방식

의존성 방향을 지켜서 개발
같은 소속 끼리는 의존성 허용

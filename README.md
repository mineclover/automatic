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
  - design/ : design System
    - {version}/
      - ...token.scss
      - asset.tsx
  - feature/ : 요구 사항 기반의 개발 (task) > feature flag 가 존재하는 것은 해당 위치에 유지하고 그렇지 않은 것은 서비스로 병합
  - global/
  - api/ : 다양한 api 에 대한 스펙 타입 관리와 에러 처리 방식 표준화
  - domain/: 도메인이 확실한 것들의 정의 , 확실하게 만들어서 붙이기
  - service/
    - 비즈니스 로직 붙은 프로덕트 서비스들 프론트[주체에 의한 정의 (채택)](<#주체에%20의한%20정의%20(채택)>)
  - common/
    - [...category domain](#category%20domain)/ : 종속성이 순수한 애들 > dom , browser , library , utils
  - system/
    - logger
    - error 수집기
    - i18n
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

딱히 없을 경우 그냥 계층을 주지 않고 기능으로 정의한다

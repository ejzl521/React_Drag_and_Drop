import { DndProvider } from 'react-dnd-multi-backend';
// for mobile
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import {Container} from "./Container";

const App = () => {
  return (
    <div>
      {/*
        multi-backend의 DndProvider를 사용하고 options에 HTML5toTouch를 넣으면
        모바일에서 처리할 수 없는 drag 이벤트를 touch 이벤트로 바꿔줌!
        react-dnd를 사용할 컨테이너를 DndProvider로 감싸줌
       */}
      <DndProvider options={HTML5toTouch}>
        <Container/>
      </DndProvider>
    </div>
  );
}
export default App;
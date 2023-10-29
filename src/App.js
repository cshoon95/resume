import logo from './logo.svg';
import './App.css';

function App() {
  const outer = document.getElementById('outer');
  const middle = document.getElementById('middle');
  const inner = document.getElementById('inner');

  function logEventPhase(event) {
      console.log(`Event: ${event.type}, Phase: ${event.eventPhase}`);
  }

  outer.addEventListener('click', logEventPhase, true); // 이벤트 캡처링
  middle.addEventListener('click', logEventPhase, true); // 이벤트 캡처링
  inner.addEventListener('click', logEventPhase, true); // 이벤트 캡처링

  outer.addEventListener('click', logEventPhase, false); // 이벤트 버블링
  middle.addEventListener('click', logEventPhase, false); // 이벤트 버블링
  inner.addEventListener('click', logEventPhase, false); // 이벤트 버블링

  return (
    <div id="outer">
      Outer
        <div id="middle">
            Middle
            <button id="inner">Inner</button>
        </div>
    </div>
    );
  }

export default App;

import logo from './logo.svg';
import './App.css';
import TaskBoard from './components/task-board';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <Header/>
      <TaskBoard/>
    </div>
  );
}

export default App;

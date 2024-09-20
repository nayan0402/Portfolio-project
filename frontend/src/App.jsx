import {NB, Welcome} from './components';

const App = () =>{
  return(
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <NB />
        <Welcome />
      </div>
    </div>
  )
}

export default App;
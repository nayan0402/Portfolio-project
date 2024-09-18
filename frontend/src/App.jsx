import {NB, Welcome, Watchlist} from './components';

const App = () =>{
  return(
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <NB />
        <Welcome />
        <Watchlist />
      </div>
    </div>
  )
}

export default App;
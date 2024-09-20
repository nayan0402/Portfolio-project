import {NB, Welcome, Watchlist, Services} from './components';

const App = () =>{
  return(
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <NB />
        <Welcome />
        <Services />
        <Watchlist />
      </div>
    </div>
  )
}

export default App;
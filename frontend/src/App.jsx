import {NB, Welcome, Watchlist, Services, TokenApprove} from './components';

const App = () =>{
  return(
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <NB />
        <Welcome />
        <Services />
        <Watchlist />
        <TokenApprove />
      </div>
    </div>
  )
}

export default App;
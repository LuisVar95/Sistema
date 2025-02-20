import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Layout from './layouts/Layout'
import Cultivos from './paginas/Cultivos'
import Plantas from './paginas/Plantas'
import Esquejes from './paginas/Esquejes'
import Home from './paginas/Home'
import Registros from './paginas/Registros'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>}/>
          <Route path='/cultivos' element={<Cultivos/>}/>
          <Route path='/plantas' element={<Plantas/>}/>
          <Route path='/esquejes' element={<Esquejes/>}/>
          <Route path='/registros' element={<Registros/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
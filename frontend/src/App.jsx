import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Layout from './layouts/Layout'
import Cultivos from './paginas/Cultivos'
import Plantas from './paginas/Plantas'
import Esquejes from './paginas/Esquejes'
import InfoPlanta from './paginas/InfoPlanta'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Cultivos/>}/>
          <Route path='/plantas' element={<Plantas/>}/>
          <Route path='/esquejes' element={<Esquejes/>}/>
          <Route path="/plantas/:id" element={<InfoPlanta />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
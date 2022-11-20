import ReactDOM from 'react-dom/client'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom"
import './index.css'
import './fonts/Menlo-Regular.ttf'
import App from './App'
import About from './components/about'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
      </Routes>
  </BrowserRouter>
)

import { createRoot } from 'react-dom/client'
import Contexts from './contexts/Contexts/Contexts'
import DefaultRoutes from './routes/Routing'

createRoot(document.getElementById('root')!).render(
  <Contexts>
    <DefaultRoutes />
  </Contexts>,
)

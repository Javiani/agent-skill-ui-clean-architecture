import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Catalog } from './domains/catalog'
import { DefaultLayout } from './layouts/DefaultLayout'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DefaultLayout><Catalog /></DefaultLayout>
  </StrictMode>,
)

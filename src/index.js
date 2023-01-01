import React from 'react'
import './index.css'
import App from './App'
import * as ReactDOM from 'react-dom/client'
//Strict Mode
// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
//Non-Strict Mode
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
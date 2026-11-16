import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { ModuleDemo } from './scene/ModuleDemo.jsx';
import '../styles.css';

const showModuleDemo = new URLSearchParams(location.search).get('demo') === 'modules';
createRoot(document.getElementById('root')).render(<React.StrictMode>{showModuleDemo ? <ModuleDemo /> : <App />}</React.StrictMode>);

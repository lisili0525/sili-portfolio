import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { ModuleDemo } from './scene/ModuleDemo.jsx';
import '../styles.css';

const runtimePreview = import.meta.env.DEV || import.meta.env.MODE === 'runtime-preview';
const Prototype = runtimePreview && new URLSearchParams(location.search).get('demo') === 'runtime'
  ? React.lazy(() => import('./scene/prototype/Prototype.tsx')) : null;

const ObjectLibrary = runtimePreview && new URLSearchParams(location.search).get('demo') === 'objects'
  ? React.lazy(() => import('./scene/assets/ObjectLibrary.jsx')) : null;

const showModuleDemo = new URLSearchParams(location.search).get('demo') === 'modules';
createRoot(document.getElementById('root')).render(<React.StrictMode>{ObjectLibrary ? <React.Suspense fallback={<p>Loading object library…</p>}><ObjectLibrary /></React.Suspense> : Prototype ? <React.Suspense fallback={<p>Loading scene prototype…</p>}><Prototype /></React.Suspense> : showModuleDemo ? <ModuleDemo /> : <App />}</React.StrictMode>);

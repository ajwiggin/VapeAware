import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import * as serviceWorkerRegistration from './server/serviceWorkerRegistration';
import reportWebVitals from './server/reportWebVitals';
import useMediaQuery from './server/useMediaQuery';

ReactDOM.render(
  <React.StrictMode>
    <Content />
  </React.StrictMode>,
  document.getElementById('root')
);

function Content() {
  const isMobile = useMediaQuery('(max-width: 1000px)');
  return isMobile ? <App /> : (
    <>
      <h1>WWU NEAT Lab Vaping Study</h1>
      <p>This app is only available on mobile devices.</p>
    </>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA'
if (process.env.NODE_ENV === "development") serviceWorkerRegistration.unregister();
else serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

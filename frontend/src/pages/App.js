import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import NotFound from './components/NotFound/NotFound';
// import { ToastContainer } from 'react-toastify';
// import Home from './components/Home/Home';
// import About from './components/About/About';

function App() {
  return (
    <div className="flex flex-col mt-20 content-center items-center">
      <h2 className="text-5xl font-bold">Five blocks!</h2>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Smart contracts!</h2>
          <p>La mejor lotería del mundo basada en blockchain</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">All in</button>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <div className="min-h-screen mb-auto">
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/about" element={<About />} />
    //       <Route path="*" element={<NotFound />} />
    //     </Routes>
    //   </div>
    //   <ToastContainer />
    // </div>
  );
}

export default App;

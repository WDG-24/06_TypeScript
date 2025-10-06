import { Route, Routes } from 'react-router';
import { About, Contact, Destinations, Home, NotFound, SingleDestination } from './pages';
import MainLayout from './layouts/MainLayout.jsx';
import ProtectedLayout from './layouts/ProtectedLayout.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/destinations' element={<Destinations />} />
        <Route element={<ProtectedLayout />}>
          <Route path='/destinations/:slug' element={<SingleDestination />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;

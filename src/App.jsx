import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import PropertyList from './components/PropertyList'
import PropertyDetail from "./components/PropertyDetail"
import Footer from './components/Footer'
import Favoritos from './components/Favoritos'
import RegisterUser from './pages/RegisterUser'
import UserLogin from './pages/UserLogin'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Property from './pages/Property'
import { AuthProvider } from './contexts/AuthContext'
import NotFound from './pages/NotFound'
import DashboardUser from './pages/DashboardUser'
import CreateAgency from "./components/CreateAgency"; 
import CreateProperty from './components/CreateProperty'
import ComingSoonPage from './pages/ComingSoonPage'
import Planes from './pages/Planes'
import SuscripcionExito from './pages/SuscripcionExito'
import SuscripcionCancelada from './pages/SuscripcionCancelada'
import AgencyDetail from './pages/AgencyDetail'
import EditProperty from './components/EditProperty'
import EditUser from './components/EditUser'
import DeleteUser from './components/DeleteUser'
import OAuth2Callback from './pages/OAuth2Callback'


function App() {

  return (
      <AuthProvider>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-property" element={<CreateProperty />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/property/:id/edit" element={<EditProperty />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/register" element={<RegisterUser />} />
              <Route path="/usuario" element={<DashboardUser />} />
              <Route path="/create-agency" element={<CreateAgency />} />
              <Route path="/agency/:id?" element={<AgencyDetail />} />
              <Route path="/detail-agency" element={<AgencyDetail />} />
              <Route path="/coming-soon" element={<ComingSoonPage />} />
              <Route path="/search" element={<SearchBar />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/edit-user" element={<EditUser />} />
              <Route path="/delete-user" element={<DeleteUser />} />
              <Route path="/oauth2/callback" element={<OAuth2Callback />} />
          </Routes>
      </AuthProvider>
  );
}

export default App

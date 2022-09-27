import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages
import Home from './screens/Home'
import NotFound from './screens/NotFound'
import Personalize from './screens/Personalize'
import Revengers from './screens/Reverngers'

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/revengers" element={<Revengers />} />
      <Route path="/personalize" element={<Personalize />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router

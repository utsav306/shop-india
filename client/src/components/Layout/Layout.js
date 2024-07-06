import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast';


const Layout = (porps) => {
  return (
    <>
    <Header></Header>
    <main style={{minHeight:'70vh'}}>
    <Toaster />
        {porps.children}
    </main>
    <Footer></Footer>
    </>
  )
}

export default Layout
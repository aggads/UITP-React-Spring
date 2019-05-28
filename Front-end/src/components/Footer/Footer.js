import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer mt-5 p-4">
        Copyright &copy; {new Date().getFullYear()} becode.org
    </footer>
  )
}

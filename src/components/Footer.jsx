import React from 'react'

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 text-center py-3 shadow-md z-50">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        &copy; {new Date().getFullYear()} collageprep. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer

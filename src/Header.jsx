import { useContext } from 'react'
import { ThemeContext } from './ThemeContext.jsx'

function Header() {
  const { theme, toggleTheme } =
    useContext(ThemeContext)

  return (
    <header className="header">
      <h1>학생 검색 시스템</h1>

      <button onClick={toggleTheme}>
        {theme === 'light'
          ? '다크모드'
          : '라이트모드'}
      </button>
    </header>
  )
}

export default Header
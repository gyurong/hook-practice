import {
  useState,
  useMemo,
  useCallback,
  useContext,
} from 'react'

import './App.css'
import Header from './Header.jsx'
import StudentList from './StudentList.jsx'
import { ThemeContext } from './ThemeContext.jsx'
import students from './students.json'

function App() {
  const [nameSearch, setNameSearch] = useState('')
  const [majorSearch, setMajorSearch] = useState('')

  const { theme } = useContext(ThemeContext)

  const filteredStudents = useMemo(() => {
    return students.filter(
      (student) =>
        student.name.includes(nameSearch) &&
        student.major.includes(majorSearch)
    )
  }, [nameSearch, majorSearch])

  const averageScore = useMemo(() => {
    if (filteredStudents.length === 0) {
      return 0
    }

    const total = filteredStudents.reduce(
      (sum, student) => sum + student.score,
      0
    )

    return Math.round(
      total / filteredStudents.length
    )
  }, [filteredStudents])

  const clearSearch = useCallback(() => {
    setNameSearch('')
    setMajorSearch('')
  }, [])

  return (
    <main
      className={
        theme === 'light'
          ? 'page light'
          : 'page dark'
      }
    >
      <Header />

      <section className="search-box">
        <label>학생 검색</label>

        <div className="search-row">
          <input
            type="text"
            placeholder="학생 이름 입력"
            value={nameSearch}
            onChange={(e) =>
              setNameSearch(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="전공 입력"
            value={majorSearch}
            onChange={(e) =>
              setMajorSearch(e.target.value)
            }
          />

          <button onClick={clearSearch}>
            검색 초기화
          </button>
        </div>

        <p className="search-result">
          검색 결과 {filteredStudents.length}명 · 평균 점수{' '}
          {averageScore}점
        </p>
      </section>

      <StudentList students={filteredStudents} />

      <footer className="footer">
        <p>
          개인정보처리방침
          {' | '}
          이용약관
          {' | '}
          <a
            href="https://home.chungwoon.ac.kr/intro/index.do"
            target="_blank"
            rel="noreferrer"
          >
            학교 홈페이지
          </a>
        </p>

        <p>© 2026 Student Search System</p>
      </footer>
    </main>
  )
}

export default App
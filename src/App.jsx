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

const students = [
  {
    id: 1,
    name: '이규원',
    major: '멀티미디어',
    score: 85,
  },
  {
    id: 2,
    name: '안민혁',
    major: '멀티미디어',
    score: 92,
  },
  {
    id: 3,
    name: '임현지',
    major: '멀티미디어',
    score: 76,
  },
  {
    id: 4,
    name: '이재경',
    major: '멀티미디어',
    score: 88,
  },
  {
    id: 5,
    name: '이정원',
    major: '멀티미디어',
    score: 95,
  },
]

function App() {
  const [search, setSearch] = useState('')

  const { theme } = useContext(ThemeContext)

  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      student.name.includes(search)
    )
  }, [search])

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
    setSearch('')
  }, [])

  return (
    <main
      className={
        theme === 'light'
          ? 'page light'
          : 'page dark'
      }
    >
      <div className="content">
        <Header />

        <section className="intro-box">
          <p className="intro-label">
            STUDENT SEARCH
          </p>

          <h2>멀티미디어 학생 검색</h2>

          <p>
            학생 이름을 입력해 정보를 빠르게 찾아보세요.
          </p>
        </section>

        <section className="search-box">
          <label>학생 이름 검색</label>

          <div className="search-row">
            <input
              type="text"
              placeholder="학생 이름을 입력하세요"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <button onClick={clearSearch}>
              초기화
            </button>
          </div>

          <div className="search-info">
            <div>
              <span>검색 결과</span>
              <strong>
                {filteredStudents.length}명
              </strong>
            </div>

            <div>
              <span>평균 점수</span>
              <strong>
                {averageScore}점
              </strong>
            </div>
          </div>
        </section>

        <StudentList
          students={filteredStudents}
        />

        {filteredStudents.length === 0 && (
          <div className="empty-box">
            검색 결과가 없습니다.
          </div>
        )}

        <footer>
          Multimedia Student Search System
        </footer>
      </div>
    </main>
  )
}

export default App
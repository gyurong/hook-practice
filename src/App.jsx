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
    major: '치이카와전공',
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
    major: '컴퓨터공학과',
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
    return students.filter(
      (student) =>
        student.name.includes(search) ||
        student.major.includes(search)
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
      <Header />

      <section className="search-box">
        <label>학생 이름 또는 전공 검색</label>

        <div className="search-row">
          <input
            type="text"
            placeholder="학생 이름 또는 전공 입력"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
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

      <StudentList
        students={filteredStudents}
      />
    </main>
  )
}

export default App
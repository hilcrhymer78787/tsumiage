import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TestPage from '@/pages/testpage'
import TaskList from '@/components/task/TaskList'
import Test from '@/components/Test'
import 'setimmediate'

it('text[Welcome to Nextjs]', () => {
  render(<TestPage />)
  expect(screen.getByText('Welcome to Nextjs')).toBeInTheDocument()
})

it('text[日付の出力]', () => {
  render(
    <TaskList
      readonly={true}
      userId={1}
      date="2022-12-31"
    />
  )
  // screen.debug()
  expect(screen.getByText('2022-12-31')).toBeInTheDocument()
})

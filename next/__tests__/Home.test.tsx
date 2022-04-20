import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TestPage from '@/pages/testpage'
import Test from '@/components/Test'
import 'setimmediate'

it('text[Welcome to Nextjs]', () => {
  render(<TestPage />)
  expect(screen.getByText('Welcome to Nextjs')).toBeInTheDocument()
})

it('text[サンプル]', () => {
  render(<Test />)
  expect(screen.getByText('サンプル')).toBeInTheDocument()
})

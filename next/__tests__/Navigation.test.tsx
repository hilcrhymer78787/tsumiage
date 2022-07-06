/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { getPage } from 'next-page-tester'
import { initTestHelpers } from 'next-page-tester'
import 'setimmediate'

initTestHelpers()

describe('Navigation by Link', () => {
  it('Navigation', async () => {
    const { page } = await getPage({
      route: '/login',
    })
    render(page)
    screen.debug()
  },90000)
})

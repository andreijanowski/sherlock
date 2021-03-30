
import { addProtocol } from '../urls'

describe('addProtocol', () => {
  it('defaults', () => {
    const res = addProtocol()

    expect(res).toBe('https://')
  })

  it('adds https:// to the beginning of the URL', () => {
    const res = addProtocol('site.com')

    expect(res).toBe('https://site.com')
  })

  it('processes strings beginning with "://"', () => {
    const res = addProtocol('://site.com')

    expect(res).toBe('https://site.com')
  })
})

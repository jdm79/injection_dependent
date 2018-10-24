import reducer from '../redux/reducers/index'
import injectionsites from '../components/injectionsites';
import moment from 'moment';
import timekeeper from 'timekeeper';

describe('sites reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}).sites).toEqual(injectionsites)
  })
  it('should handle sites-next-injection-site', () => {
    expect(
      reducer({
        sites: [1,2,3,4,5],
        history: [1]
      }, {
        type: 'sites-next-injection-site'
      })
    ).toEqual({ sites: [2,3,4,5,1], history: [1] })
  })
  it('should handle sites-rotate-n-sites', () => {
    expect(
      reducer({
        sites: [1,2,3,4,5],
        history: [1]
      }, {
        type: 'sites-rotate-n-sites',
        number: 3
      })
    ).toEqual({ sites: [4,5,1,2,3], history: [1] })
  })
  it('should handle site reset', () => {
    expect(reducer({
      sites: [3,4,5,1,2],
      history: [1]
    }, {
      type: 'sites-reset-defaults'
    })).toEqual({ sites: injectionsites, history: [1] })
  })
})

describe('history reducer', () => {
  timekeeper.freeze(new Date(1539760000000))
  const defaultHistory = [{ site: injectionsites[injectionsites.length - 1], time: moment() }];

  it('should return the initial state', () => {
    expect(reducer(undefined, {}).history).toEqual(defaultHistory)
  })
  it('should handle history-save-injection', () => {
    expect(
      reducer({
        sites: [1,2,3,4,5],
        history: [1]
      }, {
        type: 'history-save-injection',
        item: 2
      })
    ).toEqual({ sites: [1,2,3,4,5], history: [1, 2] })
  })
  it('should handle history reset', () => {
    expect(reducer({
      sites: [3,4,5,1,2],
      history: [1]
    }, {
      type: 'history-reset-defaults'
    })).toEqual({ sites: [3,4,5,1,2], history: defaultHistory })
  })
})
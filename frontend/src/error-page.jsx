import './error-page.css'

export default function ErrorPage () {
  return (
    <main className='error-page'>
      <div className='container'>
        <div className='eyes'>
          <div className='eye'>
            <div className='eye__pupil eye__pupil--left' />
          </div>
          <div className='eye'>
            <div className='eye__pupil eye__pupil--right' />
          </div>
        </div>

        <div className='error-page__heading'>
          <h1 className='error-page__heading-title'>Looks like you're lost</h1>
          <p className='error-page__heading-description'>404 error</p>
        </div>

        <a
          className='error-page__button'
          href='#'
          aria-label='back to home'
          title='back to home'
        >
          back to home
        </a>
      </div>
      <button className='color-switcher' data-theme-color-switch>
        &#127769;
      </button>
    </main>
  )
}

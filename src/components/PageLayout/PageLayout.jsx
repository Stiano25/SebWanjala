import './PageLayout.css'

const PageLayout = ({ header, children, aside, fullWidth = false }) => {
  return (
    <div className="page page-enter">
      <div className="container page-layout">
        {header && <div className="page-layout__header">{header}</div>}
        <div className={`page-layout__grid ${fullWidth ? 'page-layout__grid--full' : ''}`}>
          <div className={`page-layout__main ${fullWidth ? 'page-layout__main--full' : ''}`}>
            {children}
          </div>
          {!fullWidth && aside && (
            <aside className="page-layout__aside">{aside}</aside>
          )}
        </div>
      </div>
    </div>
  )
}

export default PageLayout

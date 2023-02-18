import gradient from "./../../styles/gradients.module.css";

const TopBanner = ({children}) => {
    return (
      <main className={gradient.governance_gradient}>
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-48 sm:py-48 lg:py-50">
            <div className="text-center">
              <h1 data-aos={"fade-in"} className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {children}
              </h1>
            </div>
          </div>
        </div>
    </main>
  )
}

export default TopBanner;
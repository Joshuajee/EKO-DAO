import Link from "next/link";
import gradient from "./../../../styles/gradients.module.css";

export default function HeroSection() {

  return (
      <main className={gradient.hero_gradient}>
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-48 sm:py-48 lg:py-50">
           
            {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Announcing our next round of funding.{' '}
                <a href="#" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div> */}

            <div className="text-center">
              <h1 data-aos={"fade-in"} className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Decentralised Learning at your Fingertips
              </h1>
              <p data-aos={"fade-in"} className="mt-6 text-lg leading-8 text-gray-600">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/proposals"
                  className="rounded-md bg-blue-700 px-6 py-2 text-lg font-semibold leading-7 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Governance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}

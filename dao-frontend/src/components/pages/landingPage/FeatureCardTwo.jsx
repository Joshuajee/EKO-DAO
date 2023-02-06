const FeatureCardTwo = ({lottie, title, isRight}) => {


    const rightSide = (
        <div data-aos="fade-right" class="flex items-center lg:w-3/5 mx-auto pb-10 mb-10 sm:flex-row flex-col">
            <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h2 class="text-gray-900 text-lg title-font font-semibold mb-2">{title}</h2>
                <p class="leading-relaxed text-base">
                    Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.
                </p>
                <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </a>
            </div>

            <div class="sm:w-60 sm:order-none order-first sm:h-60 h-60 w-60 sm:ml-10 inline-flex items-center justify-center flex-shrink-0">
                <lottie-player 
                    src={lottie}  
                    background="transparent"  
                    speed="1"  loop  autoplay />
            </div>

        </div>
    )


    const leftSide = (
        <div data-aos="fade-left" class="flex items-center lg:w-3/5 mx-auto pb-10 mb-10 sm:flex-row flex-col">
                
            <div class="sm:w-60 sm:h-60 h-60 w-60 sm:mr-10 inline-flex items-center justify-center flex-shrink-0">
                <lottie-player 
                    src={lottie}  
                    background="transparent"  
                    speed="1"  loop  autoplay />
            </div>

            <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h2 class="text-gray-900 text-lg title-font font-semibold mb-2">{title}</h2>
                <p class="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
                </a>
            </div>
        </div>    
    )

    return isRight ? rightSide : leftSide

}

export default FeatureCardTwo
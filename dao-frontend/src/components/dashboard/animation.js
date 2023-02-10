export const container = {
    hidden: { 
        opacity: 0,
        transition: {
            duration: 0.6
        }
    },
    show: {
        opacity: 1,
        transition: {
            delayChildren: 0.5
        }
    }
}
  

export const menuAnimate = {
    enter: {
        x: 280,
        transition: {
            duration: 0.5,
            staggerChildren: 0.2,
            staggerDirection: 1
        },
        display: "block"
    },
    exit: {
        x: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.2,
            staggerDirection: -1
        },
        transitionEnd: {
            display: "none"
        }
    }
};


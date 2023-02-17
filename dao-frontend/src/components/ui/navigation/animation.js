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


export const menuAnimate = (width) => {
    return {
        enter: {
            x: 0,
            transition: {
                duration: 0.3,
                staggerChildren: 0.2,
                staggerDirection: 1
            },
            transitionStart: {
                display: "none"
            },
            display: "block"
        },
        exit: {
            x: Number(width),
            transition: {
                duration: 0.3,
                staggerChildren: 0.2,
                staggerDirection: 1
            },
            transitionEnd: {
               display: "none"
            }
        }
    }
};
  

// export const menuAnimate = (width) => {
//     console.log("i ", width)
//     return {
//         enter: {
//             x: Number(width),
//             transition: {
//                 duration: 0.5,
//                 staggerChildren: 0.2,
//                 staggerDirection: 1
//             },
//             display: "block"
//         },
//         exit: {
//             x: 0,
//             transition: {
//                 duration: 0.5,
//                 staggerChildren: 0.2,
//                 staggerDirection: -1
//             },
//             transitionEnd: {
//                // display: "none"
//             }
//         }
//     }
// };


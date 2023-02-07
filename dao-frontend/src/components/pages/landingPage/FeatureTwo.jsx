import FeatureCard from "./FeatureCard";
import { MdSchool } from "react-icons/md";
import { FaVoteYea, FaAward } from "react-icons/fa";
import { links } from "@/libs/routes";
import FeatureCardTwo from "./FeatureCardTwo";


export default function FeatureTwo (){
    
    return (
        <section className="text-gray-600 body-font bg-slate-100">
            <div className="container px-5 py-24 mx-auto">

                <FeatureCardTwo 
                    title={"Join a Cohort"}
                    lottie={"https://assets3.lottiefiles.com/packages/lf20_xxyvtiab.json"}
                    isRight={false}>

                </FeatureCardTwo>

                <FeatureCardTwo
                    title={"Join Hackathons"} isRight={true}
                    lottie={"https://assets2.lottiefiles.com/private_files/lf30_mksyrgzs.json"}>

                </FeatureCardTwo>

                <FeatureCardTwo 
                    title={"Decentralised Vote"} isRight={false}
                    lottie ={"https://assets4.lottiefiles.com/packages/lf20_hxwcQt.json"}
                    >
                
                </FeatureCardTwo>

                <FeatureCardTwo 
                    title={"Decentralised Crowdfunding"} isRight={true}
                    lottie={"https://assets6.lottiefiles.com/packages/lf20_ocBLovFChM.json"}>
                
                </FeatureCardTwo>

            </div>
        </section>
    )
}
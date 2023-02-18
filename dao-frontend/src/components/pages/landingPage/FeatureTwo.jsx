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
                    Empower your education with Ekolance DAO. Commit funds, 
                    receive ekoStable tokens, and claim funds back upon program completion. 
                    Join a supportive community of decentralized learners and take 
                    control of your future
                </FeatureCardTwo>

                <FeatureCardTwo
                    title={"Join Hackathons"} isRight={true}
                    lottie={"https://assets2.lottiefiles.com/private_files/lf30_mksyrgzs.json"}>
                    Join the innovation revolution with Ekolance DAO&apos;s hackathons. 
                    Collaborate with top talent, showcase your skills, and push the limits 
                    of what&apos;s possible. To participate, hold score tokens and get 
                    ready to make an impact. Experience the thrill of victory and drive 
                    your career forward. Sign up now and be part of shaping the future.
                </FeatureCardTwo>

                <FeatureCardTwo 
                    title={"Decentralised Vote"} isRight={false}
                    lottie ={"https://assets4.lottiefiles.com/packages/lf20_hxwcQt.json"}>
                    Join Ekolance DAO and Shape Your Community with Decentralized Votes. 
                    Raise proposals, hold Ekotokens, and cast your vote on community decisions. 
                    Ensure fair and transparent decision-making with our publicly recorded 
                    voting system. Be part of a collective pushing for progress and empowerment.
                </FeatureCardTwo>

                <FeatureCardTwo 
                    title={"Decentralised Crowdfunding"} isRight={true}
                    lottie={"https://assets6.lottiefiles.com/packages/lf20_ocBLovFChM.json"}>
                    Unleash Your Ideas with Decentralized Crowdfunding on Ekolance DAO. 
                    Raise funds in stablecoins for your projects, events and activities with 
                    our transparent and secure platform. Get the support you need to turn 
                    your vision into reality with Ekolance DAO&apos;s decentralized 
                    crowdfunding campaigns.
                </FeatureCardTwo>

            </div>
 
        </section>
    )
}
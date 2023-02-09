import FeatureCard from "./FeatureCard";
import { MdSchool } from "react-icons/md";
import { FaVoteYea, FaAward } from "react-icons/fa";
import { links } from "@/libs/routes";


export default function Feature (){
    
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    <FeatureCard title={"Join Cohort"} icon={<MdSchool size={24} route={links.cohorts} />}>
                        Take Control of Your Learning Journey: Join a Community of Like-Minded Students and Reach Your Goals
                    </FeatureCard>
                    <FeatureCard title={"Participate in Hackathons"} icon={<FaAward size={24} />} route={links.hackathons}>
                        Innovate and Create with the Best: Join the Exciting World of Ekolance Hackathons
                    </FeatureCard>
                    <FeatureCard title={"Vote"} icon={<FaVoteYea size={24} />} route={links.proposals}>
                        Make Your Voice Heard: Cast Your Vote and Help Shape the Future of the Ekolance Community
                    </FeatureCard> 
                </div>
            </div>
        </section>
    )
}
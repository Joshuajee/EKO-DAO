import FeatureCard from "./FeatureCard";
import { MdSchool } from "react-icons/md";
import { FaVoteYea, FaAward } from "react-icons/fa";
import { links } from "@/libs/routes";


export default function Feature (){
    
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    <FeatureCard title={"Join Cohort"} icon={<MdSchool size={24} route={links.cohorts} />} />
                    <FeatureCard title={"Participate in Hackathons"} icon={<FaAward size={24} />} route={links.hackathons} />
                    <FeatureCard title={"Vote"} icon={<FaVoteYea size={24} />} route={links.proposals} /> 
                </div>
            </div>
        </section>
    )
}
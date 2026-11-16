import { getApplications } from "@/lib/api/applications";


interface JobRecruitDetailsPageProps {
  params: Promise<{ id: string }>
}

const JobRecruitDetailsPage = async ({params}: JobRecruitDetailsPageProps) => {
    const {id} = await params;

    const result = await getApplications(`jobId=${id}`);
    console.log("rec",result);
    return (
        <div>

        </div>
    );
};

export default JobRecruitDetailsPage;

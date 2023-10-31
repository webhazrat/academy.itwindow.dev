import ProfileLayout from "@/src/components/ProfileLayout";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import { useUserEnrolls } from "@/src/hook/useUserEnrolls";
import { fetcher } from "@/src/lib/utils";
import { checkLogin } from "@/src/middleware/clientAuth";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function PresentReport() {
  const router = useRouter();
  const [enrollId, setEnrollId] = useState("");
  const [url, setUrl] = useState(null);
  const { enrolls, isLoading } = useUserEnrolls();
  const enrollBatches = enrolls?.filter((enroll) => enroll.batchId);

  const { data: attendancesData } = useSWR(url, fetcher);
  const attendances = attendancesData?.data;

  useEffect(() => {
    if (enrollBatches?.length > 0) {
      router.push(`?enrollId=${enrollBatches[0]._id}`);
      setUrl(`/api/attendances/enroll?enrollId=${enrollBatches[0]._id}`);
      setEnrollId(enrollBatches[0]._id);
    }
  }, [isLoading]);

  const handleAttendances = (enrollId) => {
    router.push(`?enrollId=${enrollId}`);
    setUrl(`/api/attendances/enroll?enrollId=${enrollId}`);
    setEnrollId(enrollId);
  };

  let presentData = [];
  const present = attendances?.filter((attendance) => {
    if (attendance.status === "Present") {
      presentData.push(attendance.date);
    }
  });

  let absentData = [];
  const absent = attendances?.filter((attendance) => {
    if (attendance.status === "Absent") {
      absentData.push(new Date(attendance.date));
    }
  });

  let leaveData = [];
  const leave = attendances?.filter((attendance) => {
    if (attendance.status === "Leave") {
      leaveData.push(new Date(attendance.date));
    }
  });

  console.log({ presentData, absentData, leaveData });

  const [date, setDate] = useState(presentData);
  return (
    <>
      <ProfileLayout>
        <div>
          <h1 className="text-xl font-medium mb-3">উপস্থিতি রিপোর্ট</h1>
          <div className="flex lg:flex-row flex-col gap-4">
            <div>
              {enrollBatches?.length > 0 &&
                enrollBatches.map((enroll) => (
                  <Button
                    key={enroll._id}
                    variant={`${
                      enroll._id === enrollId ? "secondary" : "ghost"
                    }`}
                    onClick={() => handleAttendances(enroll._id)}
                  >
                    {enroll.batchId.code} - {enroll.courseId.title}
                  </Button>
                ))}
            </div>

            <div>
              <Calendar
                mode="range"
                defaultMonth={date[0]}
                selected={date}
                numberOfMonths={2}
              />
            </div>
          </div>
        </div>
      </ProfileLayout>
    </>
  );
}
export async function getServerSideProps(context) {
  return checkLogin(context);
}

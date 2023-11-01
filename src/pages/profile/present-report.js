import ProfileLayout from "@/src/components/ProfileLayout";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import { useUserEnrolls } from "@/src/hook/useUserEnrolls";
import { fetcher } from "@/src/lib/utils";
import { checkLogin } from "@/src/middleware/clientAuth";
import { format, max, min } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function PresentReport() {
  const router = useRouter();
  const [enrollId, setEnrollId] = useState("");
  const [present, setPresent] = useState([]);
  const [absent, setAbsent] = useState([]);
  const [leave, setLeave] = useState([]);
  const [url, setUrl] = useState(null);
  const { enrolls, isLoading } = useUserEnrolls();
  const enrollBatches = enrolls?.filter((enroll) => enroll.batchId);

  const { data: attendancesData, isLoading: isLoading2 } = useSWR(url, fetcher);
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

  useEffect(() => {
    setPresent([]);
    setAbsent([]);
    setLeave([]);
    attendances?.map((attendance) => {
      if (attendance.status === "Present")
        setPresent((prev) => [...prev, new Date(attendance.date)]);
      if (attendance.status === "Absent")
        setAbsent((prev) => [...prev, new Date(attendance.date)]);
      if (attendance.status === "Leave")
        setLeave((prev) => [...prev, new Date(attendance.date)]);
    });
  }, [attendances]);

  const allDates = [...present, ...absent, ...leave];
  const fromMonth = min(allDates);
  const toMonth = max(allDates);

  return (
    <>
      <ProfileLayout>
        <div>
          <h1 className="text-xl font-medium mb-3">উপস্থিতি রিপোর্ট</h1>
          <div className="flex lg:flex-row flex-col gap-4">
            <div className="w-72 flex flex-col gap-1">
              {enrollBatches?.length > 0 &&
                enrollBatches.map((enroll) => (
                  <Button
                    key={enroll._id}
                    variant={`${
                      enroll._id === enrollId ? "secondary" : "ghost"
                    }`}
                    onClick={() => handleAttendances(enroll._id)}
                    className="w-full"
                  >
                    {enroll.batchId.code} - {enroll.courseId.title}
                  </Button>
                ))}
            </div>

            <div className="space-y-3">
              <div className="flex gap-4">
                <p className="flex items-center gap-2">
                  <span className="block h-3 w-3 bg-green-400 rounded-full"></span>{" "}
                  উপস্থিত
                </p>
                <p className="flex items-center gap-2">
                  <span className="block h-3 w-3 bg-red-400 rounded-full"></span>{" "}
                  অনুপস্থিত
                </p>
                <p className="flex items-center gap-2">
                  <span className="block h-3 w-3 bg-yellow-400 rounded-full"></span>{" "}
                  ছুটি
                </p>
              </div>
              <Calendar
                mode="multiple"
                fromMonth={fromMonth}
                toMonth={toMonth}
                numberOfMonths={2}
                modifiers={{
                  present,
                  absent,
                  leave,
                }}
                modifiersStyles={{
                  present: {
                    backgroundColor: "rgba(74, 222, 128, 1)",
                    color: "black",
                  },
                  absent: {
                    backgroundColor: "rgba(248, 113, 113, 1)",
                    color: "black",
                  },
                  leave: {
                    backgroundColor: "rgba(250, 204, 21, 1)",
                    color: "black",
                  },
                }}
                className="p-0"
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

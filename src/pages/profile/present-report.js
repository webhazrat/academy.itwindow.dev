import ProfileLayout from "@/src/components/ProfileLayout";
import { Calendar } from "@/src/components/ui/calendar";
import { checkLogin } from "@/src/middleware/clientAuth";
import React from "react";

export default function PresentReport() {
  const [date, setDate] = React.useState([
    new Date(2022, 9, 20),
    new Date(2022, 9, 21),
    new Date(2022, 10, 23),
  ]);
  return (
    <>
      <ProfileLayout>
        <div>
          <h1 className="text-xl font-medium mb-3">উপস্থিতি রিপোর্ট</h1>
          <div>
            <Calendar
              mode="range"
              defaultMonth={date[0]}
              selected={date}
              numberOfMonths={2}
            />
          </div>
        </div>
      </ProfileLayout>
    </>
  );
}
export async function getServerSideProps(context) {
  return checkLogin(context);
}

"use client";
import { Badge } from "@/components/uiKit/badge";
import { api } from "@/utils/api";

const Home = () => {
  const { data: statusData } = api.status.status.useQuery();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Badge>{statusData?.status}</Badge>
      </div>
    </main>
  );
};

export default Home;

"use client";
import { Badge } from "@repo/ui-kit/badge";
import { api } from "@repo/api/client";

const Home = () => {
  const { data: statusData } = api.status.statusQuery.useQuery();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Badge>{statusData?.database}</Badge>
      </div>
    </main>
  );
};

export default Home;

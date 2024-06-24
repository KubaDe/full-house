"use client";
import { Button } from "@/components/uiKit/button";
import { api } from "@/utils/api";

const Home = () => {
  const { data: statusData } = api.status.useQuery();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Button>{statusData?.status}</Button>
      </div>
    </main>
  );
};

export default api.withTRPC(Home);

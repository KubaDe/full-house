"use client";
import { ReactNode, useEffect, useState } from "react";
import { api } from "@repo/api/client";
import { useQueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * TRPC binding for next and react-query loads client with the delay.
 * We need to  ensure query client is loaded
 */
export const ReactQueryDevtoolsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showReactQueryDevtools, setShowReactQueryDevtools] = useState(false);
  const queryClient = useQueryClient();
  const { isFetched } = api.status.statusQuery.useQuery();
  useEffect(() => {
    if (isFetched) {
      setShowReactQueryDevtools(true);
    }
  }, [isFetched]);
  return (
    <>
      {showReactQueryDevtools && (
        <ReactQueryDevtools
          client={queryClient}
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      )}
      {children}
    </>
  );
};

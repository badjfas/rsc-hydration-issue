"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Component = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get("page") || "1";

  const { data, isLoading } = useQuery<any>({
    queryKey: ["product", page],
  });

  console.log(data, isLoading);

  return (
    <div className="p-20">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2>currnet page : {page}</h2>

          <p>product title: {data?.title}</p>
        </div>

        <button
          className="flex items-center bg-blue-500 py-2 px-4 rounded-[8px] max-w-[65px]"
          onClick={() => {
            const search = new URLSearchParams(searchParams);

            search.set("page", `${Number(page) + 1}`);

            router.push(`${pathname}?${search.toString()}`);
          }}
        >
          <span className="text-white">next</span>
        </button>
      </div>
    </div>
  );
};

export default Component;

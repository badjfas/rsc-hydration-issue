import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Component from "./component";

async function getProduct(page: string) {
  const result = await fetch(
    "https://dummyjson.com/products/" + page || "1",
  ).then((res) => res.json());

  return result;
}

async function Page({ params, searchParams }: any) {
  const { page = "1" } = searchParams || {};

  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ["product", page],
    queryFn: () => {
      return getProduct(page as any);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <Component />
    </HydrationBoundary>
  );
}

export default Page;

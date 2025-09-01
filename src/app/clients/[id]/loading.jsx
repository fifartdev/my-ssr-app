import { Skeleton } from "@/components/ui/skeleton";

export default function ladingClient() {
  return (
    <div className="max-w-7xl mx-auto mt-8 justify-center">
      <Skeleton className="h-[50px] w-full rounded-xl mt-2" />
      <Skeleton className="h-[50px] w-full rounded-xl mt-2" />
      <Skeleton className="h-[50px] w-full rounded-xl mt-2" />
      <Skeleton className="h-[50px] w-full rounded-xl mt-2" />
      <Skeleton className="h-[70px] w-full rounded-xl mt-2" />
    </div>
  );
}

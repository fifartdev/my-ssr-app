import { Skeleton } from "@/components/ui/skeleton";

export default function loadingNewServiceCategory() {
  return (
    <div className="max-w-md mx-auto mt-8">
      <Skeleton className="h-[50px] w-[300px] rounded-xl mt-2" />
      <Skeleton className="h-[50px] w-[300px] rounded-xl mt-2" />
      <Skeleton className="h-[50px] w-[300px] rounded-xl mt-2" />
    </div>
  );
}

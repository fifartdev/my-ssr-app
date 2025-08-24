import { Skeleton } from "@/components/ui/skeleton";

export default function loadingAccount() {
  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <Skeleton className="h-[50px] w-[300px] rounded-xl mt-2" />
      <Skeleton className="h-[50px] w-[300px] rounded-xl mt-2" />
      <Skeleton className="h-[50px] w-[300px] rounded-xl mt-2" />
      <Skeleton className="h-[50px] w-[300px] rounded-xl mt-2" />
      <Skeleton className="h-[70px] w-[100px] rounded-xl mt-2" />
    </div>
  );
}

import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="h-screen flex justify-center items-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

import { Loader } from "lucide-react";
export default function LoadingState({ message = "Loading..." }: { message?: string }) {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full gap-4">
        <Loader className="animate-spin text-accent w-10 h-10" />
        <p className="text-gray-500 text-lg">{message}</p>
    </div>
    );
}

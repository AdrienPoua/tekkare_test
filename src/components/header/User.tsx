import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Copy, Bitcoin, Globe } from "lucide-react";
import { useState } from "react";

/**
 * User component: Displays user's name, avatar, and a slice of their Bitcoin public key.
 */

export default function User({ name, image, publicKey }: { name: string; image: string; publicKey: { [key: string]: string } }) {
  const { bitcoin } = publicKey;
  const [copied, setCopied] = useState(false);

  // Handle copying the Bitcoin address to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(bitcoin);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg shadow-lg bg-card text-card-foreground hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Avatar className="w-16 h-16 ring-2 ring-accent">
        <AvatarImage src={image} alt={`${name}'s avatar`} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">{name}</h1>
          <Globe className="w-4 h-4 text-accent" />
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Bitcoin className="w-4 h-4 text-yellow-500" />
          <p className="truncate max-w-[200px]">{bitcoin.slice(0, 20)}...</p>
          <button
            onClick={handleCopy}
            className="text-accent flex items-center gap-1 hover:underline focus:outline-none"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

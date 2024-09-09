/**
 * Underline: A decorative line placed under titles or headers, with customizable depth.
 */
export default function Underline({ depth }: Readonly<{ depth: number }>) {
    return (
        <div
            className="relative w-full h-2 mt-2"
            style={{ bottom: `${depth}px` }}
        >
            <div className="w-full h-full bg-gradient-to-r from-accent to-background rounded-full" />
        </div>
    );
}

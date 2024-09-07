export default function Footer() {
  return (
    <footer className="p-4 pt-5 flex justify-center items-center bg-background border-t-2 border-accent relative h-[80px]">
      <div className="relative">
        <div className="text-text font-bold"> CryptoBro © 2024 </div>
        <div className="after:bg-gradient-to-r from-background to-primary after:p-1 after:shadow-xl after:w-full after:rounded-3xl after:filter after:absolute after:bottom-2  inline-block" />
      </div>
    </footer>
  )
}
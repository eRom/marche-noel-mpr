import Image from "next/image";

export default function ImageSection() {
  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-auto">
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/maquette-image.webp"
              alt="Image du Marché de Noël MPR"
              fill
              className="object-cover"
              priority={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAFAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAZEAACAwEAAAAAAAAAAAAAAAAAAQIRMSL/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwCajy82sJqCaukAWD//2Q=="
            />
          </div>
        </div>
      </div>
    </section>
  );
}

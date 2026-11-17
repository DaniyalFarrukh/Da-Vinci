import Image from "next/image";
import { galleryCases } from "@/config/pages";

export function BeforeAfterGrid() {
  return (
    <div className="mx-auto grid max-w-[960px] grid-cols-1 gap-7 md:grid-cols-3">
      {galleryCases.map((item) => (
        <figure key={item.id} className="m-0 grid gap-[2px]">
          <div className="ba-photo aspect-[3/2]" tabIndex={0}>
            <Image
              src={item.image}
              alt={`${item.title} — before`}
              fill
              quality={92}
              sizes="(max-width: 767px) 100vw, 320px"
              className="ba-photo-img object-cover"
            />
            <span className="ba-tag">Before</span>
          </div>
          <div className="ba-photo aspect-[3/2]" tabIndex={0}>
            <Image
              src={item.image}
              alt={`${item.title} — after`}
              fill
              quality={92}
              sizes="(max-width: 767px) 100vw, 320px"
              className="ba-photo-img object-cover"
            />
            <span className="ba-tag">After</span>
          </div>
        </figure>
      ))}
    </div>
  );
}

import Link from "next/link";
import { HiLink } from "react-icons/hi2";

export default function BookmarkLink({ url }: { url: string }) {
    return (
      <li className="text-[#f77b65] text-[1.5em] absolute right-[2em] top-[3px] hover:shadow-[0_0_1px_1px_tomato] ">
        <Link href={`${url}`}>
          <HiLink />
        </Link>
      </li>
    )
  }
import Image from "next/image";
import learnybird from "public/images/Studybird4.svg"

export function Logo() {
    return (
        <Image
        src={learnybird}
        alt="logo"
        width={120}
        height={80} />
    );
}
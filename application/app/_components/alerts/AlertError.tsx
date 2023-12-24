import SvgError from "./alertsSVG/SvgError";
import Alert from "./Alert";

interface AlertErrorProps {
    text: string;
}

export default function AlertError({text}: AlertErrorProps) {
    const mySVG = SvgError();
    return (
        <Alert backgroundColor="bg-rose-500" borderColor="border-rose-700" svgProps={mySVG} textColor="text-white"
               text={text}/>
    )
}
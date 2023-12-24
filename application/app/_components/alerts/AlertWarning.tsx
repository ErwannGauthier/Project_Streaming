import Alert from "./Alert";
import SvgWarning from "./alertsSVG/SvgWarning";

interface AlertWarningProps {
    text: string;
}

export default function AlertWarning({text}: AlertWarningProps) {
    const mySVG = SvgWarning();
    return (
        <Alert backgroundColor="bg-amber-300" borderColor="border-amber-500" svgProps={mySVG} textColor="text-black"
               text={text}/>
    )
}
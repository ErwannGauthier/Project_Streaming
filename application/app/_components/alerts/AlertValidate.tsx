import Alert from "./Alert";
import SvgValidate from "./alertsSVG/SvgValidate";

interface AlertValidateProps {
    text: string;
}

export default function AlertValidate({ text }: AlertValidateProps) {
    const mySVG = SvgValidate();
    return (
        <Alert backgroundColor="bg-emerald-300" borderColor="border-emerald-500" svgProps={mySVG} textColor="text-black" text={text} />
    )
}
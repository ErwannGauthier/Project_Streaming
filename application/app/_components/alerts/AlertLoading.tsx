import SvgLoading from "./alertsSVG/SvgLoading";
import Alert from "./Alert";

interface AlertLoadingProps {
    text: string;
}

export default function AlertLoading({ text }: AlertLoadingProps) {
    const mySVG = SvgLoading();
    return (
        <Alert backgroundColor="bg-slate-300" borderColor="border-slate-500" svgProps={mySVG} textColor="text-black" text={text} />
    )
}
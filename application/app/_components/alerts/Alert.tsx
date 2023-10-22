interface AlertProps {
    backgroundColor: string;
    borderColor: string;
    svgProps: {
        className: string;
        ariaHidden: boolean;
        fill: string;
        viewbox: string;
        pathArray: Array<{
            d: string,
            fill: string,
        }>,
        spanText: string
    };
    textColor: string;
    text: string;
}

export default function Alert({ backgroundColor, borderColor, svgProps, textColor, text }: AlertProps) {
    const style = `w-full flex items-center p-4 mb-4 text-sm rounded-lg ${backgroundColor} ${textColor} border-b-2 border-r-2 ${borderColor}`;
    return (
        <div className={style} role="alert">
            <div role="status">
                <svg className={svgProps["className"]} aria-hidden={svgProps["ariaHidden"]} xmlns="http://www.w3.org/2000/svg" fill={svgProps["fill"]} viewBox={svgProps["viewbox"]}>
                    {svgProps["pathArray"].map((o, index) => (<path key={index} d={o["d"]} fill={o["fill"]} />))}
                </svg>
                <span className="sr-only">{svgProps["spanText"]}</span>
            </div>
            <div className="px-4">
                <p className="text-sm">{text}</p>
            </div>
        </div>
    )
}
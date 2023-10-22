export default function SvgWarning() {
    const mySvg = {
        className: "w-6 h-6 mr-2 text-white",
        ariaHidden: true,
        fill: "currentColor",
        viewbox: "0 0 20 20",
        pathArray: [{
            d: "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z",
            fill: ""
        }],
        spanText: "Warning."
    }

    return mySvg;
}
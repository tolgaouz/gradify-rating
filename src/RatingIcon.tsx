import * as React from "react";

export interface RatingIconProps extends React.SVGProps<SVGSVGElement> {
  fillRate?: number;
  fromColor?: string;
  toColor?: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const RatingIcon = ({
  fillRate = 1,
  icon: Icon,
  fromColor,
  toColor,
  fill,
  ...restProps
}: RatingIconProps) => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const percentage = Number(Math.round(fillRate * 100).toFixed(0));

  const hasFilling = fillRate > 0;
  const hasGradient = fromColor && toColor;
  const id = React.useId();

  React.useEffect(() => {
    if (svgRef.current && hasFilling) {
      const svg = svgRef.current;
      const existingDefs = svg.querySelector("defs");

      if (existingDefs) {
        svg.removeChild(existingDefs);
      }
      const defs = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      );

      const fillRule = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "linearGradient"
      );
      fillRule.setAttribute("id", id);
      fillRule.setAttribute("x1", "0%");
      fillRule.setAttribute("y1", "0%");
      fillRule.setAttribute("x2", "100%");
      fillRule.setAttribute("y2", "0%");
      const stop1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      );
      stop1.setAttribute("offset", `${hasGradient ? "0" : percentage}%`);
      stop1.setAttribute(
        "style",
        `stop-color: ${fromColor ?? "currentColor"}; stop-opacity: 1`
      );
      const stop2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      );
      stop2.setAttribute("offset", `${percentage}%`);
      stop2.setAttribute(
        "style",
        `stop-color: ${toColor ?? fromColor ?? "transparent"}; stop-opacity: 1`
      );
      fillRule.appendChild(stop1);
      fillRule.appendChild(stop2);
      if (fillRate < 1 && fromColor && toColor) {
        const stop3 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        stop3.setAttribute("offset", `${percentage}%`);
        stop3.setAttribute("style", `stop-color: transparent; stop-opacity: 1`);
        fillRule.appendChild(stop3);
      }
      defs.appendChild(fillRule);
      svg.appendChild(defs);
      svg.setAttribute("fill", fill ?? `url(#${id})`);
    }
  }, [percentage, id]);

  return (
    <Icon
      ref={svgRef}
      fill={"transparent"}
      {...restProps}
      {...(hasGradient && {
        stroke: `url(#${id})`,
      })}
    ></Icon>
  );
};
export default RatingIcon;

import React from "react";
import RatingIcon from "./RatingIcon";
import { scale, InterpolationMode } from "chroma-js";

export interface Props extends React.SVGProps<SVGSVGElement> {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /** value of this rating. you can use integer or floats */
  rating: number;
  /** maximum possible rating value. must be an integer */
  maxRating?: number;
  readOnly?: boolean;
  scaling?: {
    /** color to scale from, this color will be used when rating is 0. */
    from: string;
    /** color to scale to, this color will be used when rating equals maxRating. */
    to?: string;
    /** color mode. default is RGB */
    mode?: InterpolationMode;
    /** Gamma-correction can be used to "shift" a scale's center more the the beginning (gamma < 1) or end (gamma > 1), typically used to "even" the lightness gradient. Default is 1. */
    gamma?: number;
    /** assigns a color to each of the icons instead of blending the colors from start to finish */
    stepped?: boolean;
  };
}

export const Rating = ({
  icon: Icon,
  rating,
  maxRating = 5,
  readOnly = true,
  scaling,
  ...restProps
}: Props) => {
  const { from, to } = scaling ?? {};
  const id = React.useId();
  const integer = Math.floor(rating);
  const lastFloatingPoint = Number((rating % 1).toFixed(2));

  const scaleFn = React.useMemo(() => {
    if (from && to) {
      const scl = scale([from, to]);
      if (scaling?.mode) {
        scl.mode(scaling.mode);
      }
      if (scaling?.gamma) {
        scl.gamma(scaling.gamma);
      }
      return scl;
    }
    return null;
  }, [from, maxRating, to]);

  const getColorScalingProps = React.useCallback(
    (fromRate: number, toRate: number) => {
      if (scaling?.stepped) {
        return {
          fill: scaleFn?.colors(maxRating)[fromRate * maxRating],
          stroke: scaleFn?.colors(maxRating)[fromRate * maxRating],
        };
      }
      if (from && to && scaleFn) {
        return {
          fromColor: scaleFn(fromRate).hex(),
          toColor: scaleFn(toRate).hex(),
        };
      }
      return {};
    },
    [from, scaleFn, to]
  );

  if (readOnly) {
    console.log(getColorScalingProps(0, 0.2));
    return (
      <>
        {[...new Array(maxRating)].map((_, index) => (
          <RatingIcon
            key={`rating-icon-${id}-${index}`}
            icon={Icon}
            fillRate={
              integer - index > 0
                ? 1
                : integer - index === 0
                ? lastFloatingPoint
                : 0
            }
            {...restProps}
            {...getColorScalingProps(
              index === 0 ? 0 : index / maxRating,
              (index + 1) / maxRating
            )}
          />
        ))}
      </>
    );
  }

  return null;
};

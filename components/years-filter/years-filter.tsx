import styled from '@emotion/styled';
import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { IRenderThumbParams, IRenderTrackParams } from 'react-range/lib/types';

const YearsFilterStyled = styled.div`
  display: flex;
  width: 225px;
  flex-direction: column;

  .label {
    color: ${(props) => props.theme.colors.gray[300]};
    text-transform: uppercase;
    font-size: ${(props) => props.theme.fonts.size.m}px;
    margin-bottom: ${(props) => props.theme.spacing.lg}px;
  }

  .range-wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;

    .range-content {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      flex: 1;
      align-items: center;
    }

    .range-label {
      color: ${(props) => props.theme.colors.gray[300]};
      margin-right: ${(props) => props.theme.spacing.lg}px;
      font-size: ${(props) => props.theme.fonts.size.m}px;

      &.right {
        margin-right: 0 !important;
        margin-left: ${(props) => props.theme.spacing.lg}px;
      }
    }
  }
`;

const SliderTrack = styled.div`
  width: 100%;
  height: 8px;
  border-radius: ${(props) => props.theme.borderRadius.s}px;
  background-color: ${(props) => props.theme.colors.white};
`;

const SliderToolTip = styled.div`
  position: absolute;
  top: -28px;
  color: ${(props) => props.theme.colors.black};
  font-weight: bold;
  font-size: ${(props) => props.theme.fonts.size.s}px;
  padding: ${(props) => props.theme.spacing.xs}px;
  border-radius: ${(props) => props.theme.borderRadius.s}px;
  background-color: ${(props) => props.theme.colors.white};
`;

const SliderThumb = styled.div<{ isDragged: boolean }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.gray[600]};
  display: flex;
  justify-content: center;
  align-items: center;

  :after {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.gray[1200]};
    display: ${({ isDragged }) => (isDragged ? 'block' : 'none')};
  }

  .slider-tooltip {
    display: ${({ isDragged }) => (isDragged ? 'block' : 'none')};
  }
`;

type SliderTrackFillProps = {
  min: number;
  max: number;
  values: number[];
};

const SliderTrackFill = styled.div<SliderTrackFillProps>`
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius.s}px;
  height: 8px;
  align-self: center;
  background: ${(props) =>
    getTrackBackground({
      values: props.values,
      colors: [props.theme.colors.white, props.theme.colors.gray[500], props.theme.colors.white],
      min: props.min,
      max: props.max,
    })};
`;

type YearsFilterProps = {
  onChange: (values: number[]) => void;
};

export default function YearsFilter({ onChange }: YearsFilterProps): JSX.Element {
  const [values, setValues] = useState<number[]>([1985, 2005]);
  const minMaxValues: [number, number] = [1970, 2015];

  return (
    <YearsFilterStyled data-testid="years-filter">
      <div className="label">Year</div>
      <div className="range-wrapper">
        <div className="range-label">{minMaxValues[0]}</div>
        <div className="range-content">
          <Range
            step={1}
            min={minMaxValues[0]}
            max={minMaxValues[1]}
            values={values}
            onChange={(newValue) => setValues(newValue)}
            allowOverlap={false}
            onFinalChange={(finalValue) => onChange(finalValue)}
            renderTrack={({ props, children }: IRenderTrackParams) => (
              <SliderTrack
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={props.style}>
                <SliderTrackFill
                  ref={props.ref}
                  min={minMaxValues[0]}
                  max={minMaxValues[1]}
                  values={values}>
                  {children}
                </SliderTrackFill>
              </SliderTrack>
            )}
            renderThumb={({ index, props, isDragged }: IRenderThumbParams) => (
              <SliderThumb {...props} style={props.style} isDragged={isDragged}>
                <SliderToolTip className="slider-tooltip">{values[index]}</SliderToolTip>
              </SliderThumb>
            )}
          />
        </div>
        <div className="range-label right">{minMaxValues[1]}</div>
      </div>
    </YearsFilterStyled>
  );
}

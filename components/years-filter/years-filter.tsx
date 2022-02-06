import styled from '@emotion/styled';
import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { IRenderThumbParams, IRenderTrackParams } from 'react-range/lib/types';

import { mq } from '@app/utils/media-query';

const YearsFilterStyled = styled.div`
  display: flex;
  width: calc(100% - ${({ theme }) => theme.spacing.m * 2}px);
  flex-direction: row;
  margin: ${({ theme }) => theme.spacing.m}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;

  ${mq.md} {
    width: 225px;
    flex-direction: column;
  }

  .label {
    color: ${({ theme }) => theme.colors.white};
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fonts.size.s}px;
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
    margin-right: ${({ theme }) => theme.spacing.m}px;
    text-align: left;

    ${mq.md} {
      display: block;
      text-align: left;
      margin-right: 0;
      font-size: ${({ theme }) => theme.fonts.size.m}px;
    }
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
      color: ${({ theme }) => theme.colors.white};
      margin-right: ${({ theme }) => theme.spacing.lg}px;
      font-size: ${({ theme }) => theme.fonts.size.s}px;

      ${mq.md} {
        font-size: ${({ theme }) => theme.fonts.size.m}px;
      }

      &.right {
        margin-right: 0 !important;
        margin-left: ${({ theme }) => theme.spacing.lg}px;
      }
    }
  }
`;

const SliderTrack = styled.div`
  width: 100%;
  height: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.s}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const SliderToolTip = styled.div`
  position: absolute;
  top: -28px;
  color: ${({ theme }) => theme.colors.black};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  padding: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.borderRadius.s}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const SliderThumb = styled.div<{ isDragged: boolean }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray[600]};
  display: flex;
  justify-content: center;
  align-items: center;

  :after {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.gray[1200]};
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
  border-radius: ${({ theme }) => theme.borderRadius.s}px;
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
  className?: string;
  min?: number;
  max?: number;
  defaultValue?: number[];
};

export default function YearsFilter({
  onChange,
  className,
  min = 1970,
  max = 2015,
  defaultValue = [1985, 2005],
}: YearsFilterProps): JSX.Element {
  const [values, setValues] = useState<number[]>(defaultValue);
  const minMaxValues: [number, number] = [min, max];

  return (
    <YearsFilterStyled
      className={['years-filter-comp', className].join(' ')}
      data-testid="years-filter">
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

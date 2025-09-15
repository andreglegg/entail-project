import { useMemo } from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
} from 'recharts';
import type { WeatherPoint } from '../../models/types.ts';
import { formatTime } from '../../lib/format.ts';
import './WaveChart.css';

type Props = { data: WeatherPoint[] };

const DISPLAY = {
    wave_height: 'Wave height (m)',
    wave_period: 'Wave period (s)',
} as const;

export default function WaveChart({ data }: Props) {
    const chartData = useMemo(
        () =>
            data.map((p) => ({
                t: formatTime(p.timestamp),
                wave_height: p.wave_height,
                wave_period: p.wave_period,
            })),
        [data]
    );

    const legendFormatter = (value: string): string =>
        value === 'wave_height'
            ? DISPLAY.wave_height
            : value === 'wave_period'
                ? DISPLAY.wave_period
                : value;

    const tooltipFormatter = (value: number, name: string): [string, string] => {
        if (name === 'wave_height') return [`${value.toFixed(2)}`, DISPLAY.wave_height];
        if (name === 'wave_period') return [`${value.toFixed(1)}`, DISPLAY.wave_period];
        return [String(value), name];
    };

    return (
        <div className="wave-chart">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="t" />
                    <YAxis
                        yAxisId="left"
                        label={{ value: DISPLAY.wave_height, angle: -90, position: 'insideLeft' }}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        label={{ value: DISPLAY.wave_period, angle: 90, position: 'insideRight' }}
                    />
                    <Tooltip formatter={tooltipFormatter} labelFormatter={(label) => String(label)} />
                    <Legend formatter={legendFormatter} />
                    <Line yAxisId="left" type="monotone" dataKey="wave_height" dot={false} />
                    <Line yAxisId="right" type="monotone" dataKey="wave_period" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

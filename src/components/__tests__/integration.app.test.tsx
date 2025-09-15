import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../App';
import { payload2024 } from '../../test/fixtures';
import * as dataClient from '../../lib/dataClient';

describe('App integration', () => {
  it('loads tasks and shows a Go/No-Go status for the first task', async () => {
    const spy = vi.spyOn(dataClient, 'fetchWeatherForecast');
    spy.mockResolvedValue(payload2024);

    render(<App />);

    expect(await screen.findByText('Timeline')).toBeInTheDocument();
    expect(await screen.findByText('Selected Task')).toBeInTheDocument();

    const status = await screen.findByText(/GO|NO-GO/);
    expect(status).toBeInTheDocument();

    spy.mockRestore();
  });
});

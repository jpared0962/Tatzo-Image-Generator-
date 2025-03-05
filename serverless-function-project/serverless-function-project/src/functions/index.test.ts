import { GET } from './index';
import { NextResponse } from 'next/server';

jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn((data) => ({ json: () => data })),
    },
}));

test('GET function returns { ok: true }', async () => {
    const response = await GET();
    const json = await response.json();
    expect(json).toEqual({ ok: true });
});
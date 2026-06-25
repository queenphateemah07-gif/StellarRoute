import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useWalletBalance } from './useWalletBalance';

describe('useWalletBalance', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ balances: [] }),
      } as Response),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not hit Horizon when disconnected', () => {
    const { result } = renderHook(() =>
      useWalletBalance({
        address: 'G123',
        asset: 'native',
        isConnected: false,
        network: 'testnet',
      }),
    );

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result.current.balance).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('selects testnet horizon url by default', async () => {
    renderHook(() =>
      useWalletBalance({
        address: 'G123',
        asset: 'native',
        isConnected: true,
        network: null,
      }),
    );

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('horizon-testnet.stellar.org/accounts/G123'),
      expect.any(Object),
    );
  });

  it('selects mainnet horizon url when network is mainnet', async () => {
    renderHook(() =>
      useWalletBalance({
        address: 'G123',
        asset: 'native',
        isConnected: true,
        network: 'mainnet',
      }),
    );

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('horizon.stellar.org/accounts/G123'),
      expect.any(Object),
    );
  });

  it('handles loading state correctly', async () => {
    let resolveFetch!: (value: unknown) => void;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    vi.mocked(global.fetch).mockReturnValueOnce(fetchPromise as Promise<Response>);

    const { result } = renderHook(() =>
      useWalletBalance({
        address: 'G123',
        asset: 'native',
        isConnected: true,
        network: 'testnet',
      }),
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.balance).toBeNull();

    resolveFetch({
      ok: true,
      json: () => Promise.resolve({ balances: [{ asset_type: 'native', balance: '100' }] }),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.balance).toBe('100');
  });

  it('handles success state for native balance', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ balances: [{ asset_type: 'native', balance: '100' }] }),
    } as Response);

    const { result } = renderHook(() =>
      useWalletBalance({
        address: 'G123',
        asset: 'native',
        isConnected: true,
        network: 'testnet',
      }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.balance).toBe('100');
    });
  });

  it('handles 404 account state (error)', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    const { result } = renderHook(() =>
      useWalletBalance({
        address: 'G123',
        asset: 'native',
        isConnected: true,
        network: 'testnet',
      }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe('Unable to load wallet balance.');
    });
  });

  it('aborts fetch on unmount', () => {
    const { unmount } = renderHook(() =>
      useWalletBalance({
        address: 'G123',
        asset: 'native',
        isConnected: true,
        network: 'testnet',
      }),
    );

    const fetchCallArgs = vi.mocked(global.fetch).mock.calls[0];
    expect(fetchCallArgs).toBeDefined();
    
    const fetchOptions = fetchCallArgs[1] as RequestInit;
    const signal = fetchOptions.signal;
    expect(signal).toBeDefined();
    expect(signal?.aborted).toBe(false);

    unmount();

    expect(signal?.aborted).toBe(true);
  });
});

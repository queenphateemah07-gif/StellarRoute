import { render, screen, cleanup } from '@testing-library/react';
import { HeroSection } from './HeroSection';
import { describe, it, expect, vi, afterEach } from 'vitest';

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('HeroSection', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the main heading', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Swap Smarter on Stellar/i)).toBeInTheDocument();
  });

  it('renders the subheading with key features', () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/aggregates liquidity from SDEX and Soroban AMMs/i)
    ).toBeInTheDocument();
  });

  it('renders the primary CTA button with XLM/USDC pair', () => {
    render(<HeroSection />);
    const ctaButton = screen.getByRole('link', {
      name: /Start Trading XLM\/USDC/i,
    });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href');
    
    const href = ctaButton.getAttribute('href');
    expect(href).toContain('/swap');
    expect(href).toContain('from=native');
    expect(href).toContain('to=USDC');
    expect(href).toContain('amount=100');
  });

  it('renders the secondary CTA button', () => {
    render(<HeroSection />);
    const exploreButton = screen.getByRole('link', {
      name: /Explore All Pairs/i,
    });
    expect(exploreButton).toBeInTheDocument();
    expect(exploreButton).toHaveAttribute('href', '/swap');
  });

  it('renders feature pills', () => {
    render(<HeroSection />);
    expect(screen.getAllByText('Best Rates')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Instant Execution')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Secure & Audited')[0]).toBeInTheDocument();
  });

  it('renders the badge with best execution message', () => {
    render(<HeroSection />);
    expect(
      screen.getAllByText(/Best Execution Across All Stellar DEXs/i)[0]
    ).toBeInTheDocument();
  });

  it('has proper accessibility structure', () => {
    render(<HeroSection />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings[0]).toBeInTheDocument();
  });
});

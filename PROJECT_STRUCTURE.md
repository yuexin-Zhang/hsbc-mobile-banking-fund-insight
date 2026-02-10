# Project Structure Documentation

## Overview
This document describes the refactored project structure with React Router implementation and page-based organization.

## New Directory Structure

```
hsbc-mobile-banking-fund-insight/
├── pages/                          # Page-level components (Route components)
│   ├── Home/                       # Wealth Overview page (/home)
│   │   ├── index.tsx               # Main Home page component
│   │   ├── AIPortfolioReview.tsx  # AI Portfolio Review section
│   │   ├── HoldingsOverviewSection.tsx  # Holdings overview
│   │   └── InsightsSection.tsx    # Insights articles section
│   ├── Portfolio/                  # AI Portfolio Review page (/portfolio)
│   │   └── index.tsx               # Portfolio overview with deep dive
│   └── Fund/                       # Fund Holding Analysis page (/fund)
│       └── index.tsx               # Fund analysis with tabs
│
├── components/                     # Reusable components
│   ├── layout/                     # Layout components
│   │   └── PageLayout.tsx          # Common page layout wrapper
│   ├── shared/                     # Shared/common components
│   │   ├── StatusBar.tsx           # Mobile status bar
│   │   ├── NavigationTabs.tsx     # Top navigation tabs
│   │   ├── MarketValueSection.tsx # Market value display
│   │   └── ActionButtons.tsx      # Action buttons grid
│   ├── charts/                     # Chart components
│   ├── overview/                   # Overview-related components
│   ├── tabs/                       # Tab components for Fund page
│   ├── AIAssistant.tsx            # AI chatbot
│   ├── FloatingAIButton.tsx       # Floating AI button
│   ├── RiskProfileQuestionnaire.tsx # Risk profile form
│   └── ... (other existing components)
│
├── hooks/                          # Custom React hooks
│   └── useMobileDetect.ts
│
├── App.tsx                         # Main app with React Router
└── index.tsx                       # Entry point
```

## Routes

The application uses React Router with the following routes:

- **`/home`** - Wealth Overview page
  - Displays total market value, unrealized/realized gains
  - AI Portfolio Review section with expand/collapse
  - Action buttons grid
  - Overview/Insights tabs with holdings and articles

- **`/portfolio`** - AI Portfolio Review (Deep Dive)
  - Detailed portfolio analysis
  - AI insights carousel
  - Holdings performance chart
  - Analysis tabs (Stock, Unit Trust, etc.)

- **`/fund`** - Fund Holding Analysis
  - Fund performance analysis
  - AI/Manual mode toggle
  - Detailed tabs (Performance, Style, Manager, Classes, Concentration)

- **`/`** - Redirects to `/home`

## Key Components

### Page Components

#### Home Page (`pages/Home/index.tsx`)
Main wealth overview page with:
- Market value section
- AI Portfolio Review with expand/collapse
- Action buttons
- Overview/Insights tabs
- AI Assistant integration

#### Portfolio Page (`pages/Portfolio/index.tsx`)
Detailed portfolio analysis with:
- Deep dive AI insights carousel
- Holdings performance charts
- Stock/Bond/Product analysis sections
- Navigation back to home or to fund analysis

#### Fund Page (`pages/Fund/index.tsx`)
Fund analysis page with:
- AI/Manual mode toggle
- Performance metrics
- Multiple analysis tabs
- Scrollable tab navigation

### Layout Components

#### PageLayout (`components/layout/PageLayout.tsx`)
Common layout wrapper that provides:
- Status bar (hidden on mobile)
- Navigation tabs
- Consistent page structure

### Shared Components

#### StatusBar (`components/shared/StatusBar.tsx`)
- Displays current time
- Shows signal, wifi, and battery icons
- Hidden on actual mobile devices

#### NavigationTabs (`components/shared/NavigationTabs.tsx`)
- Top navigation bar with tabs
- Home icon, Pay, Cards, Wealth, Insurance, Menu
- Uses React Router for navigation

## Navigation Flow

```
/home (Wealth Overview)
  ├─> View details → /portfolio (AI Portfolio Review)
  │                    ├─> View Unit Trusts → /fund
  │                    └─> CIO House View → /home (scroll to Insights)
  └─> CIO House View → scroll to Insights tab
```

## Component Breakdown Strategy

The refactoring follows these principles:

1. **Page-based organization**: Each route has its own page directory
2. **Component modularity**: Large components broken into smaller, focused pieces
3. **Shared components**: Common elements extracted to `components/shared/`
4. **Layout reuse**: Common layout patterns in `components/layout/`
5. **Clear navigation**: React Router replaces callback-based navigation

## Migration Notes

### Old Structure vs New Structure

**Before:**
- All components in flat `components/` directory
- Navigation via state management and callbacks
- Large monolithic components (WealthOverview: 886 lines, PortfolioOverviewPage: 1346 lines)

**After:**
- Pages organized in `pages/` directory
- Navigation via React Router
- Smaller, modular components (<200 lines each)
- Shared components extracted to `components/shared/`
- Layout components in `components/layout/`

### Breaking Down Large Components

**WealthOverview (886 lines) → Home Page**
- `pages/Home/index.tsx` (100 lines) - Main page logic
- `pages/Home/AIPortfolioReview.tsx` (312 lines) - AI review section
- `pages/Home/HoldingsOverviewSection.tsx` (140 lines) - Holdings
- `pages/Home/InsightsSection.tsx` (96 lines) - Insights articles
- `components/shared/MarketValueSection.tsx` (57 lines) - Market value
- `components/shared/ActionButtons.tsx` (40 lines) - Action buttons

**PortfolioOverviewPage (1346 lines) → Portfolio Page**
- `pages/Portfolio/index.tsx` - All-in-one for now (can be further split)

**FundInsightOverview (636 lines) → Fund Page**
- `pages/Fund/index.tsx` - All-in-one with existing tab components

## Best Practices

1. **Keep components focused**: Each component should have a single responsibility
2. **Use React Router**: Navigate with `useNavigate()` hook instead of callbacks
3. **Share common code**: Extract reusable components to `components/shared/`
4. **Consistent layout**: Use `PageLayout` for consistent page structure
5. **TypeScript**: All components properly typed with interfaces

## Future Improvements

1. Further break down Portfolio and Fund pages into smaller components
2. Add route-based code splitting for better performance
3. Implement error boundaries for each route
4. Add loading states during route transitions
5. Consider adding route guards/authentication if needed

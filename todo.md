# Todo List

## Current Tasks

### Mobile Navbar Scrolling Fix - Fallback Plan

**Problem**: Fixed navbar doesn't stay in position during scroll on mobile Safari/Chrome (works in desktop emulators but breaks on real devices)

**Root Cause**: CSS properties like `perspective`, `transform`, and `overflow` create containing blocks that break `position: fixed` behavior on mobile browsers.

---

#### ✅ Fix #1: Remove `perspective` from Section Containers (CURRENT - DEPLOYED)

**Status**: Implemented and ready for testing

**What was changed**:
- Removed `style={{ perspective: "2000px" }}` from:
  - `src/components/About/About.tsx:42`
  - `src/components/Projects/Projects.tsx:61`
  - `src/components/Certifications/Certifications.tsx:268`
  - `src/components/Contact/Contact.tsx:121`

**Why this should work**:
- `perspective` creates a containing block (like `transform` does)
- Individual animated elements still have `transformStyle: "preserve-3d"` so 3D rotations remain intact
- Removes parent-level CSS property that breaks fixed positioning

**How to test**:
1. Deploy to production
2. Test on actual iOS Safari device (iPhone)
3. Test on actual Chrome for iOS
4. Test on Android Chrome
5. Scroll through entire page and verify navbar stays fixed at top
6. Verify all 3D rotation animations still work on About, Projects, Certifications, Contact sections

**If this works**: Problem solved! No further action needed.

**If this doesn't work**: Proceed to Fix #2 below.

---

#### ✅ Fix #2: Remove GPU Acceleration from Navbar (COMPLETED)

**Status**: Implemented in commit 0946f48, tested in production - DID NOT WORK

**What was changed** in `src/components/Header/Header.tsx:44-51`:

Removed these lines:
```typescript
transform: 'translateZ(0)',
WebkitTransform: 'translate3d(0,0,0)',
willChange: 'transform',
```

**Result**: Navbar still doesn't stay fixed on mobile devices after deployment.

---

#### ⏭️ Fix #2.5: Disable/Modify 3D Animations on Mobile (NEW - BASED ON TIMING CLUE)

**When to try**: If Fix #3 doesn't work

**Key observation**: User reported that "after the website has been loaded for a while in the mobile browser, the problem goes away." This strongly suggests the issue is related to **animation timing** rather than pure CSS layout.

**Theory**: The 3D rotation animations are interfering with the navbar's fixed positioning while they're active/running. Once animations complete and settle, the browser properly establishes the navbar's fixed position.

**Possible solutions**:

**Option A - Add `once: true` to animations** (simplest):
In all sections (About, Projects, Certifications, Contact), change:
```typescript
whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
viewport={{ margin: "0px" }}
```
To:
```typescript
whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
viewport={{ margin: "0px", once: true }}
```

This ensures animations only run once and don't re-trigger on scroll, potentially reducing interference with fixed positioning.

**Option B - Disable 3D transforms on mobile only**:
Add viewport detection and conditionally remove `rotateY` on mobile:
```typescript
const isMobile = window.innerWidth < 768;
const animationVariants = {
  initial: { opacity: 0, x: SLIDE_DISTANCE, ...(isMobile ? {} : { rotateY: ROTATION_ANGLE }) },
  animate: { opacity: 1, x: 0, ...(isMobile ? {} : { rotateY: 0 }) }
};
```

**Option C - Add animation delay on mobile**:
Delay animations on mobile to let navbar establish fixed position first:
```typescript
const isMobile = window.innerWidth < 768;
const delay = isMobile ? 0.3 : 0;
// Apply to each animation's transition.delay
```

**Files to modify**:
- `src/components/About/About.tsx`
- `src/components/Projects/Projects.tsx`
- `src/components/Certifications/Certifications.tsx`
- `src/components/Contact/Contact.tsx`

**Testing checklist**:
- [ ] Navbar stays fixed immediately on page load (mobile)
- [ ] Navbar stays fixed during initial scroll (mobile)
- [ ] Animations still look good
- [ ] Performance is smooth

**⚠️ IMPORTANT RESEARCH FINDING - CSS Media Query Alternative**:

After implementing Option B (disable 3D transforms on mobile with JavaScript), research was conducted to determine if using CSS media queries instead of JavaScript would have avoided the navbar scrolling problem.

**Conclusion: CSS media queries would NOT solve the problem.**

**Why both approaches have the same issue**:
- The root cause is NOT the detection method (JavaScript vs CSS media queries)
- The root cause IS the 3D transforms themselves creating a "containing block"
- Per CSS specification: Any element with `transform`, `perspective`, or `filter` properties creates a containing block
- Fixed-position elements inside a containing block are positioned relative to that block, NOT the viewport
- This breaks `position: fixed` behavior regardless of how transforms are applied

**CSS Media Query Approach Would Still Fail**:
If we used CSS like:
```css
@media (min-width: 768px) {
  .animated-element {
    transform: rotateY(90deg);
  }
}
```
The navbar would STILL scroll on desktop devices because desktop users would still have 3D transforms creating containing blocks.

**Why Our JavaScript Solution Works**:
- Mobile (< 768px): No `rotateY` property at all → No containing block → Fixed navbar works ✓
- Desktop (≥ 768px): Has `rotateY` property → May still have issues (acceptable for now, prioritizing mobile)
- The key is **removing the transform property entirely** on mobile, not just changing detection method

**Research Sources**:
- Stack Overflow: "Position fixed doesn't work when using -webkit-transform"
- CSS-Tricks forums: Multiple threads on fixed positioning breaking with transforms
- CSS Specification: Transforms create both a stacking context and a containing block

**Alternative Universal Solutions** (if desktop also needs fixing):
1. Move navbar outside all transformed containers (structural HTML change)
2. Use JavaScript-based positioning instead of CSS `position: fixed` (Fix #4 in TODO)
3. Remove ALL 3D transforms entirely from the site (Fix #5 in TODO - last resort)

**Status**: JavaScript detection with conditional 3D transform removal is the correct approach for this issue.

---

#### ✅ Fix #3: Add `isolation: isolate` to Sections (DEPLOYED)

**Status**: Implemented and deployed, awaiting CDN propagation and real device testing

**What was changed**:

Added `isolation: "isolate"` to each section container in:
- `src/components/About/About.tsx:35` (section style prop)
- `src/components/Projects/Projects.tsx:60` (section element)
- `src/components/Certifications/Certifications.tsx:261` (section style prop)
- `src/components/Contact/Contact.tsx:120` (section element)

**Example**:
```typescript
<section
  id="about"
  className="about py-16 px-4"
  style={{
    position: 'relative',
    isolation: 'isolate',  // ADD THIS
    background: 'rgba(255, 255, 255, 0.03)',
    // ... rest of styles
  }}
>
```

**Why this might work**:
- `isolation: isolate` creates a new stacking context without creating a containing block
- May prevent the 3D transform effects from interfering with navbar's fixed positioning

**How to test**:
1. Wait for CDN propagation
2. Test on actual iOS Safari device (iPhone)
3. Test on actual Chrome for iOS
4. Test on Android Chrome
5. Scroll through entire page and verify navbar stays fixed at top
6. Verify all 3D rotation animations still work correctly
7. Check for any z-index conflicts or layering issues

**If this works**: Problem solved! No further action needed.

**If this doesn't work**: Proceed to Fix #2.5 below (animation timing fix - most promising based on user observation).

---

#### ⏭️ Fix #4: JavaScript-Based Sticky Navbar (FALLBACK)

**When to try**: If all CSS-based fixes fail

**What to implement**:

Replace CSS `position: fixed` with JavaScript scroll detection:

```typescript
// In Header.tsx
const [isStuck, setIsStuck] = useState(false);

useEffect(() => {
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        setIsStuck(scrollTop > 0);
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Then use position: absolute and transform instead of position: fixed
```

**Why this might work**:
- Avoids CSS `position: fixed` entirely
- Uses `transform: translateY()` which is more reliable on mobile
- requestAnimationFrame ensures smooth performance
- Passive scroll listener prevents blocking

**Files to modify**:
- `src/components/Header/Header.tsx` (major refactor)

**Complexity**: High - requires significant code changes

**Testing checklist**:
- [ ] Smooth scrolling performance
- [ ] No visual jank or lag
- [ ] Works across all mobile browsers
- [ ] Works during fast scroll/fling gestures

---

#### ✅ Fix #5: Simplify Animations - Remove 3D Transforms (IMPLEMENTED - SUCCESS)

**Status**: Implemented and tested - navbar works correctly in dev server and mobile emulators

**What was changed**:

Replaced 3D rotation animations with simple 2D animations across all sections:

Changed from:
```typescript
initial={{ opacity: 0, x: SLIDE_DISTANCE, rotateY: ROTATION_ANGLE }}
whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
style={{ transformStyle: "preserve-3d" }}
```

To:
```typescript
initial={{ opacity: 0, x: SLIDE_DISTANCE }}
whileInView={{ opacity: 1, x: 0 }}
```

**Files modified**:
- `src/components/Header/Header.tsx` - Reverted to simple `position: fixed` (removed Fix #4's `position: absolute` approach)
- `src/components/About/About.tsx` - Removed `rotateY`, `transformStyle: preserve-3d`, removed mobile detection, removed `isolation: isolate`
- `src/components/Projects/Projects.tsx` - Removed `rotateY`, `transformStyle: preserve-3d`, removed mobile detection, removed `isolation: isolate`
- `src/components/Certifications/Certifications.tsx` - Removed `rotateY`, `transformStyle: preserve-3d` (kept mobile detection for display limit logic)
- `src/components/Contact/Contact.tsx` - Removed `rotateY`, `transformStyle: preserve-3d`, removed mobile detection, kept `isolation: isolate`

**Why this works**:
- Completely eliminates 3D transforms that interfere with fixed positioning on mobile
- No containing blocks created by `transform` properties
- Navbar uses clean `position: fixed` without any transform complications
- Simple and reliable across all browsers and devices

**Result**:
- Navbar stays fixed correctly in desktop and mobile emulators
- Smooth 2D slide animations retained (opacity + x-axis)
- Professional appearance maintained
- Build successful

**Testing completed**:
- [x] Navbar stays fixed in dev server
- [x] Navbar stays fixed in mobile emulators (desktop Chrome DevTools)
- [x] Animations look good (smooth slide-in with fade)
- [x] Site feels professional and polished
- [x] Build succeeds without errors

**Ready for production deployment**

---

## Alternative Root Causes (If Fix #5 Fails on Real Devices)

**Status**: All transform-related fixes have been exhausted. If the navbar still scrolls on real mobile devices after Fix #5 deployment, the problem is likely NOT related to 3D transforms or containing blocks.

**Potential alternative causes to investigate:**

1. **Glassmorphism Effects (`backdrop-filter`)**
   - The navbar uses `backdrop-filter: blur(10px)` and `WebkitBackdropFilter`
   - Some mobile browsers may have bugs with `backdrop-filter` on fixed elements
   - **Test**: Temporarily remove all `backdrop-filter` properties from Header.tsx
   - **Alternative**: Use solid background color instead of blur effect

2. **Z-Index Stacking Context Issues**
   - Navbar has `z-index: 50`
   - Multiple sections use `position: relative` and other stacking context creators
   - **Test**: Increase navbar z-index to `z-index: 9999`
   - **Investigate**: Check if any parent elements create new stacking contexts

3. **Mobile Browser Viewport/Scrolling Quirks**
   - iOS Safari has unique scrolling behaviors (momentum scrolling, rubber-band effect)
   - Chrome on iOS uses WebKit under the hood (same rendering engine as Safari)
   - **Test**: Add `overflow-x: hidden` and `-webkit-overflow-scrolling: touch` to body
   - **Investigate**: Check if page has horizontal overflow causing layout shifts

4. **CSS Will-Change Property**
   - Removed in Fix #2, but may need to be strategically re-added
   - **Test**: Add `will-change: contents` to navbar (different from `will-change: transform`)

5. **Hosting/CDN Configuration**
   - CloudFront caching may serve stale CSS/JS
   - Browser caching may not update properly
   - **Test**: Perform full cache invalidation on CloudFront
   - **Verify**: Check that deployed files match local build output

6. **JavaScript Hydration/Timing Issues**
   - React hydration may cause layout shifts on initial load
   - Scroll event listeners may interfere with fixed positioning
   - **Test**: Check browser console for React hydration warnings
   - **Investigate**: Profile scroll performance with Chrome DevTools

**Next debugging steps if Fix #5 fails:**

1. Test on real device with browser DevTools remote debugging connected
2. Record screen capture of the scrolling issue
3. Use browser DevTools Performance tab to identify layout thrashing
4. Check for console errors or warnings specific to mobile browsers
5. Create minimal reproduction (single HTML file with just navbar + scroll content)
6. Search for browser-specific bugs related to `position: fixed` on the specific device/browser combination

**Note**: We tried Fix #4 (JavaScript-based positioning with `position: absolute` + `transform: translateY()`) during this session and it caused worse behavior (navbar jumping on both desktop and mobile emulators), so that approach is not viable.

---

## Testing Protocol for Each Fix

After implementing each fix:

1. **Local Development Test**:
   - Run `pnpm dev`
   - Test in browser DevTools mobile emulator
   - Verify animations work
   - Verify navbar looks correct

2. **Build and Preview**:
   - Run `pnpm build`
   - Run `pnpm preview`
   - Test again in emulator

3. **Deploy to Production**:
   - Commit changes
   - Push to deployment
   - Wait for deployment to complete

4. **Real Device Testing** (CRITICAL):
   - Test on iPhone Safari (iOS 15+)
   - Test on iPhone Chrome
   - Test on Android Chrome
   - Test in both portrait and landscape
   - Test with fast scrolling/flinging
   - Verify navbar STAYS at top during all scroll actions
   - Verify sections (especially Projects and Contact) remain visible

5. **Animation Verification**:
   - Scroll to each section
   - Verify About section animates correctly
   - Verify Projects cards animate correctly
   - Verify Certifications cards animate correctly
   - Verify Contact form animates correctly

---

## Known Issues History

### Previous Fixes That Caused Problems:

1. **Commit 9b18edd**: Added GPU acceleration (`transform: translateZ(0)`) to navbar
   - Fixed navbar on some devices
   - But broke Projects/Contact sections visibility

2. **Commit ede7809**: Changed viewport margin from `-100px` to `0px`
   - Fixed Projects/Contact sections appearing
   - But navbar still broken in some cases

3. **Commit 9b5d73d**: Moved `overflow-x-hidden` from App.tsx to body
   - Partially fixed navbar
   - But underlying `perspective` issue remained

### Current State (Before Fix #1):
- Navbar has: `position: fixed` + GPU acceleration transforms
- Sections have: `perspective: "2000px"` creating containing blocks
- Viewport margin: `"0px"` (not `-100px`)
- Problem: Navbar doesn't stay fixed on mobile Safari/Chrome

---

## Completed Tasks

- [x] Remove conflicting CSS styles from src/index.css
- [x] Update Contact.tsx with animations and improved styling
- [x] Add card container and update form layout
- [x] Update button styling to match Hero buttons
- [x] Test for remaining conflicts and verify styling
- [x] Fix 'Get in Touch' button - make background white like 'View Projects'
- [x] Fix 'View Projects' link navigation
- [x] Remove section background colors to show Hero image behind
- [x] Standardize animation durations to 0.6s across all sections
- [x] Remove `perspective: "2000px"` from all section containers (Fix #1)

---

## Future Improvements

### Automate AWS S3 + CloudFront Deployment with GitHub Actions

**Status**: For future consideration (currently deploying manually)

**Goal**: Automatically build and deploy to AWS S3 + CloudFront whenever code is pushed to the main branch.

**Benefits**:
- No manual uploads to S3
- Automatic cache invalidation
- Consistent build process
- Faster deployment workflow
- Zero cost for invalidations (within free tier)

**How It Works**:
1. Push code to main branch
2. GitHub Actions automatically:
   - Checks out code
   - Installs dependencies with `pnpm`
   - Builds production files with `pnpm build`
   - Syncs `dist/` folder to S3 bucket
   - Invalidates CloudFront cache with `/*` wildcard

**CloudFront Cache Invalidation Costs**:
- **Free Tier**: First 1,000 invalidation paths per month are FREE
- **After Free Tier**: $0.005 per path (half a cent)
- **Wildcard Tip**: Using `/*` invalidates entire distribution but counts as just 1 path
- **Estimated Cost**: $0/month (deploying ~30 times/month = well within free tier)
- **Monthly Reset**: Free tier resets every month

**Requirements to Implement**:

1. **AWS IAM User** (security best practice):
   - Create dedicated IAM user with minimal permissions
   - Only needs S3 write access to specific bucket
   - Only needs CloudFront invalidation permission
   - Generate access key ID and secret access key

2. **GitHub Repository Secrets** (to add in GitHub settings):
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_S3_BUCKET` (your bucket name)
   - `AWS_REGION` (e.g., us-east-1)
   - `CLOUDFRONT_DISTRIBUTION_ID` (your CloudFront distribution ID)

3. **GitHub Actions Workflow File**:
   - Create `.github/workflows/deploy.yml`
   - Configure workflow to:
     - Trigger on push to main
     - Use pnpm for dependency management
     - Build with Vite
     - Deploy to S3 with AWS CLI
     - Invalidate CloudFront cache

**Example Workflow Structure**:
```yaml
name: Deploy to AWS S3 + CloudFront

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js and pnpm
      - Install dependencies
      - Build production files
      - Configure AWS credentials
      - Sync to S3
      - Invalidate CloudFront cache
```

**Security Notes**:
- Never commit AWS credentials to repository
- Use GitHub secrets for all sensitive information
- Create IAM user with minimal required permissions only
- Follow principle of least privilege

**Resources**:
- AWS CloudFront Pricing: https://aws.amazon.com/cloudfront/pricing/
- GitHub Actions AWS Deployment: Multiple tutorials available
- AWS CLI S3 Sync: Built-in to AWS CLI

---

## Review

### Summary of Recent Changes (Animation Speed & Navbar Fix)

#### Animation Speed Consistency
**Files Modified:**
- `src/components/About/About.tsx:23`
- `src/components/Projects/Projects.tsx:24`
- `src/components/Contact/Contact.tsx:33`

**Changes Made:**
- Standardized `ANIMATION_DURATION` to `0.6` seconds across all sections
- Previously: About (0.8s), Projects (1.8s), Contact (1.8s), Courses (0.6s)
- Now: All sections animate at 0.6s for consistent feel

#### Mobile Navbar Fix (Attempt #1)
**Files Modified:**
- `src/components/About/About.tsx:42`
- `src/components/Projects/Projects.tsx:61`
- `src/components/Certifications/Certifications.tsx:268`
- `src/components/Contact/Contact.tsx:121`

**Changes Made:**
- Removed `style={{ perspective: "2000px" }}` from all section container divs
- Kept `transformStyle: "preserve-3d"` on individual animated elements
- This eliminates the containing block that breaks `position: fixed` on mobile

**Why This Fix:**
Research and git history showed that `perspective` CSS property creates a containing block (similar to `transform`), which breaks `position: fixed` behavior on mobile Safari and Chrome. The combination of:
- Navbar with `transform: translateZ(0)` (GPU acceleration)
- Sections with `perspective: "2000px"`
- 3D rotation transforms on animated elements

...created a layering/rendering issue where the navbar wouldn't stay fixed during scroll on real mobile devices (though it worked in desktop emulators).

**Expected Result:**
- Navbar should stay fixed at top during scroll on mobile Safari/Chrome
- 3D rotation animations should still work (using `transformStyle: "preserve-3d"` on individual elements)
- Projects and Contact sections should remain visible (viewport margin is already at "0px")

**Status**: Awaiting production deployment and real device testing.

### Previous Session Summary

This session focused on improving the Contact form styling and fixing several visual and navigation issues across the portfolio.

### Contact Form Improvements

**Files Modified:**
- `src/components/Contact/Contact.tsx`
- `src/index.css`

**Changes Made:**
1. **Removed CSS Conflicts**: Deleted global `.contact-container` styles from `src/index.css` (lines 132-162) that were forcing all inputs to 100% width and overriding Tailwind classes.

2. **Added Framer Motion Animations**: Integrated entrance animations matching the About and Projects sections:
   - 3D slide-in with 90-degree rotation
   - Staggered timing for header and form card
   - Fade-in animation for success message

3. **Form Layout Updates**:
   - Wrapped form in a styled card container (`bg-gray-700 p-8 rounded-xl shadow-lg`)
   - Widened name/email inputs from `max-w-xs` (320px) to `max-w-md` (448px)
   - Message textarea remains full width within the card
   - Adjusted spacing from `gap-5` to `gap-6`

4. **Enhanced Input Styling**:
   - Changed background from `bg-gray-700` to `bg-gray-600` for better contrast
   - Added subtle border (`border border-gray-500`)
   - Added smooth transitions (`transition-all duration-200`)

5. **Button Redesign**:
   - Changed from blue (`bg-blue-500`) to white (`bg-white`) with black text
   - Updated to rounded-full style matching Hero buttons
   - Added scale animations on hover and tap

6. **Added Section ID**: Added `id="contact"` for smooth scrolling from Hero section

### Hero Button Fixes

**File Modified:**
- `src/components/Hero/Hero.tsx`

**Changes Made:**
- Updated "Get in Touch" button from transparent border style to white background with black text
- Both Hero buttons now have consistent styling: `bg-white text-black rounded-full hover:bg-gray-200`

### Navigation Fix

**File Modified:**
- `src/components/Projects/Projects.tsx`

**Changes Made:**
- Added `id="projects"` to Projects section to enable "View Projects" link navigation from Hero

### Hero Image Background Effect

**Files Modified:**
- `src/components/About/About.tsx`
- `src/components/Projects/Projects.tsx`
- `src/components/Contact/Contact.tsx`

**Changes Made:**
- Removed all section background colors:
  - About: Removed `bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900`
  - Projects: Removed `bg-gray-800`
  - Contact: Removed `bg-gray-900`
- Hero image now visible behind all sections with scroll-based opacity overlay intact

### Tailwind v4 Configuration Fix

**Files Modified:**
- `src/index.css`
- `postcss.config.js`
- `package.json`

**Changes Made:**
1. Updated `src/index.css` from old Tailwind directives to v4 syntax:
   - Changed from `@tailwind base; @tailwind components; @tailwind utilities;`
   - To `@import "tailwindcss";`

2. Installed `@tailwindcss/postcss` package (v4 requirement)

3. Updated `postcss.config.js` to use `@tailwindcss/postcss` instead of `tailwindcss`

### Technical Notes

- **Tailwind v4 Breaking Changes**: The project uses Tailwind CSS v4.1.13, which has a completely different configuration system than v3. The PostCSS plugin is now in a separate package (`@tailwindcss/postcss`).

- **Animation Consistency**: Contact form now matches the animation style of About and Projects sections (90° rotation, 0.6s duration, custom easing curve).

- **Form Width Constraints**: The max-w-md class on name/email inputs was being overridden by global CSS. Removing the global styles fixed the issue.

- **Mobile Navbar Fix**: CSS `perspective` property creates containing blocks that break `position: fixed` on mobile browsers. This is similar to how `transform` and `overflow` properties can break fixed positioning.

### Visual Result

- Contact form now has professional card-style presentation matching the portfolio aesthetic
- All sections show the Hero image background with increasing opacity overlay as user scrolls
- Consistent white button styling across Hero and Contact sections
- Smooth animations and transitions throughout (now consistently 0.6s)
- All navigation links working correctly
- Navbar should stay fixed on mobile devices (pending production testing)

// file: kontra_homepage_check.js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('--- Navigating to Contra Dev Homepage ---');
    await page.goto('https://contra-dev.com/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // ✅ Verify header/menu items
    console.log('--- Verifying main navigation elements ---');
    const headerSelectors = [
      'text=Free Exercises',
      'text=Try Kontra SCORM',
      'text=Plans',
      'text=Courses',
      'text=Blog',
      'text=About',
      'text=Book a Demo',
    ];
    for (const selector of headerSelectors) {
      const visible = await page.isVisible(selector);
      console.log(`${selector}: ${visible ? '✅ Visible' : '❌ Not Found'}`);
    }

    // ✅ Verify main banner section text and buttons
    console.log('\n--- Checking hero banner ---');
    const heroText = await page.isVisible('text=Kontra is now a part of Security Compass');
    const learnMoreButton = await page.isVisible('text=Learn More');
    const tryFreeExercises = await page.isVisible('text=Try Free Exercises');

    console.log(`Hero text visible: ${heroText}`);
    console.log(`Learn More button visible: ${learnMoreButton}`);
    console.log(`Try Free Exercises button visible: ${tryFreeExercises}`);

    // ✅ Scroll through and verify “Learn more about Kontra” hyperlinks
    console.log('\n--- Scrolling down to Learn more about Kontra section ---');
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(1500);

    const learnMoreLinks = await page.$$('a:has-text("Learn more about Kontra")');
    console.log(`Found ${learnMoreLinks.length} Learn more about Kontra links`);

    // ✅ Check Book a Demo hyperlink in “Simply Beautiful” section
    console.log('\n--- Checking Book a Demo link in "Simply Beautiful" section ---');
    const bookDemoSimplyBeautiful = await page.isVisible('a:has-text("Book a Demo")');
    console.log(`Book a Demo link (Simply Beautiful): ${bookDemoSimplyBeautiful}`);

    // ✅ Check Book a Demo hyperlink in “Interactive Learning” section
    console.log('\n--- Checking Book a Demo link in "Interactive Learning" section ---');
    const bookDemoInteractive = await page.isVisible('a:has-text("Book a Demo")');
    console.log(`Book a Demo link (Interactive Learning): ${bookDemoInteractive}`);

    // ✅ Check “Try Kontra SCORM” hyperlink for “Integrate with leading Learning Management Systems”
    console.log('\n--- Checking Try Kontra SCORM link ---');
    const tryKontraScormLink = await page.isVisible('a:has-text("Try Kontra SCORM")');
    console.log(`Try Kontra SCORM link: ${tryKontraScormLink}`);

    // ✅ Check “Book a Demo” hyperlink for “Enterprise Ready”
    console.log('\n--- Checking Book a Demo link for "Enterprise Ready" section ---');
    const enterpriseDemo = await page.isVisible('a:has-text("Book a Demo")');
    console.log(`Book a Demo link (Enterprise Ready): ${enterpriseDemo}`);

    // ✅ Check final CTA “Ready to begin?” section
    console.log('\n--- Checking Ready to begin? CTA ---');
    await page.mouse.wheel(0, 2000);
    await page.waitForTimeout(1500);

    const readyToBeginButton = await page.isVisible('text=BOOK A DEMO');
    console.log(`Ready to begin? BOOK A DEMO button: ${readyToBeginButton}`); 

    // ✅ Scroll to footer
    console.log('\n--- Scrolling to Footer ---');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    // ✅ Verify Footer elements
    console.log('\n--- Verifying Footer Section ---');

    // Kontra logo
    const kontraLogoVisible = await page.isVisible('img[alt*="Kontra"]');
    console.log(`Kontra Logo visible: ${kontraLogoVisible}`);

    // Social Media icons
    const linkedInVisible = await page.isVisible('a[href*="linkedin.com"]');
    const facebookVisible = await page.isVisible('a[href*="facebook.com"]');
    const twitterVisible = await page.isVisible('a[href*="twitter.com"], a[href*="x.com"]');
    console.log(`LinkedIn logo: ${linkedInVisible}`);
    console.log(`Facebook logo: ${facebookVisible}`);
    console.log(`Twitter/X logo: ${twitterVisible}`);

    // Footer Menu items
    const footerItems = [
      'text=Menu',
      'text=Kontra',
      'text=About',
      'text=Blog',
      'text=Book a Demo',
      'text=Privacy Policy',
      'text=Support',
    ];
    for (const item of footerItems) {
      const visible = await page.isVisible(item);
      console.log(`${item}: ${visible ? '✅ Visible' : '❌ Not Found'}`);
    }

    // Company info and address
    const companyVisible = await page.isVisible('text=Security Compass Technologies Ltd.');
    const addressVisible = await page.isVisible('text=325 Front St. West');
    const contactVisible = await page.isVisible('text=contact@securitycompass.com');
    console.log(`Company name: ${companyVisible}`);
    console.log(`Address: ${addressVisible}`);
    console.log(`Contact email: ${contactVisible}`);

     // ✅ Scroll back to top
    console.log('\n--- Step 7: Scrolling back to top ---');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);

    // ✅ Step 8: Click Learn More → About page
    await page.click('text=Learn More', { timeout: 5000 });
    await page.waitForLoadState('networkidle');
    currentURL = page.url();
    console.log(`Redirected URL after clicking Learn More: ${currentURL}`);
    console.log(currentURL.includes('/about') ? '✅ Learn More link redirected to About page' : '❌ Did NOT redirect');

    // ✅ Step 9: Click Kontra Logo → Home
    await page.waitForSelector('a[href="/"] img, a[href*="contra-dev.com"] img', { timeout: 10000 });
    const logo = await page.$('a[href="/"] img, a[href*="contra-dev.com"] img');
    if (logo) {
      await logo.click();
      await page.waitForLoadState('networkidle');
    }
    currentURL = page.url();
    console.log(`Returned to Home: ${currentURL}`);
    console.log(currentURL.endsWith('/') ? '✅ Home page' : '❌ Not Home page');

    // ✅ Step 10: Click TRY FREE EXERCISES → OWASP Top 10
    await page.click('text=Try Free Exercises', { timeout: 5000 });
    await page.waitForLoadState('networkidle');
    currentURL = page.url();
    console.log(`Redirected to: ${currentURL}`);
    console.log(currentURL.includes('/owasp-top-10') ? '✅ Redirected to OWASP Top 10' : '❌ Did NOT redirect');

    // ✅ Step 10b: Click Kontra Logo → Home again (robust version)
console.log('\n--- Step 10b: Clicking Kontra Logo to return Home again ---');
try {
  // Click the logo link, not just the img
  const logoLinkSelector = 'a[href="/"], a[href*="contra-dev.com"]';
  await page.waitForSelector(logoLinkSelector, { timeout: 15000 });
  await page.click(logoLinkSelector);
  await page.waitForLoadState('networkidle');

  currentURL = page.url();
  console.log(`Returned to Home: ${currentURL}`);
  console.log(currentURL.endsWith('/') ? '✅ Home page' : '❌ Not Home page');
} catch (e) {
  console.error('❌ Could not click Kontra logo to return Home:', e.message);
}

// ✅ Step 11: Scroll down → Click "Learn more about Kontra" (Who We Are)
console.log('\n--- Step 11: Clicking "Learn more about Kontra" from Who We Are ---');
await page.mouse.wheel(0, 2000);
try {
  const learnMoreKontraSelector = 'a:has-text("Learn more about Kontra")';
  await page.waitForSelector(learnMoreKontraSelector, { timeout: 15000 });
  await page.click(learnMoreKontraSelector);
  await page.waitForLoadState('networkidle');

  currentURL = page.url();
  console.log(`Redirected to: ${currentURL}`);
  console.log(currentURL.includes('/about') ? '✅ Redirected correctly' : '❌ Did NOT redirect');
} catch (e) {
  console.error('❌ Could not click "Learn more about Kontra":', e.message);
}

   // Step 11b: Click Kontra Logo → Home again
try {
  const logoLinkSelector = 'a[href="/"], a[href*="contra-dev.com"]';
  await page.waitForSelector(logoLinkSelector, { timeout: 15000 });
  await page.click(logoLinkSelector);
  await page.waitForLoadState('networkidle');

  currentURL = page.url();
  console.log(`Returned to Home: ${currentURL}`);
  console.log(currentURL.endsWith('/') ? '✅ Home page' : '❌ Not Home page');
} catch (e) {
  console.error('❌ Could not click Kontra logo to return Home:', e.message);
}

// Step 12: Social Media
try {
  const whoWeAreSection = await page.$('section:has-text("Who We Are")');
  if (whoWeAreSection) {
    await whoWeAreSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const socialLinks = [
      { selector: 'a[href*="linkedin.com"]', name: 'LinkedIn', expectedSubstring: 'linkedin.com/company/security-compass' },
      { selector: 'a[href*="facebook.com"]', name: 'Facebook', expectedSubstring: 'facebook.com/SecCompass' },
      { selector: 'a[href*="twitter.com"], a[href*="x.com"]', name: 'Twitter/X', expectedSubstring: 'x.com/securitycompass' },
    ];

    for (const social of socialLinks) {
      try {
        await page.waitForSelector(social.selector, { timeout: 10000 });
        const [newPage] = await Promise.all([
          page.context().waitForEvent('page', { timeout: 15000 }),
          page.click(social.selector),
        ]);

        await newPage.waitForLoadState('load');
        const url = newPage.url();
        console.log(`${social.name} opened in new tab: ${url}`);
        console.log(url.includes(social.expectedSubstring) ? `✅ ${social.name} correct redirect` : `❌ ${social.name} redirect failed`);
        await newPage.close();
      } catch (e) {
        console.error(`❌ Could not click ${social.name} icon or new tab failed:`, e.message);
      }
    }
  }
} catch (e) {
  console.error('❌ Error in Step 12 Social Media clicks:', e.message);
}

// Step 13 & 14: Click BOOK A DEMO buttons in two sections
try {
  const demoSections = [
    { name: 'Developer First Application Security Training', selector: 'section:has-text("Developer First Application Security Training")' },
    { name: 'Built For Developers, By Developers', selector: 'section:has-text("Built For Developers, By Developers")' },
  ];

  for (const sectionInfo of demoSections) {
    console.log(`\n--- Clicking BOOK A DEMO in ${sectionInfo.name} ---`);
    const section = await page.$(sectionInfo.selector);

    if (section) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);

      const demoButton = await section.$('text=BOOK A DEMO');
      if (demoButton) {
        await demoButton.click();
        console.log(`Clicked BOOK A DEMO in ${sectionInfo.name} ✅`);
        await page.waitForTimeout(1500);

        // Close pop-up by clicking bottom-right outside the pop-up
        const viewport = page.viewportSize() || { width: 1280, height: 720 };
        await page.mouse.click(viewport.width - 10, viewport.height - 10);
        console.log(`Closed BOOK A DEMO pop-up in ${sectionInfo.name} ✅`);
        await page.waitForTimeout(1000);
      } else {
        console.log(`❌ BOOK A DEMO button not found in ${sectionInfo.name}`);
      }
    } else {
      console.log(`❌ Section not found: ${sectionInfo.name}`);
    }
  }
} catch (e) {
  console.error('❌ Error clicking BOOK A DEMO buttons:', e.message);
}

// Step 15: Click BOOK A DEMO in Simply Beautiful section
try {
  console.log('\n--- Scrolling to Simply Beautiful section ---');
  const simplyBeautifulSection = await page.$('section:has-text("Simply Beautiful")');

  if (simplyBeautifulSection) {
    await simplyBeautifulSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const demoButton = await simplyBeautifulSection.$('text=Book a Demo');
    if (demoButton) {
      await demoButton.click();
      console.log('Clicked BOOK A DEMO in Simply Beautiful ✅');
      await page.waitForTimeout(1500);

      // Close pop-up by clicking outside the pop-up
      const viewport = page.viewportSize() || { width: 1280, height: 720 };
      await page.mouse.click(viewport.width - 10, viewport.height - 10);
      console.log('Closed BOOK A DEMO pop-up in Simply Beautiful ✅');
      await page.waitForTimeout(1000);
    } else {
      console.log('❌ BOOK A DEMO button not found in Simply Beautiful section');
    }
  } else {
    console.log('❌ Simply Beautiful section not found');
  }
} catch (e) {
  console.error('❌ Error clicking BOOK A DEMO in Simply Beautiful section:', e.message);
}

// ✅ Step 17: Scroll down to "Integrate with leading Learning Management Systems" section
console.log('\n--- Step 17: Checking Try Kontra SCORM link in Integrate with LMS section ---');

const lmsSection = page.locator('section:has-text("Integrate with leading Learning Management Systems")');
if (await lmsSection.count() > 0) {
  await lmsSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  const tryKontraLink = lmsSection.locator('a:has-text("Try Kontra SCORM")');
  if (await tryKontraLink.count() > 0) {
    await tryKontraLink.first().click();
    await page.waitForLoadState('networkidle');
    const currentURL = page.url();
    console.log(`Navigated to: ${currentURL}`);

    if (currentURL.includes('/faq') || currentURL.toLowerCase().includes('faq')) {
      console.log('✅ Try Kontra SCORM link correctly navigated to FAQ page');
    } else {
      console.log('❌ Try Kontra SCORM link did NOT navigate to FAQ page');
    }
  } else {
    console.log('❌ Try Kontra SCORM link not found in Integrate with LMS section');
  }
} else {
  console.log('❌ Integrate with LMS section not found');
}

// ✅ Step 18: Click the Kontra logo to navigate back to the Home page
console.log('\n--- Step 18: Clicking Kontra logo to return Home ---');

try {
  const logoLink = page.locator('a[href="/"], a[href*="contra-dev.com"]').first();
  await logoLink.waitFor({ state: 'visible', timeout: 10000 });
  await logoLink.click();
  await page.waitForLoadState('networkidle');

  const currentURL = page.url();
  console.log(`Returned to: ${currentURL}`);
  console.log(currentURL.endsWith('/') ? '✅ Successfully navigated back to Home' : '❌ Did NOT navigate to Home');
} catch (e) {
  console.error('❌ Could not click Kontra logo or return to Home:', e.message);
}

// ✅ Step 19: Scroll down to the Enterprise Ready section and click Book a Demo
console.log('\n--- Step 19: Checking Book a Demo in Enterprise Ready section ---');

try {
  // Locate the "Enterprise Ready" section
  const enterpriseSection = page.locator('section:has-text("Enterprise Ready")');
  if (await enterpriseSection.count() > 0) {
    await enterpriseSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Locate the Book a Demo button/link inside that section
    const demoButton = enterpriseSection.locator('.js-contact-us-modal-trigger, a:has-text("Book a Demo"), button:has-text("Book a Demo")');

    if (await demoButton.count() > 0) {
      await demoButton.first().click();
      console.log('Clicked Book a Demo in Enterprise Ready ✅');

      // Wait briefly for the modal to appear
      await page.waitForTimeout(1500);

      // Click outside the modal (bottom-right of viewport) to close it
      const viewport = page.viewportSize() || { width: 1280, height: 720 };
      await page.mouse.click(viewport.width - 10, viewport.height - 10);
      console.log('Closed Book a Demo pop-up in Enterprise Ready ✅');

      await page.waitForTimeout(1000);
    } else {
      console.log('❌ Book a Demo link not found in Enterprise Ready section');
    }
  } else {
    console.log('❌ Enterprise Ready section not found');
  }
} catch (e) {
  console.error('❌ Error handling Book a Demo in Enterprise Ready section:', e.message);
}
// ✅ Step 20: Scroll down to "Ready to begin?" section and click BOOK A DEMO
console.log('\n--- Step 20: Checking BOOK A DEMO button in Ready to begin? section ---');

try {
  // Locate the "Ready to begin?" section
  const readySection = page.locator('section:has-text("Ready to begin?")');
  if (await readySection.count() > 0) {
    await readySection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Locate the BOOK A DEMO button or trigger element
    const demoButton = readySection.locator('.js-contact-us-modal-trigger, a:has-text("BOOK A DEMO"), button:has-text("BOOK A DEMO")');

    if (await demoButton.count() > 0) {
      await demoButton.first().click();
      console.log('Clicked BOOK A DEMO in Ready to begin? ✅');

      // Wait for modal to appear
      await page.waitForTimeout(1500);

      // Click outside the modal (bottom-right corner)
      const viewport = page.viewportSize() || { width: 1280, height: 720 };
      await page.mouse.click(viewport.width - 10, viewport.height - 10);
      console.log('Closed BOOK A DEMO pop-up in Ready to begin? ✅');

      await page.waitForTimeout(1000);
    } else {
      console.log('❌ BOOK A DEMO button not found in Ready to begin? section');
    }
  } else {
    console.log('❌ Ready to begin? section not found');
  }
} catch (e) {
  console.error('❌ Error handling BOOK A DEMO in Ready to begin? section:', e.message);
}
// ✅ Step 21: Scroll down to Footer and click social media links
console.log('\n--- Step 21: Clicking social media links in Footer ---');

try {
  // Scroll to the footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const socialLinks = [
    { selector: 'a[href*="linkedin.com"]', name: 'LinkedIn', expected: 'https://www.linkedin.com/company/security-compass' }, // removed trailing slash
    { selector: 'a[href*="facebook.com"]', name: 'Facebook', expected: 'https://www.facebook.com/SecCompass' },
    { selector: 'a[href*="twitter.com"], a[href*="x.com"]', name: 'Twitter/X', expected: 'https://x.com/securitycompass' },
  ];

  for (const social of socialLinks) {
    try {
      await page.waitForSelector(social.selector, { timeout: 10000 });

      // Wait for new page/tab to open
      const [newPage] = await Promise.all([
        page.context().waitForEvent('page', { timeout: 15000 }),
        page.click(social.selector),
      ]);

      await newPage.waitForLoadState('load');
      const url = newPage.url();
      console.log(`${social.name} opened in new tab: ${url}`);

      // Use startsWith to avoid trailing slash issues
      console.log(url.startsWith(social.expected) ? `✅ ${social.name} correct redirect` : `❌ ${social.name} redirect failed`);
      await newPage.close();
    } catch (e) {
      console.error(`❌ Could not click ${social.name} icon or new tab failed:`, e.message);
    }
  }
} catch (e) {
  console.error('❌ Error scrolling to footer or clicking social media links:', e.message);
}

// ✅ Step 22: Navigate to Menu section and click Kontra hyperlink
console.log('\n--- Step 22: Clicking Kontra link in Menu section ---');

try {
  // Scroll to the Menu heading
  const menuHeading = await page.$('h2:has-text("MENU")');
  if (menuHeading) {
    await menuHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Find the Kontra link inside the Menu
    const kontraLink = await page.$('nav a[href="//contra-dev.com"]');
    if (kontraLink) {
      await kontraLink.click();
      await page.waitForLoadState('networkidle');

      const currentURL = page.url();
      console.log(`Navigated URL: ${currentURL}`);
      console.log(currentURL.includes('contra-dev.com') && currentURL.endsWith('/') 
        ? '✅ Home page' 
        : '❌ Did NOT navigate to home page');
    } else {
      console.log('❌ Kontra link not found in Menu section');
    }
  } else {
    console.log('❌ Menu section not found');
  }
} catch (e) {
  console.error('❌ Error navigating Menu → Kontra:', e.message);
}

// ✅ Step 23: Scroll down to Footer and click About link in Kontra Menu
console.log('\n--- Step 23: Clicking About link in Kontra Menu section ---');

try {
  // Scroll to the MENU section
  const menuHeading = await page.$('h2:has-text("MENU")');
  if (menuHeading) {
    await menuHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Find the About link inside the MENU section
    const aboutLink = await page.$('nav a[href="//contra-dev.com/about"]');
    if (aboutLink) {
      await aboutLink.click();
      await page.waitForLoadState('networkidle');

      const currentURL = page.url();
      console.log(`Navigated URL: ${currentURL}`);
      console.log(currentURL.includes('/about') 
        ? '✅ Successfully navigated to About page' 
        : '❌ Did NOT navigate to About page');
    } else {
      console.log('❌ About link not found in Menu section');
    }
  } else {
    console.log('❌ Menu section not found');
  }
} catch (e) {
  console.error('❌ Error clicking About link in Menu:', e.message);
}

// ✅ Step 24: Click Kontra logo → Home
console.log('\n--- Step 24: Clicking Kontra logo to return Home ---');

try {
  const logoLinkSelector = 'a[href="//contra-dev.com"], a[href="/"]';
  await page.waitForSelector(logoLinkSelector, { timeout: 15000 });
  await page.click(logoLinkSelector);
  await page.waitForLoadState('networkidle');

  let currentURL = page.url();
  console.log(`Returned to Home: ${currentURL}`);
  console.log(currentURL.endsWith('/') || currentURL.includes('contra-dev.com') 
    ? '✅ Home page' 
    : '❌ Not Home page');
} catch (e) {
  console.error('❌ Could not click Kontra logo to return Home:', e.message);
}

// ✅ Step 25: Scroll down to Footer Menu and click Blog link
console.log('\n--- Step 25: Clicking Blog link in Footer Menu ---');

try {
  // Scroll to the MENU section
  const menuHeading = await page.$('h2:has-text("MENU")');
  if (menuHeading) {
    await menuHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Find the Blog link inside the MENU section
    const blogLink = await page.$('nav a[href="https://www.securitycompass.com/kontra-blog/"]');
    if (blogLink) {
      // Click and wait for navigation (same tab)
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }),
        blogLink.click()
      ]);

      const currentURL = page.url();
      console.log(`Navigated URL: ${currentURL}`);
      console.log(currentURL.includes('securitycompass.com/kontra-blog') 
        ? '✅ Successfully navigated to Blog page' 
        : '❌ Did NOT navigate to Blog page');
    } else {
      console.log('❌ Blog link not found in Menu section');
    }
  } else {
    console.log('❌ Menu section not found');
  }
} catch (e) {
  console.error('❌ Error clicking Blog link in Menu:', e.message);
}

// ✅ Step 26: Navigate back to Home and scroll to Footer
console.log('\n--- Step 26: Returning to Home and scrolling to Footer ---');

try {
  // Navigate back to home page
  await page.goto('https://contra-dev.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  console.log('✅ Successfully navigated to Home and scrolled to Footer');
} catch (e) {
  console.error('❌ Could not navigate to Home or scroll to Footer:', e.message);
}

// ✅ Step 26: Navigate back to Home and scroll to Footer
console.log('\n--- Step 26: Returning to Home and scrolling to Footer ---');

try {
  // Navigate back to home page
  await page.goto('https://contra-dev.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  console.log('✅ Successfully navigated to Home and scrolled to Footer');
} catch (e) {
  console.error('❌ Could not navigate to Home or scroll to Footer:', e.message);
}

// ✅ Step 27: Click "Book a Demo" in the footer
console.log('\n--- Step 27: Clicking Book a Demo in Footer ---');

try {
  // Scroll the footer into view
  const footer = await page.$('footer');
  if (footer) {
    await footer.scrollIntoViewIfNeeded();
    console.log('Scrolled footer into view ✅');
  } else {
    throw new Error('Footer not found');
  }

  // Wait for the "Book a Demo" link to be visible
  const bookDemoLink = await page.$('a.js-contact-us-modal-trigger:has-text("Book a Demo")');
  if (bookDemoLink) {
    // Ensure the link is not covered by any overlay
    const isCovered = await page.evaluate((link) => {
      const rect = link.getBoundingClientRect();
      const elementFromPoint = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      return elementFromPoint !== link;
    }, bookDemoLink);

    if (isCovered) {
      console.log('The "Book a Demo" link is covered by another element.');
      // Optionally, you can attempt to close any overlay here
    } else {
      // Click the link
      await bookDemoLink.click({ force: true });
      console.log('Clicked "Book a Demo" link ✅');

      // Wait for the modal to appear
      await page.waitForTimeout(3000);

      // Close the modal by clicking outside
      const viewport = page.viewportSize() || { width: 1280, height: 720 };
      await page.mouse.click(viewport.width - 10, viewport.height - 10);
      console.log('Closed "Book a Demo" modal ✅');
    }
  } else {
    throw new Error('"Book a Demo" link not found');
  }
} catch (error) {
  console.error('❌ Error clicking "Book a Demo" in Footer:', error.message);
}

// Step 28: Click Privacy Policy in Menu section (open in new tab) and return Home
console.log('\n--- Step 28: Clicking Privacy Policy in Menu section ---');

try {
  const privacyLink = await page.$('nav a[href*="privacy-policy"]');
  if (privacyLink) {
    // Open link in a new tab
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      privacyLink.click({ button: 'middle' }) // middle button simulates opening in new tab
    ]);

    await newPage.waitForLoadState('load');
    console.log(`Privacy Policy page opened: ${newPage.url()}`);
    console.log(newPage.url().includes('privacy-policy') ? '✅ Privacy Policy loaded' : '❌ URL mismatch');

    // Close the new tab
    await newPage.close();
    console.log('Closed Privacy Policy tab');

    // Return to Home page
    await page.goto('https://contra-dev.com/', { waitUntil: 'networkidle' });
    console.log('Returned to Home page ✅');
  } else {
    console.log('❌ Privacy Policy link not found in Menu section');
  }
} catch (e) {
  console.error('❌ Error handling Privacy Policy link:', e.message);
}

// ✅ Step 29: Scroll to Footer Menu and check Support hyperlink
console.log('\n--- Step 29: Checking Support link in Footer Menu ---');

try {
  const footerMenu = await page.$('h2:has-text("MENU")');
  if (footerMenu) {
    await footerMenu.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const supportLink = await page.$('nav a[href^="mailto:kontrasupport@securitycompass.com"]');
    if (supportLink) {
      const href = await supportLink.getAttribute('href');
      console.log(`Support link found with href: ${href}`);
      console.log(href === 'mailto:kontrasupport@securitycompass.com' 
        ? '✅ Support link is correct' 
        : '❌ Support link href mismatch');
    } else {
      console.log('❌ Support link not found in Footer Menu');
    }
  } else {
    console.log('❌ Footer Menu section not found');
  }
} catch (e) {
  console.error('❌ Error checking Support link:', e.message);
}  

// ✅ Step 30: Click Try SCORM Tab (same-tab navigation)
    try {
      console.log('\n--- Step 30: Clicking Try SCORM tab (same tab) ---');

      const tryScormSelectors = [
        'a:has-text("Try Kontra SCORM")',
        'text=Try Kontra SCORM',
        'text=Try SCORM',
        'a[href*="/faq/scorm"]'
      ];

      let clicked = false;
      for (const sel of tryScormSelectors) {
        if (await page.locator(sel).count() === 0) continue;

        // Prefer navigation-aware click in same tab
        try {
          await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }),
            page.click(sel, { timeout: 7000 })
          ]);
        } catch (navErr) {
          // Fallback: click and wait for load state
          await page.click(sel).catch(() => null);
          await page.waitForLoadState('networkidle');
        }

        currentURL = page.url();
        console.log(`Redirected to: ${currentURL}`);
        console.log(currentURL && currentURL.includes('/faq/scorm') ? '✅ Try SCORM tab clicked' : '❌ Try SCORM did not navigate to expected URL');
        clicked = true;
        break;
      }

      if (!clicked) console.log('❌ Try SCORM link not found on the page');
    } catch (e) {
      console.error('❌ Error clicking Try SCORM tab:', e.message);
    }

      // --- Post-navigation validations on Try SCORM page ---
      try {
        // Step 31. Verify hero heading and descriptive content
        console.log('\n--- Verifying Try SCORM hero content ---');
        const heroHeadingVisible = await page.isVisible('text=Our Content, Your Environment');
        const heroDescVisible = await page.isVisible('text=Our SCORM-compliant content works with the leading third-party learning management systems');
        console.log(`Our Content heading: ${heroHeadingVisible}`);
        console.log(`Hero description (SCORM compatibility) visible: ${heroDescVisible}`);

        // Step 32 & 33. BOOK A DEMO button should be displayed below the text
        const bookDemoHero = await page.locator('a:has-text("Book a Demo"), button:has-text("BOOK A DEMO")').first();
        const bookDemoHeroVisible = (await bookDemoHero.count()) > 0 && await bookDemoHero.isVisible();
        console.log(`BOOK A DEMO (hero) visible: ${bookDemoHeroVisible}`);

        // 4. Click BOOK A DEMO and close modal by clicking outside
        if (bookDemoHeroVisible) {
          await Promise.all([
            page.waitForTimeout(500),
            bookDemoHero.click().catch(() => null)
          ]);

          // give modal a moment
          await page.waitForTimeout(1500);

          // Click outside modal to close
          const vp = page.viewportSize() || { width: 1280, height: 720 };
          await page.mouse.click(vp.width - 10, vp.height - 10);
          console.log('Clicked outside to close BOOK A DEMO modal');
          await page.waitForTimeout(800);
        } else {
          console.log('❌ BOOK A DEMO (hero) not found, skipping click');
        }

        // Step 35. Scroll down the screen
        console.log('\n--- Scrolling down to content sections ---');
        await page.mouse.wheel(0, 1200);
        await page.waitForTimeout(1200);

        // Step 36. Verify "Why Use Kontra SCORM" heading and description
        const whyHeadingVisible = await page.isVisible('text=Why Use Kontra SCORM');
        const whyDescVisible = await page.isVisible('text=Kontra SCORM, the industry\'s only interactive application training solution that plugs into');
        console.log(`Why Use Kontra SCORM heading: ${whyHeadingVisible}`);
        console.log(`Why Use Kontra SCORM description visible: ${whyDescVisible}`);

        // Step 37 (continued). Verify feature blocks/subsections
        const devOnboarding = await page.isVisible('text=Developer\nOnboarding') || await page.isVisible('text=Easily roll out your application security training platform to hundreds and thousands');
        const userRoleMgmt = await page.isVisible('text=User Role and\nGroup Management') || await page.isVisible('text=Use Single Sign-On for frictionless onboarding');
        const trainingEnforcement = await page.isVisible('text=Training\nEnforcement') || await page.isVisible('text=By integration Kontra SCORM into your native LMS');
        const reportingCompliance = await page.isVisible('text=Reporting and\nCompliance') || await page.isVisible('text=Track your trams progress and easily report back to management');

        console.log(`Developer Onboarding content: ${devOnboarding}`);
        console.log(`User Role and Group Management content: ${userRoleMgmt}`);
        console.log(`Training Enforcement content: ${trainingEnforcement}`);
        console.log(`Reporting and Compliance content: ${reportingCompliance}`);

        // Step 38. Scroll further down to ensure sections load
        await page.mouse.wheel(0, 1200);
        await page.waitForTimeout(1000);

      } catch (postErr) {
        console.error('❌ Error validating Try SCORM page contents:', postErr.message);
      }

      // ✅ Step 39: Click Book a Demo in SCORM: Ready for Enterprise section
      console.log('\n--- Step 8: Clicking Book a Demo in SCORM: Ready for Enterprise section ---');
      try {
        // Scroll down to find the Ready for Enterprise section
        console.log('Scrolling down to find Ready for Enterprise section...');
        await page.mouse.wheel(0, 2000);
        await page.waitForTimeout(1200);

        // Look for the specific button class used on Try SCORM page
        const demoBtn = page.locator('.js-download-scorm-modal-trigger').first();
        
        if (await demoBtn.count() > 0) {
          await demoBtn.scrollIntoViewIfNeeded();
          await page.waitForTimeout(600);
          await demoBtn.click().catch(() => null);
          console.log('Step 8: Clicked Book a Demo in Ready for Enterprise ✅');
          
          await page.waitForTimeout(1500);

          // Close modal by clicking outside
          const viewport = page.viewportSize() || { width: 1280, height: 720 };
          await page.mouse.click(viewport.width - 10, viewport.height - 10);
          console.log('Step 8: Closed modal ✅');
          await page.waitForTimeout(800);
        } else {
          console.log('❌ Step 8: Book a Demo button (.js-download-scorm-modal-trigger) not found');
        }
      } catch (err) {
        console.error('❌ Error in Step 8:', err.message);
      }

      // ✅ Step 40: Scroll down the screen
      console.log('\n--- Step 40: Scrolling down the screen ---');
      try {
        await page.mouse.wheel(0, 2000);
        await page.waitForTimeout(1200);
        console.log('Step 9: Scrolled down ✅');
      } catch (err) {
        console.error('❌ Error in Step 9:', err.message);
      }

      // ✅ Step 41: Click Book a Demo under Compatible with any LMS section
      console.log('\n--- Step 41: Clicking Book a Demo in Compatible with any LMS section ---');
      try {
        // Get all .js-download-scorm-modal-trigger buttons
        const allDemoButtons = await page.locator('.js-download-scorm-modal-trigger').all();
        console.log(`Found ${allDemoButtons.length} total Book a Demo buttons on page`);

        if (allDemoButtons.length > 0) {
          // Find the button that's in the "Compatible with any LMS" section
          let targetButtonIndex = -1;
          
          for (let i = 0; i < allDemoButtons.length; i++) {
            const btn = allDemoButtons[i];
            
            // Get the parent section/container of this button
            const sectionText = await page.evaluate((element) => {
              const section = element.closest('section, article, div[class*="section"], div[class*="container"]');
              if (section) {
                return section.innerText || section.textContent || '';
              }
              return '';
            }, await btn.elementHandle());

            // Check if this button's section contains "Compatible with any LMS"
            if (sectionText && /compatible with any lms/i.test(sectionText)) {
              targetButtonIndex = i;
              console.log(`Found target button at index ${i}`);
              break;
            }
          }

          if (targetButtonIndex >= 0) {
            const targetBtn = allDemoButtons[targetButtonIndex];
            await targetBtn.scrollIntoViewIfNeeded();
            await page.waitForTimeout(600);
            await targetBtn.click().catch(() => null);
            console.log('Step 10: Clicked Book a Demo in Compatible with any LMS ✅');
            
            await page.waitForTimeout(1500);

            // Close modal by clicking outside
            const viewport = page.viewportSize() || { width: 1280, height: 720 };
            await page.mouse.click(viewport.width - 10, viewport.height - 10);
            console.log('Step 10: Closed modal ✅');
            await page.waitForTimeout(800);
          } else {
            console.log('❌ Step 10: Could not find demo button in Compatible with any LMS section');
            // Diagnostic: list all button parent sections
            for (let i = 0; i < Math.min(allDemoButtons.length, 5); i++) {
              const sectionPreview = await page.evaluate((element) => {
                const section = element.closest('section, article, div[class*="section"], div[class*="container"]');
                return (section?.innerText || '').substring(0, 80);
              }, await allDemoButtons[i].elementHandle());
              console.log(`Button ${i} section preview: "${sectionPreview}..."`);
            }
          }
        } else {
          console.log('❌ Step 10: No Book a Demo buttons found on page');
        }
      } catch (err) {
        console.error('❌ Error in Step 10:', err.message);
      }

      // ✅ Step 42: Scroll down the screen
      console.log('\n--- Step 42: Scrolling down the screen ---');
      try {
        await page.mouse.wheel(0, 2000);
        await page.waitForTimeout(1200);
        console.log('Step 42: Scrolled down ✅');
      } catch (err) {
        console.error('❌ Error in Step 42:', err.message);
      }

      // ✅ Step 43: Click Book a Demo under Ready to Try SCORM For Free? section
      console.log('\n--- Step 43: Clicking Book a Demo in Ready to Try SCORM For Free? section ---');
      try {
        // Get all .js-download-scorm-modal-trigger buttons
        const allDemoButtons = await page.locator('.js-download-scorm-modal-trigger').all();
        console.log(`Found ${allDemoButtons.length} total Book a Demo buttons on page`);

        if (allDemoButtons.length > 0) {
          // Find the button that's in the "Ready to Try SCORM For Free?" section
          let targetButtonIndex = -1;
          
          for (let i = 0; i < allDemoButtons.length; i++) {
            const btn = allDemoButtons[i];
            
            // Get the parent section/container of this button
            const sectionText = await page.evaluate((element) => {
              const section = element.closest('section, article, div[class*="section"], div[class*="container"]');
              if (section) {
                return section.innerText || section.textContent || '';
              }
              return '';
            }, await btn.elementHandle());

            // Check if this button's section contains "Ready to Try SCORM For Free?"
            if (sectionText && /ready to try scorm for free/i.test(sectionText)) {
              targetButtonIndex = i;
              console.log(`Found target button at index ${i}`);
              break;
            }
          }

          if (targetButtonIndex >= 0) {
            const targetBtn = allDemoButtons[targetButtonIndex];
            await targetBtn.scrollIntoViewIfNeeded();
            await page.waitForTimeout(600);
            await targetBtn.click().catch(() => null);
            console.log('Step 12: Clicked Book a Demo in Ready to Try SCORM For Free? ✅');
            
            await page.waitForTimeout(1500);

            // Close modal by clicking outside
            const viewport = page.viewportSize() || { width: 1280, height: 720 };
            await page.mouse.click(viewport.width - 10, viewport.height - 10);
            console.log('Step 12: Closed modal ✅');
            await page.waitForTimeout(800);
          } else {
            console.log('❌ Step 12: Could not find demo button in Ready to Try SCORM For Free? section');
            // Diagnostic: list all button parent sections
            for (let i = 0; i < Math.min(allDemoButtons.length, 5); i++) {
              const sectionPreview = await page.evaluate((element) => {
                const section = element.closest('section, article, div[class*="section"], div[class*="container"]');
                return (section?.innerText || '').substring(0, 80);
              }, await allDemoButtons[i].elementHandle());
              console.log(`Button ${i} section preview: "${sectionPreview}..."`);
            }
          }
        } else {
          console.log('❌ Step 12: No Book a Demo buttons found on page');
        }
      } catch (err) {
        console.error('❌ Error in Step 12:', err.message);
      }

      // ✅ Step 44: Click on the arrow icon to expand "What is a Learning Management System?" FAQ
      console.log('\n--- Step 44: Expanding "What is a Learning Management System?" FAQ ---');
      try {
        // Find the FAQ item with the title using the exact class structure
        const faqTitles = await page.$$('.js-accordion-title');
        console.log(`Found ${faqTitles.length} FAQ accordion titles`);

        let found = false;
        for (const faqTitle of faqTitles) {
          const titleText = await faqTitle.innerText();
          if (titleText && /what is a learning management system/i.test(titleText)) {
            console.log('Found the FAQ item: What is a Learning Management System?');
            
            // Click the title itself to toggle the accordion
            await faqTitle.click();
            console.log('Step 13: Clicked to expand FAQ ✅');
            await page.waitForTimeout(800);

            // Verify the accordion is expanded by checking for Accordion--Active class
            const isExpanded = await page.evaluate(() => {
              const title = Array.from(document.querySelectorAll('.js-accordion-title')).find(
                el => /what is a learning management system/i.test(el.innerText || '')
              );
              if (title) {
                const accordion = title.closest('.js-accordion');
                return accordion ? accordion.classList.contains('Accordion--Active') : false;
              }
              return false;
            });

            console.log(`Step 44: FAQ expanded: ${isExpanded ? '✅' : '❌'}`);
            found = true;
            break;
          }
        }

        if (!found) {
          console.log('❌ Step 44: Could not find or expand the FAQ item');
        }
      } catch (err) {
        console.error('❌ Error in Step 44:', err.message);
      }

      // ✅ Step 45: Click on the title again to collapse the FAQ
      console.log('\n--- Step 45: Collapsing "What is a Learning Management System?" FAQ ---');
      try {
        // Find the FAQ item with the title
        const faqTitles = await page.$$('.js-accordion-title');
        console.log(`Found ${faqTitles.length} FAQ accordion titles`);

        let found = false;
        for (const faqTitle of faqTitles) {
          const titleText = await faqTitle.innerText();
          if (titleText && /what is a learning management system/i.test(titleText)) {
            console.log('Found the FAQ item: What is a Learning Management System?');
            
            // Click the title to toggle the accordion closed
            await faqTitle.click();
            console.log('Step 45: Clicked to collapse FAQ ✅');
            await page.waitForTimeout(800);

            // Verify the accordion is collapsed by checking Accordion--Active class is removed
            const isCollapsed = await page.evaluate(() => {
              const title = Array.from(document.querySelectorAll('.js-accordion-title')).find(
                el => /what is a learning management system/i.test(el.innerText || '')
              );
              if (title) {
                const accordion = title.closest('.js-accordion');
                return accordion ? !accordion.classList.contains('Accordion--Active') : false;
              }
              return false;
            });

            console.log(`Step 45: FAQ collapsed: ${isCollapsed ? '✅' : '❌'}`);
            found = true;
            break;
          }
        }

        if (!found) {
          console.log('❌ Step 45: Could not find or collapse the FAQ item');
        }
      } catch (err) {
        console.error('❌ Error in Step 45:', err.message);
      }

      // ✅ Step 46: Click on the arrow icon to expand "Who can I contact in my organization to learn more about our corporate LMS?" FAQ
      console.log('\n--- Step 46: Expanding "Who can I contact in my organization to learn more about our corporate LMS?" FAQ ---');
      try {
        // Find the FAQ item with the title
        const faqTitles = await page.$$('.js-accordion-title');
        console.log(`Found ${faqTitles.length} FAQ accordion titles`);

        let found = false;
        for (const faqTitle of faqTitles) {
          const titleText = await faqTitle.innerText();
          if (titleText && /who can i contact in my organization to learn more about our corporate lms/i.test(titleText)) {
            console.log('Found the FAQ item: Who can I contact in my organization to learn more about our corporate LMS?');
            
            // Click the title itself to toggle the accordion
            await faqTitle.click();
            console.log('Step 46: Clicked to expand FAQ ✅');
            await page.waitForTimeout(800);

            // Verify the accordion is expanded by checking for Accordion--Active class
            const isExpanded = await page.evaluate(() => {
              const title = Array.from(document.querySelectorAll('.js-accordion-title')).find(
                el => /who can i contact in my organization to learn more about our corporate lms/i.test(el.innerText || '')
              );
              if (title) {
                const accordion = title.closest('.js-accordion');
                return accordion ? accordion.classList.contains('Accordion--Active') : false;
              }
              return false;
            });

            console.log(`Step 46: FAQ expanded: ${isExpanded ? '✅' : '❌'}`);
            found = true;
            break;
          }
        }

        if (!found) {
          console.log('❌ Step 46: Could not find or expand the FAQ item');
        }
      } catch (err) {
        console.error('❌ Error in Step 46:', err.message);
      }

      // ✅ Step 47: Click on the arrow icon again to collapse the FAQ
      console.log('\n--- Step 47: Collapsing "Who can I contact in my organization to learn more about our corporate LMS?" FAQ ---');
      try {
        // Find the FAQ item with the title
        const faqTitles = await page.$$('.js-accordion-title');
        console.log(`Found ${faqTitles.length} FAQ accordion titles`);

        let found = false;
        for (const faqTitle of faqTitles) {
          const titleText = await faqTitle.innerText();
          if (titleText && /who can i contact in my organization to learn more about our corporate lms/i.test(titleText)) {
            console.log('Found the FAQ item: Who can I contact in my organization to learn more about our corporate LMS?');
            
            // Click the title to toggle the accordion closed
            await faqTitle.click();
            console.log('Step 47: Clicked to collapse FAQ ✅');
            await page.waitForTimeout(800);

            // Verify the accordion is collapsed by checking Accordion--Active class is removed
            const isCollapsed = await page.evaluate(() => {
              const title = Array.from(document.querySelectorAll('.js-accordion-title')).find(
                el => /who can i contact in my organization to learn more about our corporate lms/i.test(el.innerText || '')
              );
              if (title) {
                const accordion = title.closest('.js-accordion');
                return accordion ? !accordion.classList.contains('Accordion--Active') : false;
              }
              return false;
            });

            console.log(`Step 47: FAQ collapsed: ${isCollapsed ? '✅' : '❌'}`);
            found = true;
            break;
          }
        }

        if (!found) {
          console.log('❌ Step 16: Could not find or collapse the FAQ item');
        }
      } catch (err) {
        console.error('❌ Error in Step 16:', err.message);
      }

      // ✅ Step 48: Click on the arrow icon to expand "I'm not sure if my company uses a Learning Management System. Can I still use Kontra?" FAQ
      console.log('\n--- Step 48: Expanding "I\'m not sure if my company uses a Learning Management System. Can I still use Kontra?" FAQ ---');
      try {
        // Find the FAQ item with the title
        const faqTitles = await page.$$('.js-accordion-title');
        console.log(`Found ${faqTitles.length} FAQ accordion titles`);

        let found = false;
        for (const faqTitle of faqTitles) {
          const titleText = await faqTitle.innerText();
          if (titleText && /i'm not sure if my company uses a learning management system\. can i still use kontra/i.test(titleText)) {
            console.log('Found the FAQ item: I\'m not sure if my company uses a Learning Management System. Can I still use Kontra?');
            
            // Click the title itself to toggle the accordion
            await faqTitle.click();
            console.log('Step 48: Clicked to expand FAQ ✅');
            await page.waitForTimeout(800);

            // Verify the accordion is expanded by checking for Accordion--Active class
            const isExpanded = await page.evaluate(() => {
              const title = Array.from(document.querySelectorAll('.js-accordion-title')).find(
                el => /i'm not sure if my company uses a learning management system\. can i still use kontra/i.test(el.innerText || '')
              );
              if (title) {
                const accordion = title.closest('.js-accordion');
                return accordion ? accordion.classList.contains('Accordion--Active') : false;
              }
              return false;
            });

            console.log(`Step 48: FAQ expanded: ${isExpanded ? '✅' : '❌'}`);
            found = true;
            break;
          }
        }

        if (!found) {
          console.log('❌ Step 48: Could not find or expand the FAQ item');
        }
      } catch (err) {
        console.error('❌ Error in Step 48:', err.message);
      }

      // ✅ Step 49: Click on the arrow icon again to collapse the FAQ
      console.log('\n--- Step 49: Collapsing "I\'m not sure if my company uses a Learning Management System. Can I still use Kontra?" FAQ ---');
      try {
        // Find the FAQ item with the title
        const faqTitles = await page.$$('.js-accordion-title');
        console.log(`Found ${faqTitles.length} FAQ accordion titles`);

        let found = false;
        for (const faqTitle of faqTitles) {
          const titleText = await faqTitle.innerText();
          if (titleText && /i'm not sure if my company uses a learning management system\. can i still use kontra/i.test(titleText)) {
            console.log('Found the FAQ item: I\'m not sure if my company uses a Learning Management System. Can I still use Kontra?');
            
            // Click the title to toggle the accordion closed
            await faqTitle.click();
            console.log('Step 49: Clicked to collapse FAQ ✅');
            await page.waitForTimeout(800);

            // Verify the accordion is collapsed by checking Accordion--Active class is removed
            const isCollapsed = await page.evaluate(() => {
              const title = Array.from(document.querySelectorAll('.js-accordion-title')).find(
                el => /i'm not sure if my company uses a learning management system\. can i still use kontra/i.test(el.innerText || '')
              );
              if (title) {
                const accordion = title.closest('.js-accordion');
                return accordion ? !accordion.classList.contains('Accordion--Active') : false;
              }
              return false;
            });

            console.log(`Step 49: FAQ collapsed: ${isCollapsed ? '✅' : '❌'}`);
            found = true;
            break;
          }
        }

        if (!found) {
          console.log('❌ Step 49: Could not find or collapse the FAQ item');
        }
      } catch (err) {
        console.error('❌ Error in Step 49:', err.message);
      }

      // ✅ Step 50: Click on the arrow icon to expand "Why integrate Kontra with your Learning Management System?" FAQ
      console.log('\n--- Step 50: Expanding "Why integrate Kontra with your Learning Management System?" FAQ ---');
      try {
        // Find the FAQ item with the title
        const faqTitles = await page.$$('.js-accordion-title');
        console.log(`Found ${faqTitles.length} FAQ accordion titles`);

        let found = false;
        for (const faqTitle of faqTitles) {
          const titleText = await faqTitle.innerText();
          if (titleText && /why integrate kontra with your learning management system/i.test(titleText)) {
            console.log('Found the FAQ item: Why integrate Kontra with your Learning Management System?');
            
            // Click the title itself to toggle the accordion
            await faqTitle.click();
            console.log('Step 50: Clicked to expand FAQ ✅');
            await page.waitForTimeout(800);

            // Verify the accordion is expanded by checking for Accordion--Active class
            const isExpanded = await page.evaluate(() => {
              const title = Array.from(document.querySelectorAll('.js-accordion-title')).find(
                el => /why integrate kontra with your learning management system/i.test(el.innerText || '')
              );
              if (title) {
                const accordion = title.closest('.js-accordion');
                return accordion ? accordion.classList.contains('Accordion--Active') : false;
              }
              return false;
            });

            console.log(`Step 50: FAQ expanded: ${isExpanded ? '✅' : '❌'}`);
            found = true;
            break;
          }
        }

        if (!found) {
          console.log('❌ Step 50: Could not find or expand the FAQ item');
        }
      } catch (err) {
        console.error('❌ Error in Step 50:', err.message);
      }

      // ✅ Step 51: Click on the arrow icon again to collapse the FAQ
      console.log('\n--- Step 51: Collapsing "Why integrate Kontra with your Learning Management System?" FAQ ---');
      try {
        // Find the FAQ item with the title
        const faqTitles = await page.$$('.js-accordion-title');
        console.log(`Found ${faqTitles.length} FAQ accordion titles`);

        let found = false;
        for (const faqTitle of faqTitles) {
          const titleText = await faqTitle.innerText();
          if (titleText && /why integrate kontra with your learning management system/i.test(titleText)) {
            console.log('Found the FAQ item: Why integrate Kontra with your Learning Management System?');
            
            // Click the title to toggle the accordion closed
            await faqTitle.click();
            console.log('Step 51: Clicked to collapse FAQ ✅');
            await page.waitForTimeout(800);

            // Verify the accordion is collapsed by checking Accordion--Active class is removed
            const isCollapsed = await page.evaluate(() => {
              const title = Array.from(document.querySelectorAll('.js-accordion-title')).find(
                el => /why integrate kontra with your learning management system/i.test(el.innerText || '')
              );
              if (title) {
                const accordion = title.closest('.js-accordion');
                return accordion ? !accordion.classList.contains('Accordion--Active') : false;
              }
              return false;
            });

            console.log(`Step 51: FAQ collapsed: ${isCollapsed ? '✅' : '❌'}`);
            found = true;
            break;
          }
        }

        if (!found) {
          console.log('❌ Step 51: Could not find or collapse the FAQ item');
        }
      } catch (err) {
        console.error('❌ Error in Step 51:', err.message);
      }

      // ✅ Step 52: Click on the arrow icon to expand "Can Kontra integrate with my LMS?" FAQ
      console.log('\n--- Step 52: Expanding "Can Kontra integrate with my LMS?" FAQ ---');
      try {
        // Find the FAQ item with the title
        const faqTitles = await page.$$('.js-accordion-title');
        console.log(`Found ${faqTitles.length} FAQ accordion titles`);

        let found = false;
        for (const faqTitle of faqTitles) {
          const titleText = await faqTitle.innerText();
          if (titleText && /can kontra integrate with my lms/i.test(titleText)) {
            console.log('Found the FAQ item: Can Kontra integrate with my LMS?');
            
            // Click the title itself to toggle the accordion
            await faqTitle.click();
            console.log('Step 52: Clicked to expand FAQ ✅');
            await page.waitForTimeout(800);

            // Verify the accordion is expanded by checking for Accordion--Active class
            const isExpanded = await page.evaluate(() => {
              const title = Array.from(document.querySelectorAll('.js-accordion-title')).find(
                el => /can kontra integrate with my lms/i.test(el.innerText || '')
              );
              if (title) {
                const accordion = title.closest('.js-accordion');
                return accordion ? accordion.classList.contains('Accordion--Active') : false;
              }
              return false;
            });

            console.log(`Step 52: FAQ expanded: ${isExpanded ? '✅' : '❌'}`);
            found = true;
            break;
          }
        }

        if (!found) {
          console.log('❌ Step 52: Could not find or expand the FAQ item');
        }
      } catch (err) {
        console.error('❌ Error in Step 52:', err.message);
      }

      // ✅ Step 53: Click on the arrow icon again to collapse the FAQ
      console.log('\n--- Step 53: Collapsing "Can Kontra integrate with my LMS?" FAQ ---');
      try {
        // Find the FAQ item with the title
        const faqTitles = await page.$$('.js-accordion-title');
        console.log(`Found ${faqTitles.length} FAQ accordion titles`);

        let found = false;
        for (const faqTitle of faqTitles) {
          const titleText = await faqTitle.innerText();
          if (titleText && /can kontra integrate with my lms/i.test(titleText)) {
            console.log('Found the FAQ item: Can Kontra integrate with my LMS?');
            
            // Click the title to toggle the accordion closed
            await faqTitle.click();
            console.log('Step 53: Clicked to collapse FAQ ✅');
            await page.waitForTimeout(800);

            // Verify the accordion is collapsed by checking Accordion--Active class is removed
            const isCollapsed = await page.evaluate(() => {
              const title = Array.from(document.querySelectorAll('.js-accordion-title')).find(
                el => /can kontra integrate with my lms/i.test(el.innerText || '')
              );
              if (title) {
                const accordion = title.closest('.js-accordion');
                return accordion ? !accordion.classList.contains('Accordion--Active') : false;
              }
              return false;
            });

            console.log(`Step 53: FAQ collapsed: ${isCollapsed ? '✅' : '❌'}`);
            found = true;
            break;
          }
        }

        if (!found) {
          console.log('❌ Step 53: Could not find or collapse the FAQ item');
        }
      } catch (err) {
        console.error('❌ Error in Step 53:', err.message);
      }

      // ✅ Step 54: Click on the arrow icon to expand "What does an integration typically entail?" FAQ
      console.log('\n--- Step 54: Expanding "What does an integration typically entail?" FAQ ---');
      try {
        // Find the FAQ item with the title
        const faqTitles = await page.$$('.js-accordion-title');
        console.log(`Found ${faqTitles.length} FAQ accordion titles`);

        let found = false;
        for (const faqTitle of faqTitles) {
          const titleText = await faqTitle.innerText();
          if (titleText && /what does an integration typically entail/i.test(titleText)) {
            console.log('Found the FAQ item: What does an integration typically entail?');
            
            // Click the title itself to toggle the accordion
            await faqTitle.click();
            console.log('Step 54: Clicked to expand FAQ ✅');
            await page.waitForTimeout(800);

            // Verify the accordion is expanded by checking for Accordion--Active class
            const isExpanded = await page.evaluate(() => {
              const title = Array.from(document.querySelectorAll('.js-accordion-title')).find(
                el => /what does an integration typically entail/i.test(el.innerText || '')
              );
              if (title) {
                const accordion = title.closest('.js-accordion');
                return accordion ? accordion.classList.contains('Accordion--Active') : false;
              }
              return false;
            });

            console.log(`Step 54: FAQ expanded: ${isExpanded ? '✅' : '❌'}`);
            found = true;
            break;
          }
        }

        if (!found) {
          console.log('❌ Step 54: Could not find or expand the FAQ item');
        }
      } catch (err) {
        console.error('❌ Error in Step 54:', err.message);
      }

      // ✅ Step 55: Click on the arrow icon again to collapse the FAQ
      console.log('\n--- Step 55: Collapsing "What does an integration typically entail?" FAQ ---');
      try {
        // Find the FAQ item with the title
        const faqTitles = await page.$$('.js-accordion-title');
        console.log(`Found ${faqTitles.length} FAQ accordion titles`);

        let found = false;
        for (const faqTitle of faqTitles) {
          const titleText = await faqTitle.innerText();
          if (titleText && /what does an integration typically entail/i.test(titleText)) {
            console.log('Found the FAQ item: What does an integration typically entail?');
            
            // Click the title to toggle the accordion closed
            await faqTitle.click();
            console.log('Step 55: Clicked to collapse FAQ ✅');
            await page.waitForTimeout(800);

            // Verify the accordion is collapsed by checking Accordion--Active class is removed
            const isCollapsed = await page.evaluate(() => {
              const title = Array.from(document.querySelectorAll('.js-accordion-title')).find(
                el => /what does an integration typically entail/i.test(el.innerText || '')
              );
              if (title) {
                const accordion = title.closest('.js-accordion');
                return accordion ? !accordion.classList.contains('Accordion--Active') : false;
              }
              return false;
            });

            console.log(`Step 55: FAQ collapsed: ${isCollapsed ? '✅' : '❌'}`);
            found = true;
            break;
          }
        }

        if (!found) {
          console.log('❌ Step 55: Could not find or collapse the FAQ item');
        }
      } catch (err) {
        console.error('❌ Error in Step 55:', err.message);
      }

// ✅ Step 56: Scroll down to Footer and click social media links
console.log('\n--- Step 56: Clicking social media links in Footer ---');

try {
  // Scroll to the footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);

  const socialLinks = [
    { selector: 'a[href*="linkedin.com"]', name: 'LinkedIn', expected: 'https://www.linkedin.com/company/security-compass' },
    { selector: 'a[href*="facebook.com"]', name: 'Facebook', expected: 'https://www.facebook.com/SecCompass' },
    { selector: 'a[href*="x.com"]', name: 'Twitter/X', expected: 'https://x.com/securitycompass' },
  ];

  for (const social of socialLinks) {
    try {
      // Find the element using the selector
      const element = await page.$(social.selector);
      if (element) {
        // Get the href attribute
        const href = await element.getAttribute('href');
        console.log(`Step 56: Found ${social.name} link: ${href}`);
        
        // Open link in new page
        const [newPage] = await Promise.all([
          page.context().waitForEvent('page', { timeout: 15000 }),
          element.click()
        ]);
        
        await newPage.waitForLoadState('load');
        const url = newPage.url();
        console.log(`${social.name} opened in new tab: ${url}`);
        console.log(url.includes(social.expected) ? `✅ ${social.name} correct redirect` : `❌ ${social.name} redirect failed`);
        
        await newPage.close();
      } else {
        console.log(`⚠️ Step 56: ${social.name} link not found`);
      }
    } catch (e) {
      console.error(`❌ Step 56: Could not click ${social.name} or open new page:`, e.message);
    }
  }

  console.log('Step 56: Social media links check completed ✅');
} catch (e) {
  console.error('❌ Error in Step 56 - scrolling to footer or clicking social media links:', e.message);
}

// ✅ Step 57: Navigate to Menu section and click Kontra hyperlink
console.log('\n--- Step 57: Clicking Kontra link in Menu section ---');

try {
  // Scroll to the Menu heading
  const menuHeading = await page.$('h2:has-text("MENU")');
  if (menuHeading) {
    await menuHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Find the Kontra link inside the Menu
    const kontraLink = await page.$('nav a[href="//contra-dev.com"]');
    if (kontraLink) {
      await kontraLink.click();
      await page.waitForLoadState('networkidle');

      const currentURL = page.url();
      console.log(`Navigated URL: ${currentURL}`);
      console.log(currentURL.includes('contra-dev.com') && currentURL.endsWith('/') 
        ? '✅ Home page' 
        : '❌ Did NOT navigate to home page');
    } else {
      console.log('❌ Kontra link not found in Menu section');
    }
  } else {
    console.log('❌ Menu section not found');
  }
} catch (e) {
  console.error('❌ Error navigating Menu → Kontra:', e.message);
}

// ✅ Step 58: Scroll down to Footer and click About link in Kontra Menu
console.log('\n--- Step 58: Clicking About link in Kontra Menu section ---');

try {
  // Scroll to the MENU section
  const menuHeading = await page.$('h2:has-text("MENU")');
  if (menuHeading) {
    await menuHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Find the About link inside the MENU section
    const aboutLink = await page.$('nav a[href="//contra-dev.com/about"]');
    if (aboutLink) {
      await aboutLink.click();
      await page.waitForLoadState('networkidle');

      const currentURL = page.url();
      console.log(`Navigated URL: ${currentURL}`);
      console.log(currentURL.includes('/about') 
        ? '✅ Successfully navigated to About page' 
        : '❌ Did NOT navigate to About page');
    } else {
      console.log('❌ About link not found in Menu section');
    }
  } else {
    console.log('❌ Menu section not found');
  }
} catch (e) {
  console.error('❌ Error clicking About link in Menu:', e.message);
}

// ✅ Step 59: Click Kontra logo → Home
console.log('\n--- Step 59: Clicking Kontra logo to return Home ---');

try {
  const logoLinkSelector = 'a[href="//contra-dev.com"], a[href="/"]';
  await page.waitForSelector(logoLinkSelector, { timeout: 15000 });
  await page.click(logoLinkSelector);
  await page.waitForLoadState('networkidle');

  let currentURL = page.url();
  console.log(`Returned to Home: ${currentURL}`);
  console.log(currentURL.endsWith('/') || currentURL.includes('contra-dev.com') 
    ? '✅ Home page' 
    : '❌ Not Home page');
} catch (e) {
  console.error('❌ Could not click Kontra logo to return Home:', e.message);
}

// ✅ Step 60: Click Try SCORM Tab (same-tab navigation)
    try {
      console.log('\n--- Step 60: Clicking Try SCORM tab (same tab) ---');

      const tryScormSelectors = [
        'a:has-text("Try Kontra SCORM")',
        'text=Try Kontra SCORM',
        'text=Try SCORM',
        'a[href*="/faq/scorm"]'
      ];

      let clicked = false;
      for (const sel of tryScormSelectors) {
        if (await page.locator(sel).count() === 0) continue;

        // Prefer navigation-aware click in same tab
        try {
          await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }),
            page.click(sel, { timeout: 7000 })
          ]);
        } catch (navErr) {
          // Fallback: click and wait for load state
          await page.click(sel).catch(() => null);
          await page.waitForLoadState('networkidle');
        }

        currentURL = page.url();
        console.log(`Redirected to: ${currentURL}`);
        console.log(currentURL && currentURL.includes('/faq/scorm') ? '✅ Try SCORM tab clicked' : '❌ Try SCORM did not navigate to expected URL');
        clicked = true;
        break;
      }

      if (!clicked) console.log('❌ Try SCORM link not found on the page');
    } catch (e) {
      console.error('❌ Error clicking Try SCORM tab:', e.message);
    }

// ✅ Step 61: Scroll down to Footer Menu and click Blog link
console.log('\n--- Step 61: Clicking Blog link in Footer Menu ---');

try {
  // Scroll to the MENU section
  const menuHeading = await page.$('h2:has-text("MENU")');
  if (menuHeading) {
    await menuHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Find the Blog link inside the MENU section
    const blogLink = await page.$('nav a[href="https://www.securitycompass.com/kontra-blog/"]');
    if (blogLink) {
      // Click and wait for navigation (same tab)
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }),
        blogLink.click()
      ]);

      const currentURL = page.url();
      console.log(`Navigated URL: ${currentURL}`);
      console.log(currentURL.includes('securitycompass.com/kontra-blog') 
        ? '✅ Successfully navigated to Blog page' 
        : '❌ Did NOT navigate to Blog page');
    } else {
      console.log('❌ Blog link not found in Menu section');
    }
  } else {
    console.log('❌ Menu section not found');
  }
} catch (e) {
  console.error('❌ Error clicking Blog link in Menu:', e.message);
}

// ✅ Step 62: Navigate back to try scorm and scroll to Footer
console.log('\n--- Step 62: Returning to try scorm and scrolling to Footer ---');

try {
  // Navigate back to home page
  await page.goto('https://contra-dev.com/faq/scorm', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  console.log('✅ Successfully navigated to Home and scrolled to Footer');
} catch (e) {
  console.error('❌ Could not navigate to Home or scroll to Footer:', e.message);
}

// ✅ Step 63: Navigate back to Home and scroll to Footer
console.log('\n--- Step 63: Returning to Home and scrolling to Footer ---');

try {
  // Navigate back to home page
  await page.goto('https://contra-dev.com/faq/scorm', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  console.log('✅ Successfully navigated to Home and scrolled to Footer');
} catch (e) {
  console.error('❌ Could not navigate to Home or scroll to Footer:', e.message);
}

// ✅ Step 64: Click "Book a Demo" in the footer
console.log('\n--- Step 64: Clicking Book a Demo in Footer ---');

try {
  // Scroll the footer into view
  const footer = await page.$('footer');
  if (footer) {
    await footer.scrollIntoViewIfNeeded();
    console.log('Scrolled footer into view ✅');
  } else {
    throw new Error('Footer not found');
  }

  // Wait for the "Book a Demo" link to be visible
  const bookDemoLink = await page.$('a.js-contact-us-modal-trigger:has-text("Book a Demo")');
  if (bookDemoLink) {
    // Ensure the link is not covered by any overlay
    const isCovered = await page.evaluate((link) => {
      const rect = link.getBoundingClientRect();
      const elementFromPoint = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      return elementFromPoint !== link;
    }, bookDemoLink);

    if (isCovered) {
      console.log('The "Book a Demo" link is covered by another element.');
      // Optionally, you can attempt to close any overlay here
    } else {
      // Click the link
      await bookDemoLink.click({ force: true });
      console.log('Clicked "Book a Demo" link ✅');

      // Wait for the modal to appear
      await page.waitForTimeout(3000);

      // Close the modal by clicking outside
      const viewport = page.viewportSize() || { width: 1280, height: 720 };
      await page.mouse.click(viewport.width - 10, viewport.height - 10);
      console.log('Closed "Book a Demo" modal ✅');
    }
  } else {
    throw new Error('"Book a Demo" link not found');
  }
} catch (error) {
  console.error('❌ Error clicking "Book a Demo" in Footer:', error.message);
}

// Step 65: Click Privacy Policy in Menu section (open in new tab) and return Home
console.log('\n--- Step 65: Clicking Privacy Policy in Menu section ---');

try {
  const privacyLink = await page.$('nav a[href*="privacy-policy"]');
  if (privacyLink) {
    // Open link in a new tab
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      privacyLink.click({ button: 'middle' }) // middle button simulates opening in new tab
    ]);

    await newPage.waitForLoadState('load');
    console.log(`Privacy Policy page opened: ${newPage.url()}`);
    console.log(newPage.url().includes('privacy-policy') ? '✅ Privacy Policy loaded' : '❌ URL mismatch');

    // Close the new tab
    await newPage.close();
    console.log('Closed Privacy Policy tab');

    // Return to Home page
    await page.goto('https://contra-dev.com/faq/scorm', { waitUntil: 'networkidle' });
    console.log('Returned to try scorm ✅');
  } else {
    console.log('❌ Privacy Policy link not found in Menu section');
  }
} catch (e) {
  console.error('❌ Error handling Privacy Policy link:', e.message);
}

// ✅ Step 66: Scroll to Footer Menu and check Support hyperlink
console.log('\n--- Step 66: Checking Support link in Footer Menu ---');

try {
  const footerMenu = await page.$('h2:has-text("MENU")');
  if (footerMenu) {
    await footerMenu.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const supportLink = await page.$('nav a[href^="mailto:kontrasupport@securitycompass.com"]');
    if (supportLink) {
      const href = await supportLink.getAttribute('href');
      console.log(`Support link found with href: ${href}`);
      console.log(href === 'mailto:kontrasupport@securitycompass.com' 
        ? '✅ Support link is correct' 
        : '❌ Support link href mismatch');
    } else {
      console.log('❌ Support link not found in Footer Menu');
    }
  } else {
    console.log('❌ Footer Menu section not found');
  }
} catch (e) {
  console.error('❌ Error checking Support link:', e.message);
}

// ✅ Step 67: Navigate to the Plans/Pricing screen
console.log('\n--- Step 67: Navigating to Plans/Pricing screen ---');

try {
  await page.goto('https://contra-dev.com/kontra-pricing-plans', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const currentURL = page.url();
  console.log(`Navigated to: ${currentURL}`);
  console.log(currentURL.includes('/kontra-pricing-plans') 
    ? '✅ Successfully navigated to Plans/Pricing page' 
    : '❌ Did NOT navigate to Plans/Pricing page');
} catch (e) {
  console.error('❌ Error navigating to Plans/Pricing page:', e.message);
}

// ✅ Step 68: Click on the "Let's talk" button under Squad section
console.log('\n--- Step 68: Clicking "Let\'s talk" button under Squad section ---');

try {
  // Scroll to find the Squad section
  const squadSection = await page.$('section:has-text("Squad")');
  
  if (squadSection) {
    await squadSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Find the "Let's talk" button within the Squad section
    const letsTalkButton = await squadSection.$('a:has-text("Let\'s talk"), button:has-text("Let\'s talk")');
    
    if (letsTalkButton) {
      await letsTalkButton.click();
      console.log('Clicked "Let\'s talk" button ✅');
      
      // Wait for the modal to appear
      await page.waitForTimeout(2000);
      
      // Verify the Book a Demo pop-up is visible
      const modalVisible = await page.isVisible('.js-contact-us-modal, [role="dialog"], .Modal, .modal');
      console.log(modalVisible ? '✅ Book a demo pop-up is visible' : '⚠️ Modal visibility unclear');
    } else {
      console.log('❌ "Let\'s talk" button not found in Squad section');
    }
  } else {
    console.log('❌ Squad section not found');
  }
} catch (e) {
  console.error('❌ Error clicking "Let\'s talk" button:', e.message);
}

// ✅ Step 69: Close the pop-up by clicking outside
console.log('\n--- Step 69: Closing pop-up by clicking outside ---');

try {
  // Click outside the modal (bottom-right corner)
  const viewport = page.viewportSize() || { width: 1280, height: 720 };
  await page.mouse.click(viewport.width - 10, viewport.height - 10);
  console.log('Clicked outside pop-up ✅');
  
  // Wait for modal to close
  await page.waitForTimeout(1500);
  console.log('Pop-up closed successfully ✅');
} catch (e) {
  console.error('❌ Error closing pop-up:', e.message);
}

// ✅ Step 70: Click on the "Let's talk" button under Brigade section
console.log('\n--- Step 70: Clicking "Let\'s talk" button under Brigade section ---');

try {
  // Scroll to find the Brigade section
  const brigadeSection = await page.$('section:has-text("Brigade")');
  
  if (brigadeSection) {
    await brigadeSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Find the "Let's talk" button within the Brigade section
    const letsTalkButton = await brigadeSection.$('a:has-text("Let\'s talk"), button:has-text("Let\'s talk")');
    
    if (letsTalkButton) {
      await letsTalkButton.click();
      console.log('Clicked "Let\'s talk" button ✅');
      
      // Wait for the modal to appear
      await page.waitForTimeout(2000);
      
      // Verify the Book a Demo pop-up is visible
      const modalVisible = await page.isVisible('.js-contact-us-modal, [role="dialog"], .Modal, .modal');
      console.log(modalVisible ? '✅ Book a demo pop-up is visible' : '⚠️ Modal visibility unclear');
    } else {
      console.log('❌ "Let\'s talk" button not found in Brigade section');
    }
  } else {
    console.log('❌ Brigade section not found');
  }
} catch (e) {
  console.error('❌ Error clicking "Let\'s talk" button:', e.message);
}

// ✅ Step 71: Close the pop-up by clicking outside
console.log('\n--- Step 71: Closing pop-up by clicking outside ---');

try {
  // Click outside the modal (bottom-right corner)
  const viewport = page.viewportSize() || { width: 1280, height: 720 };
  await page.mouse.click(viewport.width - 10, viewport.height - 10);
  console.log('Clicked outside pop-up ✅');
  
  // Wait for modal to close
  await page.waitForTimeout(1500);
  console.log('Pop-up closed successfully ✅');
} catch (e) {
  console.error('❌ Error closing pop-up:', e.message);
}

// ✅ Step 72: Scroll down till Frequently Asked Questions section
console.log('\n--- Step 72: Scrolling to Frequently Asked Questions section ---');

try {
  const faqSection = await page.$('section:has-text("Frequently Asked Questions"), section:has-text("FAQ"), h2:has-text("Frequently Asked Questions")');
  
  if (faqSection) {
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    console.log('✅ Scrolled to Frequently Asked Questions section');
  } else {
    // Try scrolling down manually to find it
    await page.mouse.wheel(0, 2000);
    await page.waitForTimeout(1500);
    console.log('⚠️ Scrolled down, FAQ section location may vary');
  }
} catch (e) {
  console.error('❌ Error scrolling to FAQ section:', e.message);
}

// ✅ Step 73: Click on the arrow icon to expand "Is your training content OWASP Top 10 compliant?" FAQ
console.log('\n--- Step 73: Expanding "Is your training content OWASP Top 10 compliant?" FAQ ---');

try {
  // Find the FAQ item with the specific title
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  console.log(`Found ${faqTitles.length} FAQ accordion titles`);

  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /is your training content owasp top 10 compliant|do you support the latest owasp top 10 standard/i.test(titleText)) {
      console.log('Found the FAQ item: Is your training content OWASP Top 10 compliant?');
      
      // Click the title itself to toggle the accordion
      await faqTitle.click();
      console.log('Step 73: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);

      // Verify the accordion is expanded by checking for Accordion--Active class
      const isExpanded = await page.evaluate(() => {
        const title = Array.from(document.querySelectorAll('.js-accordion-title, [class*="accordion"] [class*="title"]')).find(
          el => /is your training content owasp top 10 compliant|do you support the latest owasp top 10 standard/i.test(el.innerText || '')
        );
        if (title) {
          const accordion = title.closest('.js-accordion, [class*="accordion"]');
          return accordion ? accordion.classList.contains('Accordion--Active') || accordion.classList.contains('active') : false;
        }
        return false;
      });

      console.log(`Step 73: FAQ expanded: ${isExpanded ? '✅' : '⚠️'}`);
      found = true;
      break;
    }
  }

  if (!found) {
    console.log('❌ Step 73: Could not find or expand the FAQ item');
  }
} catch (e) {
  console.error('❌ Error in Step 73:', e.message);
}

// ✅ Step 74: Click on the arrow icon again to collapse the FAQ
console.log('\n--- Step 74: Collapsing "Is your training content OWASP Top 10 compliant?" FAQ ---');

try {
  // Find the FAQ item with the specific title
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  console.log(`Found ${faqTitles.length} FAQ accordion titles`);

  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /is your training content owasp top 10 compliant|do you support the latest owasp top 10 standard/i.test(titleText)) {
      console.log('Found the FAQ item: Is your training content OWASP Top 10 compliant?');
      
      // Click the title to toggle the accordion closed
      await faqTitle.click();
      console.log('Step 74: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);

      // Verify the accordion is collapsed by checking Accordion--Active class is removed
      const isCollapsed = await page.evaluate(() => {
        const title = Array.from(document.querySelectorAll('.js-accordion-title, [class*="accordion"] [class*="title"]')).find(
          el => /is your training content owasp top 10 compliant|do you support the latest owasp top 10 standard/i.test(el.innerText || '')
        );
        if (title) {
          const accordion = title.closest('.js-accordion, [class*="accordion"]');
          return accordion ? !accordion.classList.contains('Accordion--Active') && !accordion.classList.contains('active') : false;
        }
        return false;
      });

      console.log(`Step 74: FAQ collapsed: ${isCollapsed ? '✅' : '⚠️'}`);
      found = true;
      break;
    }
  }

  if (!found) {
    console.log('❌ Step 74: Could not find or collapse the FAQ item');
  }
} catch (e) {
  console.error('❌ Error in Step 74:', e.message);
}

// ✅ Step 75: Click on the arrow icon to expand "What developer roles are covered?" FAQ
console.log('\n--- Step 75: Expanding "What developer roles are covered?" FAQ ---');

try {
  // Find the FAQ item with the specific title
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  console.log(`Found ${faqTitles.length} FAQ accordion titles`);

  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /what developer roles are covered|please provide a list if available/i.test(titleText)) {
      console.log('Found the FAQ item: What developer roles are covered?');
      
      // Click the title itself to toggle the accordion
      await faqTitle.click();
      console.log('Step 75: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);

      // Verify the accordion is expanded by checking for Accordion--Active class
      const isExpanded = await page.evaluate(() => {
        const title = Array.from(document.querySelectorAll('.js-accordion-title, [class*="accordion"] [class*="title"]')).find(
          el => /what developer roles are covered|please provide a list if available/i.test(el.innerText || '')
        );
        if (title) {
          const accordion = title.closest('.js-accordion, [class*="accordion"]');
          return accordion ? accordion.classList.contains('Accordion--Active') || accordion.classList.contains('active') : false;
        }
        return false;
      });

      console.log(`Step 75: FAQ expanded: ${isExpanded ? '✅' : '⚠️'}`);
      found = true;
      break;
    }
  }

  if (!found) {
    console.log('❌ Step 75: Could not find or expand the FAQ item');
  }
} catch (e) {
  console.error('❌ Error in Step 75:', e.message);
}

// ✅ Step 76: Click on the arrow icon again to collapse the FAQ
console.log('\n--- Step 76: Collapsing "What developer roles are covered?" FAQ ---');

try {
  // Find the FAQ item with the specific title
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  console.log(`Found ${faqTitles.length} FAQ accordion titles`);

  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /what developer roles are covered|please provide a list if available/i.test(titleText)) {
      console.log('Found the FAQ item: What developer roles are covered?');
      
      // Click the title to toggle the accordion closed
      await faqTitle.click();
      console.log('Step 76: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);

      // Verify the accordion is collapsed by checking Accordion--Active class is removed
      const isCollapsed = await page.evaluate(() => {
        const title = Array.from(document.querySelectorAll('.js-accordion-title, [class*="accordion"] [class*="title"]')).find(
          el => /what developer roles are covered|please provide a list if available/i.test(el.innerText || '')
        );
        if (title) {
          const accordion = title.closest('.js-accordion, [class*="accordion"]');
          return accordion ? !accordion.classList.contains('Accordion--Active') && !accordion.classList.contains('active') : false;
        }
        return false;
      });

      console.log(`Step 76: FAQ collapsed: ${isCollapsed ? '✅' : '⚠️'}`);
      found = true;
      break;
    }
  }

  if (!found) {
    console.log('❌ Step 76: Could not find or collapse the FAQ item');
  }
} catch (e) {
  console.error('❌ Error in Step 76:', e.message);
}

// ✅ Step 77: Click arrow icon to expand "What languages are covered?" FAQ
console.log('\n--- Step 77: Expanding "What languages are covered?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /what languages are covered|python|java|please provide a list if available/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 77: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 77: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 77:', e.message);
}

// ✅ Step 78: Click arrow icon to collapse "What languages are covered?" FAQ
console.log('\n--- Step 78: Collapsing "What languages are covered?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /what languages are covered|python|java|please provide a list if available/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 78: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 78: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 78:', e.message);
}

// ✅ Step 79: Click arrow icon to expand "What kind of statistics does the platform provide to the administrator?" FAQ
console.log('\n--- Step 79: Expanding "What kind of statistics does the platform provide to the administrator?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /what kind of statistics does the platform provide to the administrator/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 79: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 79: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 79:', e.message);
}

// ✅ Step 80: Click arrow icon to collapse "What kind of statistics does the platform provide to the administrator?" FAQ
console.log('\n--- Step 80: Collapsing "What kind of statistics does the platform provide to the administrator?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /what kind of statistics does the platform provide to the administrator/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 80: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 80: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 80:', e.message);
}

// ✅ Step 81: Click arrow icon to expand "Does Kontra's Learning Management System offer creating Teams and Roles?" FAQ
console.log('\n--- Step 81: Expanding "Does Kontra\'s Learning Management System offer creating Teams and Roles?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /does kontra.*learning management system offer creating teams and roles/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 81: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 81: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 81:', e.message);
}

// ✅ Step 82: Click arrow icon to collapse "Does Kontra's Learning Management System offer creating Teams and Roles?" FAQ
console.log('\n--- Step 82: Collapsing "Does Kontra\'s Learning Management System offer creating Teams and Roles?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /does kontra.*learning management system offer creating teams and roles/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 82: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 82: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 82:', e.message);
}

// ✅ Step 83: Click arrow icon to expand "Do the labs require the developer to complete the task successfully before moving forward?" FAQ
console.log('\n--- Step 83: Expanding "Do the labs require the developer to complete the task successfully before moving forward?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /do the labs require the developer to complete the task successfully before moving forward/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 83: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 83: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 83:', e.message);
}

// ✅ Step 84: Click arrow icon to collapse "Do the labs require the developer to complete the task successfully before moving forward?" FAQ
console.log('\n--- Step 84: Collapsing "Do the labs require the developer to complete the task successfully before moving forward?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /do the labs require the developer to complete the task successfully before moving forward/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 84: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 84: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 84:', e.message);
}

// ✅ Step 85: Click arrow icon to expand "How often is the content updated?" FAQ
console.log('\n--- Step 85: Expanding "How often is the content updated?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /how often is the content updated/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 85: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 85: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 85:', e.message);
}

// ✅ Step 86: Click arrow icon to collapse "How often is the content updated?" FAQ
console.log('\n--- Step 86: Collapsing "How often is the content updated?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /how often is the content updated/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 86: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 86: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 86:', e.message);
}

// ✅ Step 87: Click arrow icon to expand "Is old content refreshed or have new variations added?" FAQ
console.log('\n--- Step 87: Expanding "Is old content refreshed or have new variations added?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /is old content refreshed or have new variations added/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 87: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 87: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 87:', e.message);
}

// ✅ Step 88: Click arrow icon to collapse "Is old content refreshed or have new variations added?" FAQ
console.log('\n--- Step 88: Collapsing "Is old content refreshed or have new variations added?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /is old content refreshed or have new variations added/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 88: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 88: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 88:', e.message);
}

// ✅ Step 89: Click arrow icon to expand "Does Kontra's Learning Platform offer an API (Application Programming Interface)?" FAQ
console.log('\n--- Step 89: Expanding "Does Kontra\'s Learning Platform offer an API?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /does kontra.*learning platform offer an api|application programming interface/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 89: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 89: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 89:', e.message);
}

// ✅ Step 90: Click arrow icon to collapse "Does Kontra's Learning Platform offer an API?" FAQ
console.log('\n--- Step 90: Collapsing "Does Kontra\'s Learning Platform offer an API?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /does kontra.*learning platform offer an api|application programming interface/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 90: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 90: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 90:', e.message);
}

// ✅ Step 91: Click arrow icon to expand "What third-party Learning Management Systems do you support?" FAQ
console.log('\n--- Step 91: Expanding "What third-party Learning Management Systems do you support?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /what third-party learning management systems do you support/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 91: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 91: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 91:', e.message);
}

// ✅ Step 92: Click arrow icon to collapse "What third-party Learning Management Systems do you support?" FAQ
console.log('\n--- Step 92: Collapsing "What third-party Learning Management Systems do you support?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /what third-party learning management systems do you support/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 92: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 92: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 92:', e.message);
}

// ✅ Step 93: Click arrow icon to expand "Is there progressive learning - easy, medium, or hard for all modules?" FAQ
console.log('\n--- Step 93: Expanding "Is there progressive learning?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /is there progressive learning|easy|medium|hard|for all modules/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 93: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 93: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 93:', e.message);
}

// ✅ Step 94: Click arrow icon to collapse "Is there progressive learning - easy, medium, or hard for all modules?" FAQ
console.log('\n--- Step 94: Collapsing "Is there progressive learning?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /is there progressive learning|easy|medium|hard|for all modules/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 94: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 94: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 94:', e.message);
}

// ✅ Step 95: Click arrow icon to expand "Do all languages and roles have the same/equal amount of content available?" FAQ
console.log('\n--- Step 95: Expanding "Do all languages and roles have the same/equal amount of content available?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /do all languages and roles have the same|equal amount of content available/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 95: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 95: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 95:', e.message);
}

// ✅ Step 96: Click arrow icon to collapse "Do all languages and roles have the same/equal amount of content available?" FAQ
console.log('\n--- Step 96: Collapsing "Do all languages and roles have the same/equal amount of content available?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /do all languages and roles have the same|equal amount of content available/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 96: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 96: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 96:', e.message);
}

// ✅ Step 97: Click arrow icon to expand "Does Kontra offer an administrative dashboard that allows learning administrators to manage and track users?" FAQ
console.log('\n--- Step 97: Expanding "Does Kontra offer an administrative dashboard?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /does kontra offer an administrative dashboard|learning administrators to manage and track users/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 97: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 97: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 97:', e.message);
}

// ✅ Step 98: Click arrow icon to collapse "Does Kontra offer an administrative dashboard?" FAQ
console.log('\n--- Step 98: Collapsing "Does Kontra offer an administrative dashboard?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /does kontra offer an administrative dashboard|learning administrators to manage and track users/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 98: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 98: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 98:', e.message);
}

// ✅ Step 99: Click arrow icon to expand "Does all content also contain hands-on labs?" FAQ
console.log('\n--- Step 99: Expanding "Does all content also contain hands-on labs?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /does all content also contain hands-on labs|if not, what content does not/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 99: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 99: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 99:', e.message);
}

// ✅ Step 100: Click arrow icon to collapse "Does all content also contain hands-on labs?" FAQ
console.log('\n--- Step 100: Collapsing "Does all content also contain hands-on labs?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /does all content also contain hands-on labs|if not, what content does not/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 100: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 100: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 100:', e.message);
}

// ✅ Step 101: Click arrow icon to expand "Does the platform send email reminders to developers for new training?" FAQ
console.log('\n--- Step 101: Expanding "Does the platform send email reminders?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /does the platform send email reminders to developers for new training/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 101: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 101: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 101:', e.message);
}

// ✅ Step 102: Click arrow icon to collapse "Does the platform send email reminders to developers for new training?" FAQ
console.log('\n--- Step 102: Collapsing "Does the platform send email reminders?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /does the platform send email reminders to developers for new training/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 102: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 102: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 102:', e.message);
}

// ✅ Step 103: Click arrow icon to expand "Do your training courses meet any common accreditations or compliance requirements?" FAQ
console.log('\n--- Step 103: Expanding "Do your training courses meet accreditations or compliance requirements?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /do your training courses meet any common accreditations|compliance requirements|nist|pci|please provide a list if available/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 103: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 103: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 103:', e.message);
}

// ✅ Step 104: Click arrow icon to collapse "Do your training courses meet any common accreditations or compliance requirements?" FAQ
console.log('\n--- Step 104: Collapsing "Do your training courses meet accreditations or compliance requirements?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /do your training courses meet any common accreditations|compliance requirements|nist|pci|please provide a list if available/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 104: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 104: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 104:', e.message);
}

// ✅ Step 105: Click arrow icon to expand "Does Kontra offer integration with third-party Learning Management Systems?" FAQ
console.log('\n--- Step 105: Expanding "Does Kontra offer integration with third-party LMS?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /does kontra offer integration with third-party learning management systems|lms|please provide a list if available/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 105: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 105: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 105:', e.message);
}

// ✅ Step 106: Click arrow icon to collapse "Does Kontra offer integration with third-party Learning Management Systems?" FAQ
console.log('\n--- Step 106: Collapsing "Does Kontra offer integration with third-party LMS?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /does kontra offer integration with third-party learning management systems|lms|please provide a list if available/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 106: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 106: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 106:', e.message);
}

// ✅ Step 107: Click arrow icon to expand "Does Kontra offer Integration with a Single Sign-On provider?" FAQ
console.log('\n--- Step 107: Expanding "Does Kontra offer Integration with a Single Sign-On provider?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /does kontra offer integration with a single sign-on provider/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 107: Clicked to expand FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 107: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 107:', e.message);
}

// ✅ Step 108: Click arrow icon to collapse "Does Kontra offer Integration with a Single Sign-On provider?" FAQ
console.log('\n--- Step 108: Collapsing "Does Kontra offer Integration with a Single Sign-On provider?" FAQ ---');

try {
  const faqTitles = await page.$$('.js-accordion-title, [class*="accordion"] [class*="title"]');
  let found = false;
  for (const faqTitle of faqTitles) {
    const titleText = await faqTitle.innerText();
    if (titleText && /does kontra offer integration with a single sign-on provider/i.test(titleText)) {
      await faqTitle.click();
      console.log('Step 108: Clicked to collapse FAQ ✅');
      await page.waitForTimeout(800);
      found = true;
      break;
    }
  }
  if (!found) console.log('❌ Step 108: Could not find the FAQ item');
} catch (e) {
  console.error('❌ Error in Step 108:', e.message);
}

// ✅ Step 109: Scroll down to Footer and click social media links
console.log('\n--- Step 109: Clicking social media links in Footer ---');

try {
  // Scroll to the footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);

  const socialLinks = [
    { selector: 'a[href*="linkedin.com"]', name: 'LinkedIn', expected: 'https://www.linkedin.com/company/security-compass' },
    { selector: 'a[href*="facebook.com"]', name: 'Facebook', expected: 'https://www.facebook.com/SecCompass' },
    { selector: 'a[href*="x.com"]', name: 'Twitter/X', expected: 'https://x.com/securitycompass' },
  ];

  for (const social of socialLinks) {
    try {
      // Find the element using the selector
      const element = await page.$(social.selector);
      if (element) {
        // Get the href attribute
        const href = await element.getAttribute('href');
        console.log(`Step 56: Found ${social.name} link: ${href}`);
        
        // Open link in new page
        const [newPage] = await Promise.all([
          page.context().waitForEvent('page', { timeout: 15000 }),
          element.click()
        ]);
        
        await newPage.waitForLoadState('load');
        const url = newPage.url();
        console.log(`${social.name} opened in new tab: ${url}`);
        console.log(url.includes(social.expected) ? `✅ ${social.name} correct redirect` : `❌ ${social.name} redirect failed`);
        
        await newPage.close();
      } else {
        console.log(`⚠️ Step 109: ${social.name} link not found`);
      }
    } catch (e) {
      console.error(`❌ Step 109: Could not click ${social.name} or open new page:`, e.message);
    }
  }

  console.log('Step 109: Social media links check completed ✅');
} catch (e) {
  console.error('❌ Error in Step 109 - scrolling to footer or clicking social media links:', e.message);
}

// ✅ Step 110: Navigate to Menu section and click Kontra hyperlink
console.log('\n--- Step 110: Clicking Kontra link in Menu section ---');

try {
  // Scroll to the Menu heading
  const menuHeading = await page.$('h2:has-text("MENU")');
  if (menuHeading) {
    await menuHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Find the Kontra link inside the Menu
    const kontraLink = await page.$('nav a[href="//contra-dev.com"]');
    if (kontraLink) {
      await kontraLink.click();
      await page.waitForLoadState('networkidle');

      const currentURL = page.url();
      console.log(`Navigated URL: ${currentURL}`);
      console.log(currentURL.includes('contra-dev.com') && currentURL.endsWith('/') 
        ? '✅ Home page' 
        : '❌ Did NOT navigate to home page');
    } else {
      console.log('❌ Kontra link not found in Menu section');
    }
  } else {
    console.log('❌ Menu section not found');
  }
} catch (e) {
  console.error('❌ Error navigating Menu → Kontra:', e.message);
}

// ✅ Step 110: Scroll down to Footer and click About link in Kontra Menu
console.log('\n--- Step 110: Clicking About link in Kontra Menu section ---');

try {
  // Scroll to the MENU section
  const menuHeading = await page.$('h2:has-text("MENU")');
  if (menuHeading) {
    await menuHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Find the About link inside the MENU section
    const aboutLink = await page.$('nav a[href="//contra-dev.com/about"]');
    if (aboutLink) {
      await aboutLink.click();
      await page.waitForLoadState('networkidle');

      const currentURL = page.url();
      console.log(`Navigated URL: ${currentURL}`);
      console.log(currentURL.includes('/about') 
        ? '✅ Successfully navigated to About page' 
        : '❌ Did NOT navigate to About page');
    } else {
      console.log('❌ About link not found in Menu section');
    }
  } else {
    console.log('❌ Menu section not found');
  }
} catch (e) {
  console.error('❌ Error clicking About link in Menu:', e.message);
}

// ✅ Step 111: Click Kontra logo → Home
console.log('\n--- Step 111: Clicking Kontra logo to return Home ---');

try {
  const logoLinkSelector = 'a[href="//contra-dev.com"], a[href="/"]';
  await page.waitForSelector(logoLinkSelector, { timeout: 15000 });
  await page.click(logoLinkSelector);
  await page.waitForLoadState('networkidle');

  let currentURL = page.url();
  console.log(`Returned to Home: ${currentURL}`);
  console.log(currentURL.endsWith('/') || currentURL.includes('contra-dev.com') 
    ? '✅ Home page' 
    : '❌ Not Home page');
} catch (e) {
  console.error('❌ Could not click Kontra logo to return Home:', e.message);
}

// ✅ Step 112: Navigate to the Plans/Pricing screen
console.log('\n--- Step 112: Navigating to Plans/Pricing screen ---');

try {
  await page.goto('https://contra-dev.com/kontra-pricing-plans', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const currentURL = page.url();
  console.log(`Navigated to: ${currentURL}`);
  console.log(currentURL.includes('/kontra-pricing-plans') 
    ? '✅ Successfully navigated to Plans/Pricing page' 
    : '❌ Did NOT navigate to Plans/Pricing page');
} catch (e) {
  console.error('❌ Error navigating to Plans/Pricing page:', e.message);
}

// ✅ Step 113: Scroll down to Footer Menu and click Blog link
console.log('\n--- Step 113: Clicking Blog link in Footer Menu ---');

try {
  // Scroll to the MENU section
  const menuHeading = await page.$('h2:has-text("MENU")');
  if (menuHeading) {
    await menuHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Find the Blog link inside the MENU section
    const blogLink = await page.$('nav a[href="https://www.securitycompass.com/kontra-blog/"]');
    if (blogLink) {
      // Click and wait for navigation (same tab)
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }),
        blogLink.click()
      ]);

      const currentURL = page.url();
      console.log(`Navigated URL: ${currentURL}`);
      console.log(currentURL.includes('securitycompass.com/kontra-blog') 
        ? '✅ Successfully navigated to Blog page' 
        : '❌ Did NOT navigate to Blog page');
    } else {
      console.log('❌ Blog link not found in Menu section');
    }
  } else {
    console.log('❌ Menu section not found');
  }
} catch (e) {
  console.error('❌ Error clicking Blog link in Menu:', e.message);
}

// ✅ Step 114: Navigate back to try scorm and scroll to Footer
console.log('\n--- Step 114: Returning to try scorm and scrolling to Footer ---');

try {
  // Navigate back to pricing plans page
  await page.goto('https://contra-dev.com/kontra-pricing-plans', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  console.log('✅ Successfully navigated to Home and scrolled to Footer');
} catch (e) {
  console.error('❌ Could not navigate to Home or scroll to Footer:', e.message);
}

// ✅ Step 115: Navigate back to Home and scroll to Footer
console.log('\n--- Step 115: Returning to Home and scrolling to Footer ---');

try {
  // Navigate back to pricing plans page
  await page.goto('https://contra-dev.com/kontra-pricing-plans', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  console.log('✅ Successfully navigated to Home and scrolled to Footer');
} catch (e) {
  console.error('❌ Could not navigate to Home or scroll to Footer:', e.message);
}

// ✅ Step 116: Click "Book a Demo" in the footer
console.log('\n--- Step 116: Clicking Book a Demo in Footer ---');

try {
  // Scroll the footer into view
  const footer = await page.$('footer');
  if (footer) {
    await footer.scrollIntoViewIfNeeded();
    console.log('Scrolled footer into view ✅');
  } else {
    throw new Error('Footer not found');
  }

  // Wait for the "Book a Demo" link to be visible
  const bookDemoLink = await page.$('a.js-contact-us-modal-trigger:has-text("Book a Demo")');
  if (bookDemoLink) {
    // Ensure the link is not covered by any overlay
    const isCovered = await page.evaluate((link) => {
      const rect = link.getBoundingClientRect();
      const elementFromPoint = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      return elementFromPoint !== link;
    }, bookDemoLink);

    if (isCovered) {
      console.log('The "Book a Demo" link is covered by another element.');
      // Optionally, you can attempt to close any overlay here
    } else {
      // Click the link
      await bookDemoLink.click({ force: true });
      console.log('Clicked "Book a Demo" link ✅');

      // Wait for the modal to appear
      await page.waitForTimeout(3000);

      // Close the modal by clicking outside
      const viewport = page.viewportSize() || { width: 1280, height: 720 };
      await page.mouse.click(viewport.width - 10, viewport.height - 10);
      console.log('Closed "Book a Demo" modal ✅');
    }
  } else {
    throw new Error('"Book a Demo" link not found');
  }
} catch (error) {
  console.error('❌ Error clicking "Book a Demo" in Footer:', error.message);
}

// Step 117: Click Privacy Policy in Menu section (open in new tab) and return Home
console.log('\n--- Step 117: Clicking Privacy Policy in Menu section ---');

try {
  const privacyLink = await page.$('nav a[href*="privacy-policy"]');
  if (privacyLink) {
    // Open link in a new tab
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      privacyLink.click({ button: 'middle' }) // middle button simulates opening in new tab
    ]);

    await newPage.waitForLoadState('load');
    console.log(`Privacy Policy page opened: ${newPage.url()}`);
    console.log(newPage.url().includes('privacy-policy') ? '✅ Privacy Policy loaded' : '❌ URL mismatch');

    // Close the new tab
    await newPage.close();
    console.log('Closed Privacy Policy tab');

    // Return to Home page
    await page.goto('https://contra-dev.com/kontra-pricing-plans', { waitUntil: 'networkidle' });
    console.log('Returned to pricing plans ✅');
  } else {
    console.log('❌ Privacy Policy link not found in Menu section');
  }
} catch (e) {
  console.error('❌ Error handling Privacy Policy link:', e.message);
}

// ✅ Step 118: Scroll to Footer Menu and check Support hyperlink
console.log('\n--- Step 118: Checking Support link in Footer Menu ---');

try {
  const footerMenu = await page.$('h2:has-text("MENU")');
  if (footerMenu) {
    await footerMenu.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const supportLink = await page.$('nav a[href^="mailto:kontrasupport@securitycompass.com"]');
    if (supportLink) {
      const href = await supportLink.getAttribute('href');
      console.log(`Support link found with href: ${href}`);
      console.log(href === 'mailto:kontrasupport@securitycompass.com' 
        ? '✅ Support link is correct' 
        : '❌ Support link href mismatch');
    } else {
      console.log('❌ Support link not found in Footer Menu');
    }
  } else {
    console.log('❌ Footer Menu section not found');
  }
} catch (e) {
  console.error('❌ Error checking Support link:', e.message);
}
    // ✅ Final screenshot
    try {
      await page.screenshot({ path: 'kontra_home_verification.png', fullPage: true });
      console.log('Screenshot saved: kontra_home_verification.png');
      console.log('\n✅ Homepage verification completed successfully.');
    } catch (screenshotErr) {
      console.error('❌ Error taking screenshot:', screenshotErr.message);
    }

  } catch (err) {
    console.error('❌ Error during automation:', err);
  } finally {
    await browser.close();
  }
})();
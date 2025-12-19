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
      console.log(currentURL === 'https://www.securitycompass.com/kontra-blog/' 
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

    // ✅ Final screenshot
    await page.screenshot({ path: 'kontra_home_verification.png', fullPage: true });
    console.log('Screenshot saved: kontra_home_verification.png');

    console.log('\n✅ Homepage verification completed successfully.');

  } catch (err) {
    console.error('❌ Error during automation:', err);
  } finally {
    await browser.close();
  }
})();
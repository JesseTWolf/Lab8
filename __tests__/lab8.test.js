describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”

    // Clicks the first journal-entry object.
    await page.click('journal-entry');

    // Checks to make sure '#entry1' is found within the URL.
    expect(page.url()).toMatch(/#entry1/);
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 

    const header = await page.$('header > h1');
    const headerProperty = await header.getProperty('innerHTML');
    const title = await headerProperty.jsonValue();
    expect(title).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */

    const entryPage = await page.$('entry-page');
    const entry = await entryPage.getProperty('entry');
    const entryText = await entry.jsonValue();
    expect(entryText.title).toBe('You like jazz?');
    expect(entryText.date).toBe('4/25/2021');
    expect(entryText.content).toBe("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
    expect(entryText.image.src).toBe('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455');
    expect(entryText.image.alt).toBe('bee with sunglasses');

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’

    const body = await page.$('body');
    const bodyProperty = await body.getProperty('classList');
    const classList = await bodyProperty.jsonValue();
    expect(classList['0']).toBe('single-entry');

  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”

    // Clicks the first journal-entry object.
    await page.click('header > img[alt="settings"]');

    // Checks to make sure '#entry1' is found within the URL.
    expect(page.url()).toMatch(/#settings/);

  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”

    const header = await page.$('header > h1');
    const headerProperty = await header.getProperty('innerHTML');
    const title = await headerProperty.jsonValue();
    expect(title).toBe('Settings');

  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’

    const body = await page.$('body');
    const bodyProperty = await body.getProperty('classList');
    const classList = await bodyProperty.jsonValue();
    expect(classList['0']).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’

    await page.goBack();
    expect(page.url()).toMatch(/#entry1/);
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {

    await page.goBack();

    expect(page.url()).toBe('http://127.0.0.1:5500/');
  });

  // define and implement test12: When the user is on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user is on the homepage, the header title should be “Journal Entries”', async() => {
    const header = await page.$('header > h1');
    const headerProperty = await header.getProperty('innerHTML');
    const title = await headerProperty.jsonValue();
    expect(title).toBe('Journal Entries');
  });


  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute', async() => {
    const body = await page.$('body');
    const bodyProperty = await body.getProperty('classList');
    const classList = await bodyProperty.jsonValue();
    expect(classList).toBeUndefined;
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async() => {
    await page.$$eval('journal-entry', (entries) => entries[1].click());

    expect(page.url()).toMatch(/#entry2/);
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async() => {
    const header = await page.$('header > h1');
    const headerProperty = await header.getProperty('innerHTML');
    const title = await headerProperty.jsonValue();
    expect(title).toBe('Entry 2');
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async() => {
    const entryPage = await page.$('entry-page');
    const entry = await entryPage.getProperty('entry');
    const entryText = await entry.jsonValue();
    expect(entryText.title).toBe('Run, Forrest! Run!');
    expect(entryText.date).toBe('4/26/2021');
    expect(entryText.content).toBe("Mama always said life was like a box of chocolates. You never know what you're gonna get.");
    expect(entryText.image.src).toBe('https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg');
    expect(entryText.image.alt).toBe('forrest running');
  });

  // create your own test 17
  it('Test17: Verify the url is correct when clicking on the tenth entry', async() => {
    await page.$$eval('journal-entry', (entries) => entries[9].click());

    expect(page.url()).toMatch(/#entry10/);
  });

  // create your own test 18
  it('Test18: Verify the entry page contents is correct when clicking on the tenth entry, especially the audio', async() => {
    const entryPage = await page.$('entry-page');
    const entry = await entryPage.getProperty('entry');
    const entryText = await entry.jsonValue();
    expect(entryText.title).toBe('No, I am your father');
    expect(entryText.date).toBe('5/4/2021');
    expect(entryText.content).toBe("A long time ago, in a galaxy far, far away... It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the Death Star, an armored space station with enough power to destroy an entire planet. Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....");
    expect(entryText.image.src).toBe('https://starwarsblog.starwars.com/wp-content/uploads/2021/04/star-wars-may-the-4th-2021-TALL-3973202.jpg');
    expect(entryText.image.alt).toBe('may the fourth be with you');
    expect(entryText.audio).toBe('https://drive.google.com/uc?export=download&id=1luYh909US7ZBFe6uo440Vv_LNnRdnErT');
  });

  // create your own test 19
  it('Test19: Clicking the back button once should take the user back to Entry2', async() => {
    await page.goBack();

    expect(page.url()).toMatch(/#entry2/);
  });

  // create your own test 20
  it('Test20: Clicking the forward button one should take the user back to Entry10', async() => {
    await page.goForward();

    expect(page.url()).toMatch(/#entry10/);
  });
  
});

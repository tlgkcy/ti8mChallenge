export function scrollToIframe() {
  cy.get("#iframe-95ea780f-cbb9-41f2-b696-d19662d011a4").scrollIntoView();
}

export function acceptCookiesIfPresent() {
  cy.get("#onetrust-group-container")
    .should("exist")
    .should("be.visible")
    .then(() => {
      cy.get("#onetrust-reject-all-handler").click();
    });
}

export function goToCareerPage() {
  cy.intercept({
    method: "POST",
    url: "?lang=de",
    hostname: "career.ti8m.com",
  }).as("iFrameRequest");
  cy.visit("https://www.ti8m.com/de/career");
  cy.viewport(1920, 1080);
}

export function assertNavigationIsVisibleAndContainsLink() {
  cy.get(".nav__logo").should("exist");
  cy.get('button[data-path="/ti8m-ch/services"]').should(
    "contain.text",
    "Services"
  );

  cy.get('button[data-path="/ti8m-ch/products"]').should(
    "contain.text",
    "Produkte"
  );

  cy.get('button[data-path="/ti8m-ch/success-stories"]').should(
    "contain.text",
    "Erfolgsgeschichten"
  );

  cy.get('button[data-path="/ti8m-ch/about-us"]').should(
    "contain.text",
    "Über uns"
  );

  cy.get('button[data-path="/ti8m-ch/career"]').should(
    "contain.text",
    "Karriere"
  );

  cy.get('button[data-path="/ti8m-ch/insights"]').should(
    "contain.text",
    "Insights"
  );

  cy.get(".nav__search-button").should("exist");
}

export function checkLinksToJobListingTiles() {
  const expectedLinks: string[] = [
    "/de/career/engineering",
    "/de/career/cloud",
    "/de/career/security",
    "/de/career/consulting",
    "/de/career/sales",
    "/de/career/design",
    "/de/career/corporate-center",
    "/de/career/next-generation",
    "/de/career/fringe-benefits",
  ];

  // Use cy.get() to select all <a> elements
  cy.get(".cards-container a").each(($link, index) => {
    // Check if each link has an 'href' attribute
    expect($link).to.have.attr("href");

    // Get the 'href' attribute of the link
    const actualLink = $link.attr("href");

    // Check if the actual link matches the expected link
    expect(actualLink).to.equal(expectedLinks[index]);
    //
  });
}

export function benefitsToExpectAtTi8m() {
  const expectedTitles = [
    "Weiterbildung mit unserer ti&m academy",
    "Mit Liquid Working zur Work-Life-Balance",
    "Flache Hierarchien und offene Firmenkultur",
    "Ausgefallene Events zum Ausgleich und Spass",
    "Herausforderungen finden und Verantwortung übernehmen",
    /* Add more titles as needed */
  ];

  // Get all elements with the class scrolling-content-teaser__element
  cy.get(".scrolling-content-teaser__element").each(($element, index) => {
    // Within each element, find the h3 element for the title
    const title = $element.find("h3.scrolling-content-teaser__element-title");

    // Assert that the title element exists
    cy.wrap(title).should("exist");

    // Assert that the title element contains the correct text
    cy.wrap(title).should("have.text", expectedTitles[index]);
  });
}

export function checkValuesOfTi8M() {
  cy.get(".cards-container .text-card .text-card__title").each(($title) => {
    cy.wrap($title).should("exist"); // Check if the title element exists
    cy.wrap($title)
      .invoke("text")
      .should(
        "match",
        /Talent|Mut zur Innovation|Leidenschaft|Nachhaltiges Wachstum|Respekt & Toleranz|Swissness/
      );
  });
}

import "cypress-iframe";
import {
  acceptCookiesIfPresent,
  assertNavigationIsVisibleAndContainsLink,
  benefitsToExpectAtTi8m,
  checkLinksToJobListingTiles,
  checkValuesOfTi8M,
  goToCareerPage,
  scrollToIframe,
} from "../implementation/navigation";
import { getIframeContent } from "../implementation/iFrame";
import { jobRequest } from "../implementation/requests/job";

describe("ti8m career page", () => {
  beforeEach(() => {
    goToCareerPage();
    acceptCookiesIfPresent();
    scrollToIframe();
  });
  it("verify UI Navigation elements", () => {
    assertNavigationIsVisibleAndContainsLink();
    cy.get("#cards-container-00 > .container > .d-flex");

    checkLinksToJobListingTiles();

    cy.get(".ti8m-iframe").should("exist");

    benefitsToExpectAtTi8m();

    checkValuesOfTi8M();

    cy.get("#contact-form").should("exist");
    cy.get("#footer").should("exist");
  });

  it("search for network job", () => {
    scrollToIframe();
    getIframeContent().find("#search").type("Network");
  });

  it("filter for jobs in Zürich and check if list has changed", () => {
    scrollToIframe();
    getIframeContent().then((content) => {
      const careerCenterForm = content.find("#careercenter-form");
      cy.wrap(careerCenterForm).within(() => {
        cy.get("#1301743").click();
        cy.wait("@iFrameRequest").its("response.statusCode").should("eq", 200);
      });
    });

    getIframeContent().then((iframe) => {
      const locations = iframe.contents().find("#jobs > div > div.location");
      cy.wrap(locations).as("jobLocations");
      cy.get("@jobLocations").each((jobLocation) => {
        expect(jobLocation.text().trim()).to.eq("Zürich");
      });
    });
  });
});

describe("Search for job via post call", () => {
  it("make post call for network job using form data", () => {
    const formData = {
      offset: 0,
      limit: 200,
      lang: "de",
      query: "network",
    };
    const queryParams = {
      lang: "de",
      query: "network",
    };
    jobRequest(queryParams, formData);
  });
});

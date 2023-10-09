const IFRAME_SELECTOR = "#iframe-95ea780f-cbb9-41f2-b696-d19662d011a4";

export function getIframeContent() {
  // cypress- iframe plugin
  return cy.frameLoaded(IFRAME_SELECTOR).then((iframe) => {
    return iframe.contents();
  });
}

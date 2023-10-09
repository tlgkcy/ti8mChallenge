import { FormData, QueryParams } from "../types";

export function jobRequest(queryParams: QueryParams, formData: FormData) {
  cy.request({
    method: "POST",
    url: `https://career.ti8m.com/?lang=de`,
    form: true,
    qs: queryParams,
    body: formData,
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
}

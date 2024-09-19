/// <reference types="cypress" />

describe("New Flashcard Form", () => {
  beforeEach(() => {
    cy.visit("http://10.0.4.57:9000/");
  });

  it("Add a flashcard", () => {
    cy.get("[data-testid='add-flashcard']").click();
    cy.get("[data-testid='add-flashcard-question']").type(
      "Is this an Example question?"
    );
    cy.get("[data-testid='add-flashcard-answer']").type("yes");
    cy.get("[data-testid='save-new-flashcard']").click();
    cy.get("[data-testid='flashcard-0']").should("exist");
  });

  it("Add flashcard with empty question", () => {
    cy.get("[data-testid='add-flashcard']").click();
    cy.get("[data-testid='add-flashcard-answer']").type("answer");
    cy.get("[data-testid='save-new-flashcard']").click();
    cy.get("[data-testid='flashcard-form']").should("exist");
  });

  it("Add flashcard with only white space as answer", () => {
    cy.get("[data-testid='add-flashcard']").click();
    cy.get("[data-testid='add-flashcard-question']").type("question");
    cy.get("[data-testid='add-flashcard-answer']").type("     ");
    cy.get("[data-testid='save-new-flashcard']").click();
    cy.get("[data-testid='flashcard-form']").should("exist");
  });

  it("Cancel Flashcard form", () => {
    cy.get("[data-testid='add-flashcard']").click();
    cy.get("[data-testid='add-flashcard-question']").type("question");
    cy.get("[data-testid='add-flashcard-answer']").type("     ");
    cy.get("[data-testid='cancel-new-flashcard']").click();
    cy.get("[data-testid='flashcard-form']").should("not.exist");
  });
});

describe("Edit Flashcard", () => {
  beforeEach(() => {
    cy.visit("http://10.0.4.57:9000/");
    cy.get("[data-testid='add-flashcard']").click();
    cy.get("[data-testid='add-flashcard-question']").type(
      "This is a question!"
    );
    cy.get("[data-testid='add-flashcard-answer']").type("false");
    cy.get("[data-testid='save-new-flashcard']").click();
  });

  it("Edit existing Flashcard question and answer", () => {
    cy.get("[data-testid='flashcard-0']")
      .find("[data-testid='edit-flashcard']")
      .click();
    cy.get("[data-testid='edit-flashcard-question']")
      .clear()
      .type("Is this a question?");
    cy.get("[data-testid='edit-flashcard-answer']").clear().type("true");
    cy.get("[data-testid='save-edited-flashcard']").click();
    cy.get("[data-testid='flashcard-0']")
      .contains("Is this a question?")
      .should("exist");
    cy.get("[data-testid='flashcard-0']")
      .find("[data-testid='toggle-flashcard-answer']")
      .click();
    cy.get("[data-testid='flashcard-0']").contains("true").should("exist");
  });
});

describe("Delete Flashcard", () => {
  beforeEach(() => {
    cy.visit("http://10.0.4.57:9000/");
    cy.get("[data-testid='add-flashcard']").click();
    cy.get("[data-testid='add-flashcard-question']").type(
      "Is this a question?"
    );
    cy.get("[data-testid='add-flashcard-answer']").type("yes");
    cy.get("[data-testid='save-new-flashcard']").click();
  });

  it("Delete Flashcard with Id 0", () => {
    cy.get("[data-testid='flashcard-0']")
      .find("[data-testid='delete-flashcard']")
      .click();
    cy.get("[data-testid='flashcard-0']").should("not.exist");
  });
});

describe("Toggle answer", () => {
  beforeEach(() => {
    cy.visit("http://10.0.4.57:9000/");
    cy.get("[data-testid='add-flashcard']").click();
    cy.get("[data-testid='add-flashcard-question']").type(
      "Is this a question?"
    );
    cy.get("[data-testid='add-flashcard-answer']").type("yes");
    cy.get("[data-testid='save-new-flashcard']").click();
  });

  it("Toggle answer of flashcard 0", () => {
    cy.get("[data-testid='flashcard-0']")
      .find("[data-testid='toggle-flashcard-answer']")
      .click();
    cy.get("[data-testid='flashcard-0']").contains("yes").should("exist");
    cy.get("[data-testid='flashcard-0']")
      .find("[data-testid='toggle-flashcard-answer']")
      .click();
    cy.get("[data-testid='flashcard-0']").contains("yes").should("not.exist");
  });
});

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

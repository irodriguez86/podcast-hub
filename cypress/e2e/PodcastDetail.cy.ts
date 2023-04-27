/// <reference types="Cypress" />
describe('PodcastDetail test', () => {
  beforeEach(() => {
    // Access to podcast detail page before each test
    cy.visit('http://localhost:8080/')
    cy.get('.podcast-item').first().click()
  })
  it('should display the podcast detail card', () => {
    cy.get('.podcast-card').should('be.visible') // The podcast card at the left
    cy.get('.podcast-card img').should('be.visible')
    cy.get('.podcast-card .podcast-card-title').should('be.visible')
    cy.get('.podcast-card .podcast-card-author').should('be.visible')
  })
  it('should display the chapter table', () => {
    cy.get('.episodes').should('be.visible') // The chapter list at the right
    cy.get('.episodes-title').should('include', /Episodes:/) // Chapter list title
    cy.get('.episode-title-cell').should('be.visible') // Chapter name
    cy.get('.episode-date-cell').should('be.visible') // Chapter date
    cy.get('.episode-duration-cell').should('be.visible') // Chapter duration
  })
  it('allows user to click on a chapter and navigate to chapter detail', () => {
    cy.get('.chapter-link').first().click()
    cy.url().should('include', /chapter/)
  })
})

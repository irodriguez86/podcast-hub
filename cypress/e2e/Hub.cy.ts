/// <reference types="Cypress" />

describe('Hub test', () => {
  beforeEach(() => {
    // Visit the Hub page before each test
    cy.visit('http://localhost:8080/')
  })
  it('should displays the title', () => {
    cy.get('.header__title').should('contain.text', 'Podcaster')
  })
  it('should displays the search input with its counter', () => {
    cy.get('[placeholder="Filter podcasts..."]').should('exist')
    cy.get('.search-counter').should('contain.text', '100')
  })
  it('displays podcast list elements', () => {
    // Assert that the podcast list elements are present
    cy.get('.podcast-item').should('be.visible')
    cy.get('.podcast-item img').should('be.visible')
    cy.get('.podcast-item .podcast-item-title').should('be.visible')
    cy.get('.podcast-item .podcast-item-author').should('be.visible')
  })
  it('allows user to search podcasts by name or artist', () => {
    // Type search query in the search input field
    cy.get('[placeholder="Filter podcasts..."]').type('a')

    // Assert that the filtered podcasts are displayed
    cy.get('.podcast-item').should('be.visible')
    cy.get('.search-counter').should('not.contain.text', '100')
    cy.get('.podcast-item .podcast-item-title').should('be.visible')
  })
  it('should not show any podcast when there are no results for the search', () => {
    cy.get('[placeholder="Filter podcasts..."]').type(
      'aSearchThatWontShowAnyResult'
    )
    cy.get('.search-counter').should('contain.text', '0')
    cy.get('.podcast-item .podcast-item-title').should('not.exist')
  })
  it('allows user to click on a podcast and navigate to podcast detail page', () => {
    // Click on a podcast item
    cy.get('.podcast-item').first().click()

    cy.url().should('include', /podcast/)
  })
})

/// <reference types="Cypress" />
describe('Podcast Hub test', () => {
    it('should be able to navigate to a chapter from podcast and listen it', () => {
      //Open the Hub page
      cy.visit('http://localhost:8080/')

      //Navigate to the first podcast item
      cy.get('.podcast-item').first().click()

      //Navigate to the first chapter of the podcast
      cy.get('.chapter-link').first().click()

      //Reproduce the chapter
      cy.get('.episode-container .chapter-player audio')
      .invoke('attr', 'src')
      .then((audiofile) => {
        const audio = new Audio(audiofile)
        audio.play()
      })
    })

    it('should cache data from podcasts in local storage', () => {
        //Clear local storage
        cy.window().its('localStorage').invoke('clear')

        cy.visit('http://localhost:8080/')

        //Check that local storage with podcastList is not empty
        cy.window().its('localStorage').invoke('getItem', 'podcastList').should('not.be.null');
    })

    it('should have empty input search after return to the hub', () => {
        cy.visit('http://localhost:8080/')

        // Type something in the search input
        cy.get('[placeholder="Filter podcasts..."]').type('a')

        // Navigate to the first podcast result
        cy.get('.podcast-item').first().click()

        // Return to home
        cy.get('.header__title').click()

        //Check that the input filter is empty
        cy.get('[placeholder="Filter podcasts..."]').should('be.empty')
    })
  })
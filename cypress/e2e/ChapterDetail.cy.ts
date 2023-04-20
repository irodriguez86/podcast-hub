describe('Chapter detail test', () => {
  beforeEach(() => {
    // Access to chapter detail page before each test
    cy.visit('http://localhost:8080/')
    cy.get('.podcast-item').first().click()
    cy.wait(5000)
    cy.get('.chapter-link').first().click()
  })
  it('should display the podcast detail card', () => {
    cy.get('.podcast-card').should('be.visible') // The podcast card at the left
    cy.get('.podcast-card img').should('be.visible')
    cy.get('.podcast-card .podcast-card-title').should('be.visible')
    cy.get('.podcast-card .podcast-card-author').should('be.visible')
  })
  it('should display the chapter detail', () => {
    cy.get('.episode-container .chapter-title').should('be.visible')
    cy.get('.episode-container .chapter-description').should('be.visible')
    cy.get('.episode-container .chapter-player audio').should('be.visible')
  })
  it('should let the user reproduce the chapter', () => {
    cy.get('.episode-container .chapter-player audio')
      .invoke('attr', 'src')
      .then((audiofile) => {
        const audio = new Audio(audiofile)
        audio.play()
      })
  })
})
